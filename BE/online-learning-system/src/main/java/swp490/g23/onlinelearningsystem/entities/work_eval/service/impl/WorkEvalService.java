package swp490.g23.onlinelearningsystem.entities.work_eval.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.eval_detail.domain.EvalDetail;
import swp490.g23.onlinelearningsystem.entities.eval_detail.repositories.EvalDetailRepositories;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.MilestoneEval;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.repositories.MilestoneEvalRepository;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;
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
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.NewEvalResponseDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.repositories.WorkEvalRepository;
import swp490.g23.onlinelearningsystem.entities.work_eval.service.IWorkEvalService;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.WorkUpdate;
import swp490.g23.onlinelearningsystem.entities.work_update.repositories.WorkUpdateRepository;
import swp490.g23.onlinelearningsystem.enums.Status;
import swp490.g23.onlinelearningsystem.enums.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.enums.SubmitWorkStatusEnum;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class WorkEvalService implements IWorkEvalService {
    @Autowired
    private SubmitWorkRepository workRepository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private SubmitRepository submitRepository;

    @Autowired
    private WorkEvalRepository workEvalRepository;

    @Autowired
    private WorkUpdateRepository updateRepository;

    @Autowired
    private EvalDetailRepositories evalDetailRepositories;

    @Autowired
    private MilestoneEvalRepository milestoneEvalRepository;

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
    public ResponseEntity<NewEvalResponseDTO> workEval(User user, Long submitId, Long workId, EvalRequestDTO requestDTO,
            Long milestoneId) {
        SubmitWork submitWork = workRepository.getBySubmitAndWork(submitId, workId);
        if (submitWork == null) {
            throw new CustomException("submit work doesnt exist");
        }

        Milestone currentMilestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("milestone doesnt exist"));

        for (WorkEval eval : submitWork.getWorkEvals()) {
            if (eval.getMilestone().equals(currentMilestone)) {
                throw new CustomException("work already evaluated in this milestone");
            }
        }

        SubjectSetting complexity = null;
        SubjectSetting quality = null;

        for (SubjectSetting subjectSetting : currentMilestone.getAssignment().getForSubject().getSettings()) {
            if (subjectSetting.getSubjectSettingId().equals(requestDTO.getComplexityId())) {
                if (subjectSetting.getType().getSettingValue().equals("TYPE_COMPLEXITY")) {
                    complexity = subjectSetting;
                }
            }

            if (subjectSetting.getSubjectSettingId().equals(requestDTO.getQualityId())) {
                if (subjectSetting.getType().getSettingValue().equals("TYPE_QUALITY")) {
                    quality = subjectSetting;
                }
            }
        }

        if (complexity == null) {
            throw new CustomException("requested complexity doesnt exist");
        }

        if (quality == null) {
            throw new CustomException("requested quality doesnt exist");
        }

        WorkEval eval = new WorkEval();
        eval.setSubmitWork(submitWork);
        eval.setComplexity(complexity);
        eval.setQuality(quality);
        eval.setMilestone(currentMilestone);
        eval.setWorkEval(requestDTO.getWorkPoint());
        if (requestDTO.getComment() != null) {
            eval.setComment(requestDTO.getComment());
        }

        List<WorkEval> workEvals = submitWork.getWorkEvals();
        workEvals.add(eval);
        submitWork.setWorkEvals(workEvals);

        WorkEval savedEval = workEvalRepository.save(eval);
        SubmitWork newSubmitWork = workRepository.save(submitWork);

        if (!submitWork.getSubmit().getMilestoneEvals().isEmpty()) {
            milestoneRevaluate(newSubmitWork.getSubmit().getMilestoneEvals().get(0));

        } else {
            MilestoneEval newMilestoneEval = new MilestoneEval();
            newMilestoneEval.setClassUser(submitWork.getSubmit().getClassUser());
            newMilestoneEval.setMilestone(currentMilestone);
            newMilestoneEval.setSubmit(submitWork.getSubmit());
            newMilestoneEval.setBonus((double) 0);
            milestoneRevaluate(newMilestoneEval);
        }

        Submit submit = submitWork.getSubmit();
        if (submit.getGroup() != null) {
            List<Submit> changedSubmits = new ArrayList<>();
            for (Submit submitOfGroup : submit.getGroup().getSubmits()) {
                if (submitOfGroup.getMilestone().getMilestoneId().equals(currentMilestone.getMilestoneId())) {
                    if (submitOfGroup.getStatus() != SubmitStatusEnum.Evaluated) {
                        submitOfGroup.setStatus(SubmitStatusEnum.Evaluated);
                        changedSubmits.add(submitOfGroup);
                    }
                }
            }

            if (!changedSubmits.isEmpty()) {
                submitRepository.saveAll(changedSubmits);
            }

        } else {
            if (submit.getStatus() != SubmitStatusEnum.Evaluated) {
                submit.setStatus(SubmitStatusEnum.Evaluated);
                submitRepository.save(submit);
            }
        }

        if (submitWork.getStatus() != SubmitWorkStatusEnum.Evaluated) {
            submitWork.setStatus(SubmitWorkStatusEnum.Evaluated);
            workRepository.save(submitWork);
        }

        return ResponseEntity.ok(toNewEvalResponse(savedEval));
    }

    private NewEvalResponseDTO toNewEvalResponse(WorkEval workEval) {
        NewEvalResponseDTO dto = new NewEvalResponseDTO();
        dto.setWorkEvalId(workEval.getWorkEvalId());
        dto.setComplexity(workEval.getComplexity().getSettingTitle());
        dto.setQuality(workEval.getQuality().getSettingTitle());
        dto.setWorkEval(workEval.getWorkEval());
        dto.setComment(workEval.getComment());
        return dto;
    }

    private void milestoneRevaluate(MilestoneEval milestoneEval) {
        Double milestoneGrade = (double) 0;
        boolean isUpdate = false;
        if (milestoneEval.getEvalDetails() == null || milestoneEval.getEvalDetails().isEmpty()) {
            EvalDetail workEvalDetail = new EvalDetail();
            workEvalDetail.setMilestoneEval(milestoneEval);
            for (EvalCriteria criteria : milestoneEval.getMilestone().getCriteriaList()) {
                if(criteria.isWorkEval()){
                    workEvalDetail.setEvalCriteria(criteria);

                    Long workPoint = (long) 0;
                    for (SubmitWork submitWork : milestoneEval.getSubmit().getSubmitWorks()) {
                        WorkEval latestEval = new WorkEval();
                        for (WorkEval eval : submitWork.getWorkEvals()) {
                            if (latestEval.getCreatedDate() == null) {
                                latestEval = eval;
                            }

                            if (latestEval.getCreatedDate().before(eval.getCreatedDate())) {
                                latestEval = eval;
                            }
                        }
                        workPoint += latestEval.getWorkEval();

                    }
                    workEvalDetail.setTotalLoc(workPoint);

                    double expectedWork = workEvalDetail.getEvalCriteria().getExpectedWork();
                    double workGrade = workPoint / expectedWork * 10.0;
                    workEvalDetail.setGrade(Math.round(workGrade * 100.0) / 100.0);

                    Double grade = workEvalDetail.getGrade() * workEvalDetail.getEvalCriteria().getEvalWeight() / 100;
                    grade = Math.round(grade * 100.0) / 100.0;
                    milestoneGrade += grade;
        
                    milestoneEval.setGrade(milestoneGrade + milestoneEval.getBonus());
                    milestoneEvalRepository.save(milestoneEval);

                    evalDetailRepositories.save(workEvalDetail);
                }
            }
        } else {

            for (EvalDetail evalDetail : milestoneEval.getEvalDetails()) {
                if (evalDetail.getEvalCriteria().isWorkEval()) {
                    isUpdate = true;

                    Long workPoint = (long) 0;
                    for (SubmitWork submitWork : milestoneEval.getSubmit().getSubmitWorks()) {
                        WorkEval latestEval = new WorkEval();
                        for (WorkEval eval : submitWork.getWorkEvals()) {
                            if (latestEval.getCreatedDate() == null) {
                                latestEval = eval;
                            }

                            if (latestEval.getCreatedDate().before(eval.getCreatedDate())) {
                                latestEval = eval;
                            }
                        }
                        workPoint += latestEval.getWorkEval();

                    }
                    evalDetail.setTotalLoc(workPoint);

                    double expectedWork = evalDetail.getEvalCriteria().getExpectedWork();
                    double workGrade = workPoint / expectedWork * 10.0;
                    evalDetail.setGrade(Math.round(workGrade * 100.0) / 100.0);

                    evalDetailRepositories.save(evalDetail);

                }
                Double grade = evalDetail.getGrade() * evalDetail.getEvalCriteria().getEvalWeight() / 100;
                grade = Math.round(grade * 100.0) / 100.0;
                milestoneGrade += grade;
            }

            if (isUpdate == true) {
                milestoneEval.setGrade(milestoneGrade + milestoneEval.getBonus());
                milestoneEvalRepository.save(milestoneEval);
            }
        }
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
            submitWork.setRejectReason(null);
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
