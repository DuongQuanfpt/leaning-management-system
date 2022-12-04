package service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.IssueRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.s3amazon.service.impl.S3Service;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.domain.request.SubmitRequirementRequestDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.request.SubmitRequirementWrapper;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitNewResponseDTO;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.submit.service.impl.SubmitService;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.repositories.SubmitWorkRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.enums.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@ExtendWith(MockitoExtension.class)
public class SubmitServiceTest {
  @Mock
  private UserRepository userRepository;

  @Mock
  private SubmitRepository submitRepository;

  @Mock
  private SubmitWorkRepository submitWorkRepository;

  @Mock
  private IssueRepository issueRepository;

  @Mock
  private MilestoneRepository milestoneRepository;

  @Mock
  private S3Service s3Service;

  @InjectMocks
  private SubmitService submitService;

  private Submit submit = new Submit();

  @BeforeEach
  void init() {

    Classes classes = new Classes();
    classes.setClassId((long) 1);
    classes.setCode("ABC123");

    User user = new User();
    user.setUserId((long) 1);
    user.setAccountName("quan");
    ClassUser classUser = new ClassUser();
    classUser.setClasses(classes);
    classUser.setUser(user);

    Milestone milestone = new Milestone();
    milestone.setMilestoneId((long) 1);
    milestone.setStatus(MilestoneStatusEnum.Open);
    milestone.setClasses(classes);

    Group group = new Group();
    group.setGroupId((long) 1);
    group.setGroupCode("Group A");
    group.setDescription("description A");
    group.setClasses(classes);

    List<Submit> submitOfGroup = new ArrayList<>();
    submit.setSubmitId((long) 1);
    submit.setClassUser(classUser);
    submit.setStatus(SubmitStatusEnum.Pending);
    submit.setMilestone(milestone);
    submit.setGroup(group);
    submitOfGroup.add(submit);
    group.setSubmits(submitOfGroup);

    List<Issue> requirementOfMilestone = new ArrayList<>();
    for (int i = 0; i < 2; i++) {
      Issue requirement = new Issue();
      requirement.setIssueId((long) i);
      requirement.setTitle("requirement " + i);
      requirement.setMilestone(milestone);
      requirement.setGroup(group);
      requirementOfMilestone.add(requirement);
    }
    milestone.setIssues(requirementOfMilestone);
  }

  /**
   * new submit - group submit
   * 
   * @throws IOException
   */
  @Test
  void newSubmit_UTC001() throws IOException {
    User currentLogin = new User();
    currentLogin.setUserId((long) 1);
    currentLogin.setAccountName("quan");

    byte[] data = new byte[] { 1, 2, 3, 4 };
    InputStream stream = new ByteArrayInputStream(data);
    MultipartFile multipartFile = new MockMultipartFile("file", stream);

    SubmitRequirementWrapper wrapper = new SubmitRequirementWrapper();
    SubmitRequirementRequestDTO dto = new SubmitRequirementRequestDTO();
    dto.setAssigneeName("quan");
    dto.setRequirementId((long) 1);
    wrapper.setRequirements(List.of(dto));

    List<SubmitWork> submitWorks = new ArrayList<>();
    SubmitWork submitWork = new SubmitWork();
    submitWork.setSubmit(submit);
    submitWork.setWork(submit.getMilestone().getIssues().get(0));
    submitWorks.add(submitWork);

    Mockito.when(submitRepository.findById((long) 1)).thenReturn(Optional.of(submit));
    Mockito.when(userRepository.findById((long) 1)).thenReturn(Optional.of(currentLogin));
    Mockito.when(s3Service.saveSubmit(any(MultipartFile.class), anyString())).thenReturn("fileurl.com");
    Mockito.when(submitRepository.saveAll(ArgumentMatchers.anyList())).thenReturn(List.of(submit));
    Mockito.when(submitWorkRepository.saveAll(ArgumentMatchers.anyList())).thenReturn(submitWorks);
    List<SubmitNewResponseDTO> actuals = submitService.newSubmit(currentLogin, (long) 1, wrapper, multipartFile)
        .getBody();
    List<SubmitNewResponseDTO> expecteds = new ArrayList<>();
    expecteds.add(new SubmitNewResponseDTO((long) 1, (long) 0));

    for (int i = 0; i < actuals.size(); i++) {
      SubmitNewResponseDTO expected = expecteds.get(i);
      SubmitNewResponseDTO actual = actuals.get(i);
      assertEquals(expected.getSubmitId(), actual.getSubmitId());
      assertEquals(expected.getWorkId(), actual.getWorkId());
    }

  }

