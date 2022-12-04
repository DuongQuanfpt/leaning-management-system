package service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;

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

import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.EvalCriteriaRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_detail.domain.EvalDetail;
import swp490.g23.onlinelearningsystem.entities.eval_detail.repositories.EvalDetailRepositories;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.MilestoneEval;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.request.EvalCriteriaRequest;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.request.MilestoneEvalRequestDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.request.MilestoneEvalRequestWrapper;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.repositories.MilestoneEvalRepository;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.service.impl.MilestoneEvalService;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@ExtendWith(MockitoExtension.class)
public class MilestoneEvalServiceTest {
    @Mock
    private ClassRepositories classRepositories;

    @Mock
    private SubmitRepository submitRepository;

    @Mock
    private MilestoneRepository milestoneRepository;

    @Mock
    private MilestoneEvalRepository milestoneEvalRepository;

    @Mock
    private GroupRepository groupRepository;

    @Mock
    private EvalCriteriaRepositories criteriaRepositories;

    @Mock
    private EvalDetailRepositories evalDetailRepositories;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MilestoneEvalService milestoneEvalService;

    private Milestone milestone = new Milestone();

    private List<EvalDetail> evalDetails = new ArrayList<>();

    private List<MilestoneEval> milestoneEvals = new ArrayList<>();

    @BeforeEach
    void init() {

        milestone.setMilestoneId((long) 1);
        milestone.setMilestoneEvals(new ArrayList<>());

        List<Submit> submits = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            Submit submit = new Submit();
            submit.setSubmitId((long) i);
            submit.setMilestone(milestone);
            submits.add(submit);
        }
        milestone.setSubmits(submits);

        List<EvalCriteria> criterias = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            EvalCriteria criteria = new EvalCriteria();
            criteria.setCriteriaId((long) i);
            criteria.setMilestone(milestone);
            criterias.add(criteria);
        }
        EvalCriteria criteria = new EvalCriteria();
        criteria.setCriteriaId((long) 3);
        criteria.setWorkEval(true);
        criteria.setMilestone(milestone);
        criterias.add(criteria);
        milestone.setCriteriaList(criterias);

    }

    /**
     * milestone eval
     */

    @Test
    void milestoneEval_UTC001() {

        MilestoneEvalRequestWrapper wrapper = createRequest();

        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(milestone));
        Mockito.when(milestoneEvalRepository.saveAll(ArgumentMatchers.anyList())).thenReturn(milestoneEvals);
        Mockito.when(evalDetailRepositories.saveAll(ArgumentMatchers.anyList())).thenReturn(evalDetails);
        String actual = milestoneEvalService.milestoneEval((long) 1, wrapper).getBody();

        assertEquals("milestone evaluated", actual);
    }

    /**
     * milestone eval - nonexistent milestone
     */

    @Test
    void milestoneEval_UTC002() {

        MilestoneEvalRequestWrapper wrapper = createRequest();

        Mockito.when(milestoneRepository.findById(anyLong())).thenReturn(Optional.empty());

        Exception expectedEx = assertThrows(CustomException.class,
                () -> milestoneEvalService.milestoneEval((long) 1, wrapper));
        assertEquals(expectedEx.getMessage(), "Milestone doesnt exist");
    }

    /**
     * milestone eval - submit in request doesnt exist in milestone
     */

    @Test
    void milestoneEval_UTC003() {

        MilestoneEvalRequestWrapper wrapper = createRequest();
        List<MilestoneEvalRequestDTO> dtos = wrapper.getEvalList();
        MilestoneEvalRequestDTO evalRequestDTO = new MilestoneEvalRequestDTO();
        evalRequestDTO.setSubmitId((long) 3);
        evalRequestDTO.setComment("something");
        evalRequestDTO.setGrade(6.69);
        evalRequestDTO.setBonus((double) 0);
        evalRequestDTO.setWorkGrade(8.99);
        evalRequestDTO.setWorkPoint((long) 274);
        evalRequestDTO.setWorkCriteriaId((long) 1);
        dtos.add(evalRequestDTO);
        wrapper.setEvalList(dtos);

        Mockito.when(milestoneRepository.findById(anyLong())).thenReturn(Optional.of(milestone));

        Exception expectedEx = assertThrows(CustomException.class,
                () -> milestoneEvalService.milestoneEval((long) 1, wrapper));
        assertEquals(expectedEx.getMessage(), "Some submit in request do not belong in this milestone");
    }

    /**
     * milestone eval - nonexistent milestone
     */

    @Test
    void milestoneEval_UTC004() {

        MilestoneEvalRequestWrapper wrapper = createRequest();
        List<MilestoneEvalRequestDTO> dtos = wrapper.getEvalList();
        MilestoneEvalRequestDTO evalRequestDTO = new MilestoneEvalRequestDTO();
        evalRequestDTO.setSubmitId((long) 0);
        evalRequestDTO.setComment("something");
        evalRequestDTO.setGrade(6.69);
        evalRequestDTO.setBonus((double) 0);
        evalRequestDTO.setWorkGrade(8.99);
        evalRequestDTO.setWorkPoint((long) 274);
        evalRequestDTO.setWorkCriteriaId((long) 1);

        List<EvalCriteriaRequest> criteriaRequests = new ArrayList<>();
        EvalCriteriaRequest criteriaRequest = new EvalCriteriaRequest();
        criteriaRequest.setCriteriaId((long) 5);
        criteriaRequest.setComment("comment ");
        criteriaRequest.setGrade((double) 3);
        criteriaRequests.add(criteriaRequest);

        evalRequestDTO.setCriteria(criteriaRequests);
        dtos.add(evalRequestDTO);
        wrapper.setEvalList(dtos);
        Mockito.when(milestoneRepository.findById(anyLong())).thenReturn(Optional.of(milestone));

        Exception expectedEx = assertThrows(CustomException.class,
                () -> milestoneEvalService.milestoneEval((long) 1, wrapper));
        assertEquals(expectedEx.getMessage(), "Some criteria in request do not belong in milestone");
    }

    private MilestoneEvalRequestWrapper createRequest() {
        MilestoneEvalRequestWrapper wrapper = new MilestoneEvalRequestWrapper();
        List<MilestoneEvalRequestDTO> evalRequestDTOs = new ArrayList<>();
        MilestoneEvalRequestDTO evalRequestDTO = new MilestoneEvalRequestDTO();
        evalRequestDTO.setSubmitId((long) 1);
        evalRequestDTO.setComment("something");
        evalRequestDTO.setGrade(6.69);
        evalRequestDTO.setBonus((double) 0);
        evalRequestDTO.setWorkGrade(8.99);
        evalRequestDTO.setWorkPoint((long) 274);
        evalRequestDTO.setWorkCriteriaId((long) 1);
        List<EvalCriteriaRequest> criteriaRequests = new ArrayList<>();
        for (int i = 0; i < 2; i++) {
            EvalCriteriaRequest criteriaRequest = new EvalCriteriaRequest();
            criteriaRequest.setCriteriaId((long) i);
            criteriaRequest.setComment("comment " + i);
            criteriaRequest.setGrade((double) i);
            criteriaRequests.add(criteriaRequest);
        }
        evalRequestDTO.setCriteria(criteriaRequests);
        evalRequestDTOs.add(evalRequestDTO);
        wrapper.setEvalList(evalRequestDTOs);
        return wrapper;
    }

}
