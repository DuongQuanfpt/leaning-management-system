package swp490.g23.onlinelearningsystem.entities.work_eval.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
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
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.EvalResultDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.EvalSettingDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.EvalUpdateDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.repositories.WorkEvalRepository;
import swp490.g23.onlinelearningsystem.entities.work_eval.service.IWorkEvalService;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.WorkUpdate;
import swp490.g23.onlinelearningsystem.entities.work_update.repositories.WorkUpdateRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum;

@Service
public class WorkEvalService implements IWorkEvalService {
    @Autowired
    private SubmitWorkRepository workRepository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private SubjectSettingRepository subjectSettingRepository;

    @Autowired
    private SubmitRepository submitRepository;

    @Autowired
    private WorkEvalRepository workEvalRepository;

    @Autowired
    private WorkUpdateRepository updateRepository;

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

        List<EvalResultDTO> evalResultDTOs = new ArrayList<>();
        if (!submitWork.getWorkEvals().isEmpty()) {
            for (WorkEval eval : submitWork.getWorkEvals()) {
                evalResultDTOs.add(toResultDTO(eval));
            }
        }

        List<EvalUpdateDTO> evalUpdateDTOs = new ArrayList<>();
        List<WorkUpdate> updates = updateRepository.getUpdateOfSubmitAndRequirement(submitWork.getSubmit(),
                submitWork.getWork());
        for (WorkUpdate update : updates) {
            evalUpdateDTOs.add(toUpdateDTO(update));
        }        

        responseDTO.setUpdates(evalUpdateDTOs);
        responseDTO.setResult(evalResultDTOs);
        responseDTO.setTraineeName(submitWork.getSubmit().getClassUser().getUser().getAccountName());
        responseDTO.setMilestoneName(submitWork.getSubmit().getMilestone().getTitle());
        responseDTO.setFunctionName(submitWork.getWork().getTitle());
        responseDTO.setComplexityFilter(complexityDtos);
        responseDTO.setQualityFilter(qualityDtos);

        return ResponseEntity.ok(responseDTO);
    }

    private EvalUpdateDTO toUpdateDTO(WorkUpdate update) {
        EvalUpdateDTO dto = new EvalUpdateDTO();
        dto.setId(update.getWorkUpdateId());
        dto.setTitle(update.getTitle());
        dto.setDescription(update.getDescription());
        dto.setMilestoneId(update.getMilestone().getMilestoneId());
        dto.setMilestoneName(update.getMilestone().getTitle());
        dto.setUpdateDate(update.getUpdateDate().toString());
        return dto;
    }

    private EvalResultDTO toResultDTO(WorkEval eval) {
        EvalResultDTO dto = new EvalResultDTO();
        dto.setMilestoneId(eval.getMilestone().getMilestoneId());
        dto.setMilestoneName(eval.getMilestone().getTitle());
        dto.setComplexity(toSettingDTO(eval.getComplexity()));
        dto.setQuality(toSettingDTO(eval.getQuality()));
        dto.setWorkPoint(eval.getWorkEval());
        dto.setComment(eval.getComment());
        return dto;
    }

    private EvalSettingDTO toSettingDTO(SubjectSetting subjectSetting) {
        EvalSettingDTO evalSettingDTO = new EvalSettingDTO();
        evalSettingDTO.setTitle(subjectSetting.getSettingTitle());
        evalSettingDTO.setId(subjectSetting.getSubjectSettingId());
        evalSettingDTO.setPoint(Long.parseLong(subjectSetting.getSettingValue()));
        return evalSettingDTO;
    }

    @Override
    public ResponseEntity<String> workEval(User user, Long submitId, Long workId, EvalRequestDTO requestDTO,
            Long milestoneId) {
        SubmitWork submitWork = workRepository.getBySubmitAndWork(submitId, workId);
        if (submitWork == null) {
            throw new CustomException("submit work doesnt exist");
        }

        Milestone currentMilestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("complexity doesnt exist"));

        for (WorkEval eval : submitWork.getWorkEvals()) {
            if (eval.getMilestone().equals(currentMilestone)) {
                throw new CustomException("work already evaluated in this milestone");
            }
        }

        SubjectSetting complexity = subjectSettingRepository.findById(requestDTO.getComplexityId())
                .orElseThrow(() -> new CustomException("complexity doesnt exist"));
        SubjectSetting quality = subjectSettingRepository.findById(requestDTO.getQualityId())
                .orElseThrow(() -> new CustomException("quality doesnt exist"));

        WorkEval eval = new WorkEval();
        eval.setSubmitWork(submitWork);
        eval.setComplexity(complexity);
        eval.setQuality(quality);
        eval.setMilestone(currentMilestone);
        eval.setWorkEval(requestDTO.getWorkPoint());
        if (requestDTO.getComment() != null) {
            eval.setComment(requestDTO.getComment());
        }

        workEvalRepository.save(eval);

        Submit submit = submitWork.getSubmit();
        if (submit.getStatus() != SubmitStatusEnum.Evaluated) {
            submit.setStatus(SubmitStatusEnum.Evaluated);
            submitRepository.save(submit);
        }

        if (submitWork.getStatus() != SubmitWorkStatusEnum.Evaluated) {
            submitWork.setStatus(SubmitWorkStatusEnum.Evaluated);
            workRepository.save(submitWork);
        }

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

        if (submitWork.getStatus() == SubmitWorkStatusEnum.Evaluated) {
            throw new CustomException("cant reject evaluated work ");
        }

        if (submitWork.getStatus() == SubmitWorkStatusEnum.Rejected) {
            submitWork.setStatus(SubmitWorkStatusEnum.Submitted);
        } else {
            // if (submitWork.getStatus() == SubmitWorkStatusEnum.Evaluated) {
            // workEvalRepository.deleteAll(submitWork.getWorkEvals());
            // submitWork.setWorkEvals(null);
            // Submit submit = submitWork.getSubmit();
            // submit.setStatus(SubmitStatusEnum.Submitted);
            // submitRepository.save(submit);
            // }
            submitWork.setStatus(SubmitWorkStatusEnum.Rejected);
        }

        workRepository.save(submitWork);
        return ResponseEntity.ok("rejected");
    }

}