  /**
   * new submit - group submit ,request contain member not in group
   * 
   * @throws IOException
   */
  @Test
  void newSubmit_UTC002() throws IOException {
    User currentLogin = new User();
    currentLogin.setUserId((long) 1);
    currentLogin.setAccountName("quan");

    byte[] data = new byte[] { 1, 2, 3, 4 };
    InputStream stream = new ByteArrayInputStream(data);
    MultipartFile multipartFile = new MockMultipartFile("file", stream);

    SubmitRequirementWrapper wrapper = new SubmitRequirementWrapper();
    SubmitRequirementRequestDTO dto = new SubmitRequirementRequestDTO();
    dto.setAssigneeName("quan1");
    dto.setRequirementId((long) 1);
    wrapper.setRequirements(List.of(dto));

    Mockito.when(submitRepository.findById((long) 1)).thenReturn(Optional.of(submit));
    Mockito.when(userRepository.findById((long) 1)).thenReturn(Optional.of(currentLogin));
    Exception expectedEx = assertThrows(CustomException.class, () -> submitService.newSubmit(currentLogin, (long) 1, wrapper, multipartFile));

    assertEquals(expectedEx.getMessage(), "Request assignee not in this group");
  }

  /**
   * new submit - individual submit
   * 
   * @throws IOException
   */
  @Test
  void newSubmit_UTC003() throws IOException {
    submit.setGroup(null);
    
    User currentLogin = new User();
    currentLogin.setUserId((long) 1);
    currentLogin.setAccountName("quan");

    byte[] data = new byte[] { 1, 2, 3, 4 };
    InputStream stream = new ByteArrayInputStream(data);
    MultipartFile multipartFile = new MockMultipartFile("file", stream);

    SubmitRequirementWrapper wrapper = new SubmitRequirementWrapper();
    SubmitRequirementRequestDTO dto = new SubmitRequirementRequestDTO();
    dto.setAssigneeName("quan");
    dto.setRequirementId((long) 1);
    wrapper.setRequirements(List.of(dto));

    List<SubmitWork> submitWorks = new ArrayList<>();
    SubmitWork submitWork = new SubmitWork();
    submitWork.setSubmit(submit);
    submitWork.setWork(submit.getMilestone().getIssues().get(0));
    submitWorks.add(submitWork);

    Mockito.when(submitRepository.findById((long) 1)).thenReturn(Optional.of(submit));
    Mockito.when(userRepository.findById((long) 1)).thenReturn(Optional.of(currentLogin));
    Mockito.when(s3Service.saveSubmit(any(MultipartFile.class), anyString())).thenReturn("fileurl.com");
    Mockito.when(submitRepository.saveAll(ArgumentMatchers.anyList())).thenReturn(List.of(submit));
    Mockito.when(submitWorkRepository.saveAll(ArgumentMatchers.anyList())).thenReturn(submitWorks);
    List<SubmitNewResponseDTO> actuals = submitService.newSubmit(currentLogin, (long) 1, wrapper, multipartFile)
        .getBody();
    List<SubmitNewResponseDTO> expecteds = new ArrayList<>();
    expecteds.add(new SubmitNewResponseDTO((long) 1, (long) 0));

    for (int i = 0; i < actuals.size(); i++) {
      SubmitNewResponseDTO expected = expecteds.get(i);
      SubmitNewResponseDTO actual = actuals.get(i);
      assertEquals(expected.getSubmitId(), actual.getSubmitId());
      assertEquals(expected.getWorkId(), actual.getWorkId());
    }

  }

