package swp490.g23.onlinelearningsystem.entities.work_eval.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;
import swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.SubjectSettingRepository;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.repositories.SubmitWorkRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.request.EvalRequestDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.EvalResponseDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.EvalSettingDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.repositories.WorkEvalRepository;
import swp490.g23.onlinelearningsystem.entities.work_eval.service.IWorkEvalService;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum;

@Service
public class WorkEvalService implements IWorkEvalService {
    @Autowired
    private SubmitWorkRepository workRepository;

    @Autowired
    private SubjectSettingRepository subjectSettingRepository;

    @Autowired
    private SubmitRepository submitRepository;

    @Autowired
    private WorkEvalRepository workEvalRepository;

    @Override
    public ResponseEntity<EvalResponseDTO> getWorkEval(User user, Long submitId, Long workId) {

        // Submit submit = submitRepository.findById(submitId)
        // .orElseThrow(() -> new CustomException("submit doesnt exist"));

        // Issue requirement = issueRepository.findById(workId)
        // .orElseThrow(() -> new CustomException("requirement doesnt exist"));

        SubmitWork submitWork = workRepository.getBySubmitAndWork(submitId, workId);
        if (submitWork == null) {
            throw new CustomException("submit work doesnt exist");
        }

        EvalResponseDTO responseDTO = new EvalResponseDTO();

        if (submitWork.getSubmit().getGroup() != null) {
            responseDTO.setGroupName(submitWork.getSubmit().getGroup().getGroupCode());
        }

        if (submitWork.getWork().getDescription() != null) {
            responseDTO.setFunctionDescription(submitWork.getWork().getDescription());
        }

        List<EvalSettingDTO> complexityDtos = new ArrayList<>();
        List<EvalSettingDTO> qualityDtos = new ArrayList<>();

        for (SubjectSetting setting : submitWork.getSubmit().getMilestone().getAssignment().getForSubject()
                .getSettings()) {
            if (setting.getType().getSettingValue().equals("TYPE_COMPLEXITY")) {
                complexityDtos.add(toSettingDTO(setting));
            }

            if (setting.getType().getSettingValue().equals("TYPE_QUALITY")) {
                qualityDtos.add(toSettingDTO(setting));
            }
        }

        if (!submitWork.getWorkEvals().isEmpty()) {
            WorkEval workEval = submitWork.getWorkEvals().get(0);
            responseDTO.setCurrentComplexity(toSettingDTO(workEval.getComplexity()));
            responseDTO.setCurrentComplexity(toSettingDTO(workEval.getQuality()));
            responseDTO.setWorkPoint(workEval.getWorkEval());
        }

        responseDTO.setTraineeName(submitWork.getSubmit().getClassUser().getUser().getAccountName());
        responseDTO.setMilestoneName(submitWork.getSubmit().getMilestone().getTitle());
        responseDTO.setFunctionName(submitWork.getWork().getTitle());
        responseDTO.setComplexityFilter(complexityDtos);
        responseDTO.setQualityFilter(qualityDtos);

        return ResponseEntity.ok(responseDTO);
    }

    private EvalSettingDTO toSettingDTO(SubjectSetting subjectSetting) {
        EvalSettingDTO evalSettingDTO = new EvalSettingDTO();
        evalSettingDTO.setTitle(subjectSetting.getSettingTitle());
        evalSettingDTO.setId(subjectSetting.getSubjectSettingId());
        evalSettingDTO.setPoint(Long.parseLong(subjectSetting.getSettingValue()));
        return evalSettingDTO;
    }

    @Override
    public ResponseEntity<String> workEval(User user, Long submitId, Long workId, EvalRequestDTO requestDTO) {
        SubmitWork submitWork = workRepository.getBySubmitAndWork(submitId, workId);
        if (submitWork == null) {
            throw new CustomException("submit work doesnt exist");
        }

        SubjectSetting complexity = subjectSettingRepository.findById(requestDTO.getComplexityId())
                .orElseThrow(() -> new CustomException("complexity doesnt exist"));
        SubjectSetting quality = subjectSettingRepository.findById(requestDTO.getQualityId())
                .orElseThrow(() -> new CustomException("quality doesnt exist"));

        WorkEval eval = new WorkEval();
        if (submitWork.getWorkEvals().isEmpty()) {
            eval.setSubmitWork(submitWork);
            eval.setComplexity(complexity);
            eval.setQuality(quality);
            eval.setMilestone(submitWork.getMilestone());
            eval.setWorkEval(requestDTO.getWorkPoint());
            if (requestDTO.getComment() != null) {
                eval.setComment(requestDTO.getComment());
            }

        }
        // else {
        // eval = submitWork.getWorkEvals().get(0);
        // eval.setNewComplexity(complexity);
        // eval.setNewQuality(quality);
        // eval.setNewWorkEval(requestDTO.getWorkPoint());
        // if (requestDTO.getComment() != null) {
        // eval.setNewComment(requestDTO.getComment());
        // }
        // }

        workEvalRepository.save(eval);

        submitWork.setStatus(SubmitWorkStatusEnum.Evaluated);
        Submit submit = submitWork.getSubmit();
        submit.setStatus(SubmitStatusEnum.Evaluated);

        submitRepository.save(submit);
        workRepository.save(submitWork);
        return ResponseEntity.ok("evaluated");
    }

    @Override
    public ResponseEntity<String> workReject(User user, Long submitId, Long workId, EvalRequestDTO requestDTO) {
        SubmitWork submitWork = workRepository.getBySubmitAndWork(submitId, workId);
        if (submitWork == null) {
            throw new CustomException("submit work doesnt exist");
        }

        if (requestDTO.getComment() != null) {
            submitWork.setRejectReason(requestDTO.getComment());
        }

        if (submitWork.getStatus() == SubmitWorkStatusEnum.Rejected) {
            submitWork.setStatus(SubmitWorkStatusEnum.Submitted);
        } else {
            if (submitWork.getStatus() == SubmitWorkStatusEnum.Evaluated) {
                workEvalRepository.deleteAll(submitWork.getWorkEvals());
                submitWork.setWorkEvals(null);
                Submit submit = submitWork.getSubmit();
                submit.setStatus(SubmitStatusEnum.Submitted);
                submitRepository.save(submit);
            }
            submitWork.setStatus(SubmitWorkStatusEnum.Rejected);
        }

        workRepository.save(submitWork);
        return ResponseEntity.ok("rejected");
    }

}
