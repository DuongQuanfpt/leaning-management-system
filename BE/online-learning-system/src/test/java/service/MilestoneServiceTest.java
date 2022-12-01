package service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.AssignmentRepository;
import swp490.g23.onlinelearningsystem.entities.assignment.service.impl.AssignmentService;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.EvalCriteriaRepositories;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.request.MilestoneRequestDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.service.impl.MilestoneService;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@ExtendWith(MockitoExtension.class)
public class MilestoneServiceTest {
    @Mock
    private MilestoneRepository milestoneRepository;

    @Mock
    private ClassRepositories classRepositories;

    @Mock
    private AssignmentRepository assignmentRepository;

    @Mock
    private SubmitRepository submitRepository;

    @Mock
    private EvalCriteriaRepositories evalCriteriaRepositories;

    @InjectMocks
    private MilestoneService milestoneService;

    @InjectMocks
    private AssignmentService assignmentService;

     /**
     * milestone id exist
     */
    @Test
    void findById_UTC001() {

        Milestone mockRepository = mockData();

        MilestoneResponseDTO mockResult = milestoneService.toDTO(mockRepository);

        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(mockRepository));
        MilestoneResponseDTO actual = milestoneService.milestoneDetail((long) 1).getBody();

        assertEquals(actual.getMilestoneId(), mockResult.getMilestoneId());
        assertEquals(actual.getTitle(), mockResult.getTitle());
        assertEquals(actual.getDescription(), mockResult.getDescription());
        assertEquals(actual.getStatus(), mockResult.getStatus());
        assertEquals(actual.getClassesCode(), mockResult.getClassesCode());
    }

    
     /**
     * milestone id not exist
     */

    @Test
    void findById_UTC002() {
        assertThrows(CustomException.class, () -> {
            milestoneService.milestoneDetail((long) 1);
        });

    }

    /**
     * add milestone 
     */

    @Test
    void milestoneAdd_UTC001() {

        Milestone mockRepository = mockData();

        MilestoneRequestDTO createDTO = new MilestoneRequestDTO();
        createDTO.setClassesCode("ABC123");
        createDTO.setAssignmentId((long) 1);
        createDTO.setTitle("milestone A");
        createDTO.setDescription("Description A");

        Mockito.when(classRepositories.findClassByCode("ABC123")).thenReturn(mockRepository.getClasses());
        Mockito.when(assignmentRepository.findById((long) 1)).thenReturn(Optional.of(mockRepository.getAssignment()));
        Mockito.when(milestoneRepository.save(Mockito.any(Milestone.class))).thenReturn(mockRepository);
        Mockito.when(submitRepository.saveAll(Mockito.anyList())).thenReturn(mockRepository.getSubmits());
        Mockito.when(evalCriteriaRepositories.saveAll(Mockito.anyList()))
                .thenReturn(mockRepository.getAssignment().getEvalCriteriaList());

        String actual = milestoneService.milestonAdd(createDTO).getBody();

        assertEquals(actual, mockRepository.getTitle());
    }

     /**
     * add milestone with no class
     */

    @Test
    void milestoneAdd_UTC002() {
        MilestoneRequestDTO createDTO = new MilestoneRequestDTO();

        createDTO.setAssignmentId((long) 1);
        createDTO.setTitle("milestone A");
        createDTO.setDescription("Description A");

        Exception expectedEx = assertThrows(CustomException.class, () -> milestoneService.milestonAdd(createDTO));
        assertEquals(expectedEx.getMessage(), "Must assign a class to milestone");
    }

     /**
     * add milestone with no assignment
     */

    @Test
    void milestoneAdd_UTC003() {
        Milestone mockRepository = mockData();
        MilestoneRequestDTO createDTO = new MilestoneRequestDTO();
        createDTO.setClassesCode("ABC123");
        createDTO.setTitle("milestone A");
        createDTO.setDescription("Description A");

        Mockito.when(classRepositories.findClassByCode("ABC123")).thenReturn(mockRepository.getClasses());
        Exception expectedEx = assertThrows(CustomException.class, () -> milestoneService.milestonAdd(createDTO));
        assertEquals(expectedEx.getMessage(), "Must assign a assignment to milestone");
    }

     /**
     * add milestone assign to an assignment that already have a milestone
     */

    @Test
    void milestoneAdd_UTC004() {
        Milestone mockRepository = mockData();
        Assignment assignment = mockRepository.getAssignment();
        assignment.setMilestones( List.of(mockRepository));
        
        MilestoneRequestDTO createDTO = new MilestoneRequestDTO();
        createDTO.setClassesCode("ABC123");
        createDTO.setTitle("milestone A");
        createDTO.setAssignmentId((long) 1);
        createDTO.setDescription("Description A");

        Mockito.when(classRepositories.findClassByCode("ABC123")).thenReturn(mockRepository.getClasses());
        Mockito.when(assignmentRepository.findById((long) 1)).thenReturn(Optional.of(mockRepository.getAssignment()));

        Exception expectedEx = assertThrows(CustomException.class, () -> milestoneService.milestonAdd(createDTO));
        assertEquals(expectedEx.getMessage(), "Assignment already have milestone");
    }

      /**
     * add milestone assign to non existent class
     */

    @Test
    void milestoneAdd_UTC005() {
        Milestone mockRepository = mockData();
        MilestoneRequestDTO createDTO = new MilestoneRequestDTO();
        createDTO.setClassesCode("ABC123");
        createDTO.setTitle("milestone A");
        createDTO.setAssignmentId((long) 1);
        createDTO.setDescription("Description A");

        Mockito.when(classRepositories.findClassByCode("ABC123")).thenReturn(mockRepository.getClasses());
        Exception expectedEx = assertThrows(CustomException.class, () -> milestoneService.milestonAdd(createDTO));
        assertEquals(expectedEx.getMessage(), "Assignment doesnt exist");
    }

     /**
     * add milestone assign to non existent assignment
     */

    @Test
    void milestoneAdd_UTC006() {
        MilestoneRequestDTO createDTO = new MilestoneRequestDTO();
        createDTO.setClassesCode("ABC123");
        createDTO.setTitle("milestone A");
        createDTO.setAssignmentId((long) 1);
        createDTO.setDescription("Description A");

        Mockito.when(classRepositories.findClassByCode("ABC123")).thenReturn(null);
        Exception expectedEx = assertThrows(CustomException.class, () -> milestoneService.milestonAdd(createDTO));
        assertEquals(expectedEx.getMessage(), "Class doesnt exist");
    }

    private Milestone mockData() {
        Classes classes = new Classes();
        classes.setClassId((long) 1);
        classes.setCode("ABC123");
        classes.setClassUsers(new ArrayList<>());
        User user = new User();
        user.setUserId((long) 1);
        user.setAccountName("quan");
        ClassUser classUser = new ClassUser();
        classUser.setClasses(classes);
        classUser.setUser(user);

        Subject subject = new Subject();
        subject.setSubjectId((long) 1);
        subject.setSubjectCode("CODE A");
        Assignment assignment = new Assignment();
        assignment.setAssId((long) 1);
        assignment.setTitle("assisnment A");
        assignment.setForSubject(subject);
        assignment.setMilestones(new ArrayList<>());
        assignment.setEvalCriteriaList(new ArrayList<>());

        Milestone mockRepository = new Milestone();
        mockRepository.setMilestoneId((long) 1);
        mockRepository.setTitle("milestone A");
        mockRepository.setDescription("Description A");
        mockRepository.setStatus(MilestoneStatusEnum.Open);
        mockRepository.setFromDate(LocalDate.now());
        mockRepository.setToDate(LocalDate.now());
        mockRepository.setAssignment(assignment);
        mockRepository.setClasses(classes);
        mockRepository.setSubmits(new ArrayList<>());

        return mockRepository;
    }

}