    /**
   * new submit - submit doesnt exist
   * 
   * @throws IOException
   */
  @Test
  void newSubmit_UTC004() throws IOException {
    User currentLogin = new User();
    currentLogin.setUserId((long) 1);
    currentLogin.setAccountName("quan");

    byte[] data = new byte[] { 1, 2, 3, 4 };
    InputStream stream = new ByteArrayInputStream(data);
    MultipartFile multipartFile = new MockMultipartFile("file", stream);

    SubmitRequirementWrapper wrapper = new SubmitRequirementWrapper();
    SubmitRequirementRequestDTO dto = new SubmitRequirementRequestDTO();
    dto.setAssigneeName("quan1");
    dto.setRequirementId((long) 1);
    wrapper.setRequirements(List.of(dto));

    Mockito.when(submitRepository.findById((long) 1)).thenReturn(Optional.empty());
    Exception expectedEx = assertThrows(CustomException.class, () -> submitService.newSubmit(currentLogin, (long) 1, wrapper, multipartFile));

    assertEquals(expectedEx.getMessage(), "submit doesnt exist");
  }

   /**
   * new submit - login user not owner of submit
   * 
   * @throws IOException
   */
  @Test
  void newSubmit_UTC005() throws IOException {
    User currentLogin = new User();
    currentLogin.setUserId((long) 1);
    currentLogin.setAccountName("quan123");

    byte[] data = new byte[] { 1, 2, 3, 4 };
    InputStream stream = new ByteArrayInputStream(data);
    MultipartFile multipartFile = new MockMultipartFile("file", stream);

    SubmitRequirementWrapper wrapper = new SubmitRequirementWrapper();
    SubmitRequirementRequestDTO dto = new SubmitRequirementRequestDTO();
    dto.setAssigneeName("quan1");
    dto.setRequirementId((long) 1);
    wrapper.setRequirements(List.of(dto));

    Mockito.when(submitRepository.findById((long) 1)).thenReturn(Optional.of(submit));
    Mockito.when(userRepository.findById((long) 1)).thenReturn(Optional.of(currentLogin));
    Exception expectedEx = assertThrows(CustomException.class, () -> submitService.newSubmit(currentLogin, (long) 1, wrapper, multipartFile));

    assertEquals(expectedEx.getMessage(), "not owner of this submit");
  }

   /**
   * new submit - request requirement not in milestone
   * 
   * @throws IOException
   */
  @Test
  void newSubmit_UTC006() throws IOException {
    User currentLogin = new User();
    currentLogin.setUserId((long) 1);
    currentLogin.setAccountName("quan");

    byte[] data = new byte[] { 1, 2, 3, 4 };
    InputStream stream = new ByteArrayInputStream(data);
    MultipartFile multipartFile = new MockMultipartFile("file", stream);

    SubmitRequirementWrapper wrapper = new SubmitRequirementWrapper();
    SubmitRequirementRequestDTO dto = new SubmitRequirementRequestDTO();
    dto.setAssigneeName("quan");
    dto.setRequirementId((long) 2);
    wrapper.setRequirements(List.of(dto));

    Mockito.when(submitRepository.findById((long) 1)).thenReturn(Optional.of(submit));
    Mockito.when(userRepository.findById((long) 1)).thenReturn(Optional.of(currentLogin));
    Exception expectedEx = assertThrows(CustomException.class, () -> submitService.newSubmit(currentLogin, (long) 1, wrapper, multipartFile));

    assertEquals(expectedEx.getMessage(), "One of requested requirement list doesnt belong in this submit");
  }

    /**
   * new submit - file is null
   * 
   * @throws IOException
   */
  @Test
  void newSubmit_UTC007() throws IOException {
    User currentLogin = new User();
    currentLogin.setUserId((long) 1);
    currentLogin.setAccountName("quan");

    byte[] data = new byte[] { 1, 2, 3, 4 };
    InputStream stream = new ByteArrayInputStream(data);
    MultipartFile multipartFile = new MockMultipartFile("file", stream);

    SubmitRequirementWrapper wrapper = new SubmitRequirementWrapper();
    SubmitRequirementRequestDTO dto = new SubmitRequirementRequestDTO();
    dto.setAssigneeName("quan");
    dto.setRequirementId((long) 1);
    wrapper.setRequirements(List.of(dto));

    Mockito.when(submitRepository.findById((long) 1)).thenReturn(Optional.of(submit));
    Mockito.when(userRepository.findById((long) 1)).thenReturn(Optional.of(currentLogin));
    Mockito.when(s3Service.saveSubmit(any(MultipartFile.class), anyString())).thenReturn(null);
    Exception expectedEx = assertThrows(CustomException.class, () -> submitService.newSubmit(currentLogin, (long) 1, wrapper, multipartFile));

    assertEquals(expectedEx.getMessage(), "file upload failed");
  }


}
