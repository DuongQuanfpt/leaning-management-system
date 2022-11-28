package swp490.g23.onlinelearningsystem.entities.milestone_eval.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.EvalCriteriaRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_detail.domain.EvalDetail;
import swp490.g23.onlinelearningsystem.entities.eval_detail.repositories.EvalDetailRepositories;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.MilestoneEval;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.request.MilestoneEvalRequestDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.request.MilestoneEvalRequestWrapper;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.request.EvalCriteriaRequest;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalCriteriaDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalCriteriaFilter;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalFilter;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalGroupFilter;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalWorkDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneeEvalCriteriaKey;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.TraineeEvalDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.repositories.MilestoneEvalRepository;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.service.IMilestoneEvalService;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria.SubmitCriteria;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria_entity.SubmitQuery;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;
import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.enums.Status;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class MilestoneEvalService implements IMilestoneEvalService {

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private SubmitRepository submitRepository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private MilestoneEvalRepository milestoneEvalRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private EvalCriteriaRepositories criteriaRepositories;

    @Autowired
    private EvalDetailRepositories evalDetailRepositories;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubmitCriteria submitCriteria;

    @Override
    public ResponseEntity<MilestoneEvalFilter> getMilestoneEvalFilter(String classCode) {
        Classes classes = classRepositories.findClassByCode(classCode);
        if (classes == null) {
            throw new CustomException("class doesnt exist");
        }

        List<MilestoneDTO> milestoneDTOs = new ArrayList<>();
        for (Milestone milestone : classes.getMilestones()) {
            if (milestone.getStatus() == MilestoneStatusEnum.In_Progress) {
                milestoneDTOs.add(toMilestoneDTO(milestone));
            }
        }

        MilestoneEvalFilter milestoneEvalFilter = new MilestoneEvalFilter();
        milestoneEvalFilter.setMilestones(milestoneDTOs);
        return ResponseEntity.ok(milestoneEvalFilter);
    }

    private MilestoneDTO toMilestoneDTO(Milestone milestone) {
        MilestoneDTO dto = new MilestoneDTO();
        dto.setMilestoneId(milestone.getMilestoneId());
        dto.setMilestoneName(milestone.getTitle());
        dto.setTeamWork(milestone.getAssignment().isTeamWork());

        List<MilestoneEvalCriteriaFilter> criteriaFilters = new ArrayList<>();
        for (EvalCriteria criteria : milestone.getCriteriaList()) {
            if (criteria.getStatus() == Status.Active) {
                if (!criteria.isWorkEval()) {
                    criteriaFilters.add(toCriteriaFilter(criteria));
                }
            }
        }
        dto.setCriteriaFilter(criteriaFilters);

        List<Group> groupOfMilestone = groupRepository.findGroupByMilestone(milestone.getMilestoneId());
        List<MilestoneEvalGroupFilter> groupFilter = new ArrayList<>();
        for (Group group : groupOfMilestone) {
            groupFilter.add(toGroupFilter(group));
        }
        dto.setGroupFilter(groupFilter);

        return dto;
    }

    @Override
    public ResponseEntity<MilestoneEvalPaginateDTO> getMilestoneEvalForm(int page, int limit, String keyword,
            Long milestoneId, Long groupId, User user) {
        User currentUser = userRepository.findById(user.getUserId()).get();

        SubmitQuery result = submitCriteria.getTraineeOfMilestone(keyword, milestoneId, groupId, currentUser);
        TypedQuery<Submit> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        Long totalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        List<MilestoneEvalResponseDTO> submitList = new ArrayList<>();
        List<Submit> listResult = queryResult.getResultList();
        for (Submit submit : listResult) {
            submitList.add(toDTO(submit));
        }

        MilestoneEvalPaginateDTO paginateDTO = new MilestoneEvalPaginateDTO();

        Milestone milestone = listResult.get(0).getMilestone();
        paginateDTO.setWorkEval(false);

        if(milestone.getStatus() == MilestoneStatusEnum.Closed){
            paginateDTO.setEditable(false);
        } else {
            paginateDTO.setEditable(true);
        }

        for (EvalCriteria criteria : milestone.getCriteriaList()) {
            if (criteria.isWorkEval() == true && criteria.getStatus() == Status.Active) {
                paginateDTO.setWorkEval(true);
                break;
            }
        }

        paginateDTO.setPage(page);
        paginateDTO.setListResult(submitList);
        paginateDTO.setTotalItem(totalItem);
        paginateDTO.setTotalPage(totalPage);

        return ResponseEntity.ok(paginateDTO);

    }

    private MilestoneEvalGroupFilter toGroupFilter(Group group) {
        MilestoneEvalGroupFilter filter = new MilestoneEvalGroupFilter();
        filter.setGroupId(group.getGroupId());
        filter.setGroupName(group.getGroupCode());
        return filter;
    }

    private MilestoneEvalCriteriaFilter toCriteriaFilter(EvalCriteria criteria) {
        MilestoneEvalCriteriaFilter dto = new MilestoneEvalCriteriaFilter();
        dto.setCriteriaId(criteria.getCriteriaId());
        dto.setCriteriaTitle(criteria.getCriteriaName());
        dto.setWeight(criteria.getEvalWeight());
        return dto;
    }

    private MilestoneEvalResponseDTO toDTO(Submit submit) {
        MilestoneEvalResponseDTO dto = new MilestoneEvalResponseDTO();
        dto.setSubmitId(submit.getSubmitId());

        if (submit.getGroup() != null) {
            dto.setGroupId(submit.getGroup().getGroupId());
            dto.setGroupName(submit.getGroup().getGroupCode());
        } else {
            dto.setGroupName("No Group");
        }

        if (!submit.getMilestoneEvals().isEmpty()) {
            dto.setBonusGrade(submit.getMilestoneEvals().get(0).getBonus());
            dto.setMilestoneGrade(submit.getMilestoneEvals().get(0).getGrade());
            dto.setComment(submit.getMilestoneEvals().get(0).getComment());
        }

        List<MilestoneEvalCriteriaDTO> criteriaDTOs = new ArrayList<>();
        EvalCriteria workCriteria = null;
        for (EvalCriteria criteria : submit.getMilestone().getCriteriaList()) {
            if (criteria.getStatus() == Status.Active) {
                if (criteria.isWorkEval()) {
                    workCriteria = criteria;
                } else {
                    MilestoneEvalCriteriaDTO criteriaDTO = new MilestoneEvalCriteriaDTO();
                    criteriaDTO.setCriteriaId(criteria.getCriteriaId());
                    criteriaDTO.setCriteriaTitle(criteria.getCriteriaName());
                    criteriaDTO.setWeight(criteria.getEvalWeight());
                    for (EvalDetail evalDetail : criteria.getEvalDetails()) {
                        if (evalDetail.getMilestoneEval().getSubmit().equals(submit)) {
                            criteriaDTO.setGrade(evalDetail.getGrade());
                            criteriaDTO.setComment(evalDetail.getComment());
                        }
                    }
                    criteriaDTOs.add(criteriaDTO);
                }
            }

        }
        dto.setCriteriaPoints(criteriaDTOs);

        if (submit.getClassUser() != null) {
            dto.setFullName(submit.getClassUser().getUser().getFullName());
            dto.setUserName(submit.getClassUser().getUser().getAccountName());

            if (workCriteria != null) {
                Long workPoint = (long) 0;
                for (SubmitWork submitWork : submit.getSubmitWorks()) {
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
                dto.setWorkPoint(workPoint);

                double expectedWork = workCriteria.getExpectedWork();
                double workGrade = workPoint / expectedWork * 10.0;
                dto.setWorkGrade(Math.round(workGrade * 100.0) / 100.0);
                dto.setWorkWeight(workCriteria.getEvalWeight());
                dto.setWorkCriteriaId(workCriteria.getCriteriaId());
            }

        } else {
            dto.setFullName(submit.getGroup().getGroupCode());
            dto.setUserName("Group");
        }

        return dto;
    }

    @Override
    public ResponseEntity<String> milestoneEval(Long milestoneId, MilestoneEvalRequestWrapper requestWrapper) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

        HashMap<Long, MilestoneEval> milestoneEvals = new HashMap<Long, MilestoneEval>();
        HashMap<MilestoneeEvalCriteriaKey, EvalDetail> milestoneCriteriaDetails = new HashMap<MilestoneeEvalCriteriaKey, EvalDetail>();
        for (MilestoneEval milestoneEval : milestone.getMilestoneEvals()) {
            milestoneEvals.put(milestoneEval.getSubmit().getSubmitId(), milestoneEval);
            for (EvalDetail detail : milestoneEval.getEvalDetails()) {
                MilestoneeEvalCriteriaKey key = new MilestoneeEvalCriteriaKey();
                key.setSubmitId(detail.getMilestoneEval().getSubmit().getSubmitId());
                key.setCriteriaId(detail.getEvalCriteria().getCriteriaId());
                milestoneCriteriaDetails.put(key, detail);
            }
        }

        List<MilestoneEval> newMilestoneEvals = new ArrayList<>();
        List<EvalDetail> newEvalDetails = new ArrayList<>();
        for (MilestoneEvalRequestDTO requestDTO : requestWrapper.getEvalList()) {

            MilestoneEval milestoneEval = new MilestoneEval();

            if (milestoneEvals.containsKey(requestDTO.getSubmitId())) {
                milestoneEval = milestoneEvals.get(requestDTO.getSubmitId());
            } else {
                Submit submit = submitRepository.findById(requestDTO.getSubmitId())
                        .orElseThrow(() -> new CustomException("Submit doesnt exist"));
                milestoneEval.setMilestone(milestone);
                milestoneEval.setSubmit(submit);
                milestoneEval.setClassUser(submit.getClassUser());
            }

            milestoneEval.setComment(requestDTO.getComment());
            milestoneEval.setBonus(requestDTO.getBonus());
            milestoneEval.setGrade(requestDTO.getGrade());

            List<EvalCriteriaRequest> requestList = requestDTO.getCriteria();
            if (requestDTO.getWorkCriteriaId() != null) {
                EvalCriteriaRequest workCriteria = new EvalCriteriaRequest();
                workCriteria.setCriteriaId(requestDTO.getWorkCriteriaId());
                workCriteria.setGrade(requestDTO.getWorkGrade());
                requestList.add(workCriteria);
            }

            for (EvalCriteriaRequest criteriaRequest : requestDTO.getCriteria()) {
                EvalDetail detail = new EvalDetail();

                MilestoneeEvalCriteriaKey key = new MilestoneeEvalCriteriaKey(requestDTO.getSubmitId(),
                        criteriaRequest.getCriteriaId());
                if (milestoneCriteriaDetails.containsKey(key)) {
                    detail = milestoneCriteriaDetails.get(key);
                } else {
                    EvalCriteria criteria = criteriaRepositories.findById(criteriaRequest.getCriteriaId())
                            .orElseThrow(() -> new CustomException("criteria doesnt exist"));
                    detail.setEvalCriteria(criteria);
                    detail.setMilestoneEval(milestoneEval);
                }

                if (detail.getEvalCriteria().isWorkEval()) {
                    detail.setTotalLoc(requestDTO.getWorkPoint());
                }
                detail.setComment(criteriaRequest.getComment());
                detail.setGrade(criteriaRequest.getGrade());

                newEvalDetails.add(detail);
            }

            newMilestoneEvals.add(milestoneEval);
        }

        milestoneEvalRepository.saveAll(newMilestoneEvals);
        evalDetailRepositories.saveAll(newEvalDetails);
        return ResponseEntity.ok("milestone evaluated");
    }

    @Override
    public ResponseEntity<TraineeEvalDTO> traineeEval(Long submitId, User user) {
        Submit currentSubmit = submitRepository.findById(submitId)
                .orElseThrow(() -> new CustomException("submit doesnt exist"));

        User currentUser = userRepository.findById(user.getUserId()).get();
        // if (!currentUser.equals(currentSubmit.getClassUser().getUser())) {
        // throw new CustomException("not owner of this submit");
        // }
        Long workCriteriaId = null;
        Long workCount = (long) 0;
        Double workWeight = null;
        Long workPoint = (long) 0;
        Double workGrade = null;

        Double bonusGrade = null;
        Double milestoneGrade = null;
        String milestoneComment = null;

        List<MilestoneEvalWorkDTO> submitWorkDTOs = new ArrayList<>();
        if (!currentSubmit.getSubmitWorks().isEmpty()) {
            for (SubmitWork submitWork : currentSubmit.getSubmitWorks()) {
                if (!submitWork.getWorkEvals().isEmpty()) {
                    MilestoneEvalWorkDTO evalWorkDTO = toWorkEvalDTO(submitWork);
                    workCount++;
                    workPoint += evalWorkDTO.getCurrentPoint();
                    submitWorkDTOs.add(evalWorkDTO);
                }
            }
        }

        for (EvalCriteria criteria : currentSubmit.getMilestone().getCriteriaList()) {
            if (criteria.getStatus() == Status.Active) {
                if (criteria.isWorkEval()) {
                    workCriteriaId = criteria.getCriteriaId();
                    workWeight = criteria.getEvalWeight();

                    double expectedWork = criteria.getExpectedWork();
                    workGrade = workPoint / expectedWork * 10.0;
                    workGrade = Math.round(workGrade * 100.0) / 100.0;
                }
            }
        }

        List<MilestoneEvalCriteriaDTO> evaluatedCriteria = new ArrayList<>();
        if (!currentSubmit.getMilestoneEvals().isEmpty()) {
            MilestoneEval milestoneEval = currentSubmit.getMilestoneEvals().get(0);
            bonusGrade = milestoneEval.getBonus();
            milestoneGrade = milestoneEval.getGrade();
            milestoneComment = milestoneEval.getComment();
            for (EvalDetail detail : milestoneEval.getEvalDetails()) {
                if (!detail.getEvalCriteria().isWorkEval()) {
                    evaluatedCriteria.add(toEvaluatedCriteriaDTO(detail));
                }
            }
        }

        TraineeEvalDTO resultDTO = new TraineeEvalDTO();
        resultDTO.setFullName(currentSubmit.getClassUser().getUser().getFullName());
        resultDTO.setUserName(currentSubmit.getClassUser().getUser().getAccountName());
        if (currentSubmit.getGroup() != null) {
            resultDTO.setGroupName(currentSubmit.getGroup().getGroupCode());
        }
        resultDTO.setMilestoneName(currentSubmit.getMilestone().getTitle());
        resultDTO.setWorkCriteriaId(workCriteriaId);
        resultDTO.setWorkWeight(workWeight);
        resultDTO.setWorkCount(workCount);
        resultDTO.setWorkGrade(workGrade);
        resultDTO.setBonusGrade(bonusGrade);
        resultDTO.setMilestoneGrade(milestoneGrade);
        resultDTO.setMilestoneComment(milestoneComment);
        resultDTO.setEvaluatedWork(submitWorkDTOs);
        resultDTO.setEvaluatedCriteria(evaluatedCriteria);

        return ResponseEntity.ok(resultDTO);
    }

    private MilestoneEvalCriteriaDTO toEvaluatedCriteriaDTO(EvalDetail detail) {
        MilestoneEvalCriteriaDTO dto = new MilestoneEvalCriteriaDTO();
        dto.setCriteriaId(detail.getEvalCriteria().getCriteriaId());
        dto.setCriteriaTitle(detail.getEvalCriteria().getCriteriaName());
        dto.setWeight(detail.getEvalCriteria().getEvalWeight());
        dto.setComment(detail.getComment());
        dto.setGrade(detail.getGrade());
        return dto;
    }

    private MilestoneEvalWorkDTO toWorkEvalDTO(SubmitWork submitWork) {
        MilestoneEvalWorkDTO evalDTO = new MilestoneEvalWorkDTO();

        evalDTO.setSubmitId(submitWork.getSubmit().getSubmitId());
        evalDTO.setRequirementId(submitWork.getWork().getIssueId());
        evalDTO.setRequirementName(submitWork.getWork().getTitle());
        WorkEval latestEval = new WorkEval();
        for (WorkEval eval : submitWork.getWorkEvals()) {
            if (latestEval.getCreatedDate() == null) {
                latestEval = eval;
            }

            if (latestEval.getCreatedDate().before(eval.getCreatedDate())) {
                latestEval = eval;
            }
        }
        evalDTO.setComment(latestEval.getComment());
        evalDTO.setComplexityName(latestEval.getComplexity().getSettingTitle());
        evalDTO.setQualityname(latestEval.getQuality().getSettingTitle());
        evalDTO.setCurrentPoint(latestEval.getWorkEval());
        return evalDTO;
    }

    @Override
    public ResponseEntity<String> milestoneEvalClear(Long milestoneId, Long criteriaId) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

        List<EvalDetail> newDetails = new ArrayList<>();
       
        for (MilestoneEval milestoneEval : milestone.getMilestoneEvals()) {
            for (EvalDetail detail : milestoneEval.getEvalDetails()) {
                if(detail.getEvalCriteria().getCriteriaId() == criteriaId){
                    detail.setGrade(null);
                    newDetails.add(detail);
                }
            }
        }

        evalDetailRepositories.saveAll(newDetails);
        milestoneGradeEvaluate(milestone);

        return ResponseEntity.ok("criteria evaluation cleared");
    }

    private void milestoneGradeEvaluate(Milestone milestone) {
        List<MilestoneEval> newMilestoneEval = new ArrayList<>();
        
    }

}
