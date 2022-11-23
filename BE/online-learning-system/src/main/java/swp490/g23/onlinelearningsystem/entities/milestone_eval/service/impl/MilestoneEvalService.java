package swp490.g23.onlinelearningsystem.entities.milestone_eval.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.eval_detail.domain.EvalDetail;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalCriteriaDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalCriteriaFilter;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalFilter;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalGroupFilter;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.service.IMilestoneEvalService;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria.SubmitCriteria;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria_entity.SubmitQuery;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Service
public class MilestoneEvalService implements IMilestoneEvalService {

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private GroupRepository groupRepository;

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

        return dto;
    }

    @Override
    public ResponseEntity<MilestoneEvalPaginateDTO> getMilestoneEvalForm(int page, int limit, String keyword,
            Long milestoneId, Long groupId, User user) {
        User currentUser = userRepository.findById(user.getUserId()).get();

        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

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
        for (Submit submit : queryResult.getResultList()) {
            submitList.add(toDTO(submit));
        }

        List<MilestoneEvalCriteriaFilter> criteriaFilters = new ArrayList<>();
        for (EvalCriteria criteria : milestone.getCriteriaList()) {
            if (criteria.getStatus() == Status.Active) {
                if (!criteria.isWorkEval()) {
                    criteriaFilters.add(toCriteriaFilter(criteria));
                } else {

                }
            }
        }

        List<Group> groupOfMilestone = groupRepository.findGroupByMilestone(milestoneId);
        List<MilestoneEvalGroupFilter> groupFilter = new ArrayList<>();
        for (Group group : groupOfMilestone) {
            groupFilter.add(toGroupFilter(group));
        }

        MilestoneEvalPaginateDTO paginateDTO = new MilestoneEvalPaginateDTO();
        paginateDTO.setPage(page);
        paginateDTO.setListResult(submitList);
        paginateDTO.setTotalItem(totalItem);
        paginateDTO.setTotalPage(totalPage);
        paginateDTO.setCriteriaFilter(criteriaFilters);
        paginateDTO.setGroupFilter(groupFilter);

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
        return dto;
    }

    private MilestoneEvalResponseDTO toDTO(Submit submit) {
        MilestoneEvalResponseDTO dto = new MilestoneEvalResponseDTO();
        dto.setSubmitId(submit.getSubmitId());

        if (submit.getGroup() != null) {
            dto.setGroupName(submit.getGroup().getGroupCode());
        } else {
            dto.setGroupName("No Group");
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
                    for (EvalDetail evalDetail : criteria.getEvalDetails()) {
                        if (evalDetail.getMilestoneEval().getSubmit().equals(submit)) {
                            criteriaDTO.setGrade(evalDetail.getGrade());
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

            }

        } else {
            dto.setFullName(submit.getGroup().getGroupCode());
            dto.setUserName("Group");
        }

        return dto;
    }

}
