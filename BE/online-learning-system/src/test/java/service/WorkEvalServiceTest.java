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
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.eval_detail.repositories.EvalDetailRepositories;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.repositories.MilestoneEvalRepository;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;
import swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.SubjectSettingRepository;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.repositories.SubmitWorkRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.request.EvalRequestDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.NewEvalResponseDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.repositories.WorkEvalRepository;
import swp490.g23.onlinelearningsystem.entities.work_eval.service.impl.WorkEvalService;
import swp490.g23.onlinelearningsystem.entities.work_update.repositories.WorkUpdateRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@ExtendWith(MockitoExtension.class)
public class WorkEvalServiceTest {
    @Mock
    private SubmitWorkRepository workRepository;

    @Mock
    private MilestoneRepository milestoneRepository;

    @Mock
    private SubjectSettingRepository subjectSettingRepository;

    @Mock
    private SubmitRepository submitRepository;

    @Mock
    private WorkEvalRepository workEvalRepository;

    @Mock
    private WorkUpdateRepository updateRepository;

    @Mock
    private EvalDetailRepositories evalDetailRepositories;

    @Mock
    private MilestoneEvalRepository milestoneEvalRepository;

    @InjectMocks
    private WorkEvalService workEvalService;

    private WorkEval eval = new WorkEval();

    private SubmitWork submitWork = new SubmitWork();


    @BeforeEach
    void init() {
        Subject subject = new Subject();
        subject.setSubjectId((long) 1);

        Assignment assignment = new Assignment();
        assignment.setAssId((long) 1);
        assignment.setForSubject(subject);

        Milestone milestone = new Milestone();
        milestone.setMilestoneId((long) 1);
        milestone.setAssignment(assignment);
        milestone.setCriteriaList(new ArrayList<>());

        Setting complexityType = new Setting();
        complexityType.setSettingValue("TYPE_COMPLEXITY");
        Setting qualityType = new Setting();
        qualityType.setSettingValue("TYPE_QUALITY");

        SubjectSetting complexity = new SubjectSetting();
        complexity.setSubjectSettingId((long) 1);
        complexity.setSettingTitle("complexity");
        complexity.setType(complexityType);        

        SubjectSetting quality = new SubjectSetting();
        quality.setSubjectSettingId((long)2);
        quality.setSettingTitle("quality");
        quality.setType(qualityType);

        subject.setSettings(List.of(complexity, quality));

        Submit submit = new Submit();
        submit.setSubmitId((long) 1);
        submit.setMilestoneEvals(new ArrayList<>());
        Issue work = new Issue();
        work.setIssueId((long) 1);
        submitWork = new SubmitWork();
        submitWork.setSubmit(submit);
        submitWork.setWork(work);
        submitWork.setWorkEvals(new ArrayList<>());

        eval.setWorkEvalId((long) 1);
        eval.setWorkEval(100);
        eval.setComment("comment");
        eval.setMilestone(milestone);
        eval.setComplexity(complexity);
        eval.setQuality(quality);
        eval.setSubmitWork(submitWork);

    }

    /**
     * work eval
     */

    @Test
    void workEval_UTC001() {
        User currentLogin = new User();

        EvalRequestDTO requestDTO = new EvalRequestDTO();
        requestDTO.setComment("comment");
        requestDTO.setComplexityId((long) 1);
        requestDTO.setQualityId((long) 2);
        requestDTO.setWorkPoint((long) 100);

        NewEvalResponseDTO expected = new NewEvalResponseDTO();
        expected.setWorkEvalId((long) 1);
        expected.setComplexity("complexity");
        expected.setQuality("quality");
        expected.setWorkEval((long) 100);
        expected.setComment("comment");

        Mockito.when(workRepository.getBySubmitAndWork((long) 1, (long) 1)).thenReturn(submitWork);
        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(eval.getMilestone()));
        Mockito.when(workEvalRepository.save(Mockito.any(WorkEval.class))).thenReturn(eval);
        NewEvalResponseDTO actual = workEvalService.workEval(currentLogin, (long)1,(long) 1, requestDTO, (long)1).getBody();
      
