package service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.assignment.service.impl.AssignmentService;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.service.impl.MilestoneService;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;

@ExtendWith(MockitoExtension.class)
public class MilestoneServiceTest {
    @Mock
    private MilestoneRepository milestoneRepository;

    @InjectMocks
    private MilestoneService milestoneService;

    @InjectMocks
    private AssignmentService assignmentService;

    @Test
    void findById_UTC001() {
        
        Classes classes = new Classes();
        classes.setClassId((long) 1);
        classes.setCode("ABC123");
        classes.setClassUsers(new ArrayList<>());
        
        Subject subject = new Subject();
        subject.setSubjectId((long) 1);
        subject.setSubjectCode("CODE A");
        Assignment assignment = new Assignment();
        assignment.setAssId((long) 1);
        assignment.setTitle("assisnment A");
        assignment.setForSubject(subject);

        Milestone mockRepository = new Milestone();
        mockRepository.setMilestoneId((long) 1);
        mockRepository.setTitle("milestone A");
        mockRepository.setDescription("Description A");
        mockRepository.setStatus(MilestoneStatusEnum.Open);
        mockRepository.setFromDate(LocalDate.now());
        mockRepository.setToDate(LocalDate.now());
        mockRepository.setAssignment(assignment);
        mockRepository.setClasses(classes);

        MilestoneResponseDTO mockResult = new MilestoneResponseDTO();

        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(mockRepository));
        MilestoneResponseDTO actual = milestoneService.milestoneDetail((long) 1).getBody();
        
        assertEquals(actual, mockResult);
    }
}
