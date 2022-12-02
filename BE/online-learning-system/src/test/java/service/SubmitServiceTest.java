package service;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.submit.service.impl.SubmitService;
import swp490.g23.onlinelearningsystem.entities.submit_work.repositories.SubmitWorkRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.enums.SubmitStatusEnum;

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
    classes.setClassUsers(List.of(classUser));

    Milestone milestone = new Milestone();
    milestone.setMilestoneId((long) 1);
    milestone.setStatus(MilestoneStatusEnum.Open);
    milestone.setClasses(classes);

    Group group = new Group();
    group.setGroupId((long) 1);
    group.setGroupCode("Group A");
    group.setDescription("description A");
    group.setClasses(classes);

    Issue requirement = new Issue();
    requirement.setIssueId((long) 1);
    requirement.setTitle("requirement 1");
    requirement.setMilestone(milestone);
    requirement.setGroup(group);
    milestone.setIssues(List.of(requirement));

    submit.setSubmitId((long) 1);
    submit.setClassUser(classUser);
    submit.setStatus(SubmitStatusEnum.Pending);
    submit.setMilestone(milestone);

    group.setSubmits(List.of(submit));
    submit.setGroup(group);
  }

  /**
   * new submit - group submit
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

    SubmitRequirementWrapper wrapper =new SubmitRequirementWrapper();
    SubmitRequirementRequestDTO dto = new SubmitRequirementRequestDTO();
    dto.setAssigneeName("quan");
    dto.setRequirementId((long) 1);
    wrapper.setRequirements(List.of(dto));

    Mockito.when(submitRepository.findById((long) 1)).thenReturn(Optional.of(submit));
    Mockito.when(userRepository.findById((long) 1)).thenReturn(Optional.of(currentLogin));
    Mockito.when(s3Service.saveSubmit(multipartFile, anyString())).thenReturn("fileurl.com");
    String actual = submitService.newSubmit(currentLogin, (long) 1, wrapper, multipartFile).getBody();

    assertEquals(actual, "file submitted");
  }

}