        assertEquals(expected.getWorkEvalId(), actual.getWorkEvalId());
        assertEquals(expected.getQuality(), actual.getQuality());
        assertEquals(expected.getComplexity(), actual.getComplexity());
        assertEquals(expected.getWorkEval(), actual.getWorkEval());
        assertEquals(expected.getComment(), actual.getComment());

    }

    /**
     * work eval - nonexistent submitwork
     */

    @Test
    void workEval_UTC002() {
        User currentLogin = new User();

        EvalRequestDTO requestDTO = new EvalRequestDTO();
        requestDTO.setComment("comment");
        requestDTO.setComplexityId((long) 1);
        requestDTO.setQualityId((long) 2);
        requestDTO.setWorkPoint((long) 100);

        NewEvalResponseDTO expected = new NewEvalResponseDTO();
        expected.setWorkEvalId((long) 1);
        expected.setComplexity("complexity");
        expected.setQuality("quality");
        expected.setWorkEval((long) 100);
        expected.setComment("comment");

        Mockito.when(workRepository.getBySubmitAndWork(anyLong(), anyLong())).thenReturn(null);

        Exception expectedEx = assertThrows(CustomException.class, () -> workEvalService.workEval(currentLogin, (long)1,(long) 1, requestDTO, (long)1).getBody());

        assertEquals(expectedEx.getMessage(), "submit work doesnt exist");

    }

    /**
     * work eval - nonexistent milestone
     */

    @Test
    void workEval_UTC003() {
        User currentLogin = new User();

        EvalRequestDTO requestDTO = new EvalRequestDTO();
        requestDTO.setComment("comment");
        requestDTO.setComplexityId((long) 1);
        requestDTO.setQualityId((long) 2);
        requestDTO.setWorkPoint((long) 100);

        NewEvalResponseDTO expected = new NewEvalResponseDTO();
        expected.setWorkEvalId((long) 1);
        expected.setComplexity("complexity");
        expected.setQuality("quality");
        expected.setWorkEval((long) 100);
        expected.setComment("comment");

        Mockito.when(workRepository.getBySubmitAndWork((long) 1, (long) 1)).thenReturn(eval.getSubmitWork());
        Mockito.when(milestoneRepository.findById(anyLong())).thenReturn(Optional.empty());

        Exception expectedEx = assertThrows(CustomException.class, () -> workEvalService.workEval(currentLogin, (long)1,(long) 1, requestDTO, (long)1).getBody());

        assertEquals(expectedEx.getMessage(), "milestone doesnt exist");

    }

    /**
     * work eval - work already evaluated in same milestone
     */

    @Test
    void workEval_UTC004() {
        WorkEval otherEval =eval;
        submitWork.setWorkEvals(List.of(otherEval));

        User currentLogin = new User();

        EvalRequestDTO requestDTO = new EvalRequestDTO();
        requestDTO.setComment("comment");
        requestDTO.setComplexityId((long) 1);
        requestDTO.setQualityId((long) 2);
        requestDTO.setWorkPoint((long) 100);

        NewEvalResponseDTO expected = new NewEvalResponseDTO();
        expected.setWorkEvalId((long) 1);
        expected.setComplexity("complexity");
        expected.setQuality("quality");
        expected.setWorkEval((long) 100);
        expected.setComment("comment");

        Mockito.when(workRepository.getBySubmitAndWork((long) 1, (long) 1)).thenReturn(submitWork);
        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(eval.getMilestone()));

        Exception expectedEx = assertThrows(CustomException.class, () -> workEvalService.workEval(currentLogin, (long)1,(long) 1, requestDTO, (long)1).getBody());

        assertEquals(expectedEx.getMessage(), "work already evaluated in this milestone");

    }

     /**
     * work eval - work already evaluated in other milestone
     */

    @Test
    void workEval_UTC005() {
        Milestone otherMilestone = new Milestone();
        otherMilestone.setMilestoneId((long) 2);
        WorkEval otherEval =new WorkEval();
        otherEval.setWorkEvalId((long) 2);
        otherEval.setWorkEval(100);
        otherEval.setComment("comment");
        otherEval.setMilestone(otherMilestone);
        otherEval.setSubmitWork(submitWork);

        List<WorkEval> evals = new ArrayList<>();
        evals.add(otherEval);
        submitWork.setWorkEvals(evals);

        User currentLogin = new User();

        EvalRequestDTO requestDTO = new EvalRequestDTO();
        requestDTO.setComment("comment");
        requestDTO.setComplexityId((long) 1);
        requestDTO.setQualityId((long) 2);
        requestDTO.setWorkPoint((long) 100);

        NewEvalResponseDTO expected = new NewEvalResponseDTO();
        expected.setWorkEvalId((long) 1);
        expected.setComplexity("complexity");
        expected.setQuality("quality");
        expected.setWorkEval((long) 100);
        expected.setComment("comment");

        Mockito.when(workRepository.getBySubmitAndWork((long) 1, (long) 1)).thenReturn(submitWork);
        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(eval.getMilestone()));
        Mockito.when(workEvalRepository.save(Mockito.any(WorkEval.class))).thenReturn(eval);
        NewEvalResponseDTO actual = workEvalService.workEval(currentLogin, (long)1,(long) 1, requestDTO, (long)1).getBody();
      
        assertEquals(expected.getWorkEvalId(), actual.getWorkEvalId());
        assertEquals(expected.getQuality(), actual.getQuality());
        assertEquals(expected.getComplexity(), actual.getComplexity());
        assertEquals(expected.getWorkEval(), actual.getWorkEval());
        assertEquals(expected.getComment(), actual.getComment());

    }

    /**
     * work eval - request complexity not exist in subject of assignment
     */

    @Test
    void workEval_UTC006() {

        User currentLogin = new User();

        EvalRequestDTO requestDTO = new EvalRequestDTO();
        requestDTO.setComment("comment");
        requestDTO.setComplexityId((long) 10);
        requestDTO.setQualityId((long) 2);
        requestDTO.setWorkPoint((long) 100);

        NewEvalResponseDTO expected = new NewEvalResponseDTO();
        expected.setWorkEvalId((long) 1);
        expected.setComplexity("complexity");
        expected.setQuality("quality");
        expected.setWorkEval((long) 100);
        expected.setComment("comment");

        Mockito.when(workRepository.getBySubmitAndWork((long) 1, (long) 1)).thenReturn(submitWork);
        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(eval.getMilestone()));
        
        Exception expectedEx = assertThrows(CustomException.class, () -> workEvalService.workEval(currentLogin, (long)1,(long) 1, requestDTO, (long)1).getBody());

        assertEquals(expectedEx.getMessage(), "requested complexity doesnt exist");

    }

     /**
     * work eval - request quality not exist in subject of assignment
     */

    @Test
    void workEval_UTC007() {

        User currentLogin = new User();

        EvalRequestDTO requestDTO = new EvalRequestDTO();
        requestDTO.setComment("comment");
        requestDTO.setComplexityId((long) 1);
        requestDTO.setQualityId((long) 10);
        requestDTO.setWorkPoint((long) 100);

        NewEvalResponseDTO expected = new NewEvalResponseDTO();
        expected.setWorkEvalId((long) 1);
        expected.setComplexity("complexity");
        expected.setQuality("quality");
        expected.setWorkEval((long) 100);
        expected.setComment("comment");

        Mockito.when(workRepository.getBySubmitAndWork((long) 1, (long) 1)).thenReturn(submitWork);
        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(eval.getMilestone()));
        
        Exception expectedEx = assertThrows(CustomException.class, () -> workEvalService.workEval(currentLogin, (long)1,(long) 1, requestDTO, (long)1).getBody());

        assertEquals(expectedEx.getMessage(), "requested quality doesnt exist");

    }

    /**
     * work eval - request quality not exist in subject of assignment
     */

    @Test
    void workEval_UTC008() {

        User currentLogin = new User();

        EvalRequestDTO requestDTO = new EvalRequestDTO();
        requestDTO.setComment("comment");
        requestDTO.setComplexityId((long) 1);
        requestDTO.setQualityId((long) 10);
        requestDTO.setWorkPoint((long) 100);

        NewEvalResponseDTO expected = new NewEvalResponseDTO();
        expected.setWorkEvalId((long) 1);
        expected.setComplexity("complexity");
        expected.setQuality("quality");
        expected.setWorkEval((long) 100);
        expected.setComment("comment");

        Mockito.when(workRepository.getBySubmitAndWork((long) 1, (long) 1)).thenReturn(submitWork);
        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(eval.getMilestone()));
        
        Exception expectedEx = assertThrows(CustomException.class, () -> workEvalService.workEval(currentLogin, (long)1,(long) 1, requestDTO, (long)1).getBody());

        assertEquals(expectedEx.getMessage(), "requested quality doesnt exist");

    }

     /**
     * work eval - request complexity type is not complexity of assignment
     */

    @Test
    void workEval_UTC009() {

        User currentLogin = new User();

        EvalRequestDTO requestDTO = new EvalRequestDTO();
        requestDTO.setComment("comment");
        requestDTO.setComplexityId((long) 2);
        requestDTO.setQualityId((long) 2);
        requestDTO.setWorkPoint((long) 100);

        NewEvalResponseDTO expected = new NewEvalResponseDTO();
        expected.setWorkEvalId((long) 1);
        expected.setComplexity("complexity");
        expected.setQuality("quality");
        expected.setWorkEval((long) 100);
        expected.setComment("comment");

        Mockito.when(workRepository.getBySubmitAndWork((long) 1, (long) 1)).thenReturn(submitWork);
        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(eval.getMilestone()));
        
        Exception expectedEx = assertThrows(CustomException.class, () -> workEvalService.workEval(currentLogin, (long)1,(long) 1, requestDTO, (long)1).getBody());

        assertEquals(expectedEx.getMessage(), "requested complexity doesnt exist");

    }

      /**
     * work eval - request quality type is not quality of assignment
     */

    @Test
    void workEval_UTC010() {

        User currentLogin = new User();

        EvalRequestDTO requestDTO = new EvalRequestDTO();
        requestDTO.setComment("comment");
        requestDTO.setComplexityId((long) 1);
        requestDTO.setQualityId((long) 1);
        requestDTO.setWorkPoint((long) 100);

        NewEvalResponseDTO expected = new NewEvalResponseDTO();
        expected.setWorkEvalId((long) 1);
        expected.setComplexity("complexity");
        expected.setQuality("quality");
        expected.setWorkEval((long) 100);
        expected.setComment("comment");

        Mockito.when(workRepository.getBySubmitAndWork((long) 1, (long) 1)).thenReturn(submitWork);
        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(eval.getMilestone()));
      
        Exception expectedEx = assertThrows(CustomException.class, () -> workEvalService.workEval(currentLogin, (long)1,(long) 1, requestDTO, (long)1).getBody());

        assertEquals(expectedEx.getMessage(), "requested quality doesnt exist");

    }

}
