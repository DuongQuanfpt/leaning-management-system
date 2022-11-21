package swp490.g23.onlinelearningsystem.entities.assignment.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.filter.AssignmentFilterDTO;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.request.AssignmentRequestDTO;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentPaginate;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.AssignmentRepository;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.criteria.AssignmentCriteria;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.criteriaEntity.AssignmenQuery;
import swp490.g23.onlinelearningsystem.entities.assignment.service.IAssignmentService;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.groupMember.repositories.GroupMemberRepositories;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.SubjecRepository;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Service
public class AssignmentService implements IAssignmentService {

    @Autowired
    private AssignmentCriteria assignmentCriteria;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private GroupMemberRepositories memberRepositories;

    @Autowired
    private SubmitRepository submitRepository;

    @Autowired
    private SubjecRepository subjecRepository;

    @Override
    public ResponseEntity<AssignmentPaginate> getAssignment(int limit, int page, String keyword, String subjectFilter,
            String statusFilter) {
        AssignmenQuery result = assignmentCriteria.searchFilterAssignment(keyword, statusFilter, subjectFilter );

        TypedQuery<Assignment> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        List<AssignmentResponseDTO> list = new ArrayList<>();
        List<StatusEntity> statusfilter = new ArrayList<>();
        List<String> subjectList = new ArrayList<>();
        List<Assignment> assignments = queryResult.getResultList();

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statusfilter.add(new StatusEntity(status));
        }

        for (Assignment assignment : assignments) {
            String subjectCode = assignment.getForSubject().getSubjectCode();
            if (!subjectList.contains(subjectCode)) {
                subjectList.add(subjectCode);
            }

        }

        Long totalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        for (Assignment assignment : queryResult.getResultList()) {
            list.add(toDTO(assignment));
        }

        AssignmentPaginate dto = new AssignmentPaginate();
        dto.setPage(page);
        dto.setTotalItem(totalItem);
        dto.setListResult(list);
        dto.setTotalPage(totalPage);
        dto.setSubjectFilter(subjectList);
        dto.setStatusFilter(statusfilter);

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<AssignmentResponseDTO> viewAssignment(Long assId) {
        Assignment assignment = assignmentRepository.findById(assId).get();
        if (assignment == null) {
            throw new CustomException("Assignment doesn't exist!");
        }
        return ResponseEntity.ok(toDTO(assignment));
    }

    @Override
    public ResponseEntity<String> updateAssignment(Long assId, AssignmentRequestDTO dto) {
        Assignment assignment = assignmentRepository.findById(assId).get();
        if (assignment == null) {
            throw new CustomException("Assignment doesn't exist!");
        }

        if (dto.getTitle() != null) {
            assignment.setTitle(dto.getTitle());
        }
        if (dto.getAssBody() != null) {
            assignment.setAssBody(dto.getAssBody());
        }
        if (dto.getEval_weight() != null) {
            assignment.setEval_weight(dto.getEval_weight());
        }

        if (dto.getStatus() != null) {
            assignment.setStatus(Status.getFromValue(Integer.parseInt(dto.getStatus())).get());
        }

        if(dto.getIsFinal() == 1) {
            assignment.setFinal(true);
        } else {
            assignment.setFinal(false);
        }
      
        if (dto.getIsTeamWork() == 1) {
            assignment.setTeamWork(true);
        } else {
            assignment.setTeamWork(false);
            List<Milestone> milestoneOfAssignment = assignment.getMilestones();
            if (!milestoneOfAssignment.isEmpty()) {
                for (Milestone milestone : milestoneOfAssignment) {
                    List<Group> groups = groupRepository.findGroupByMilestone(milestone.getMilestoneId());
                    if (!groups.isEmpty()) {
                        removeGroupConfigInMilestone(milestone, groups);
                    }
                }
            }
        }

        assignmentRepository.save(assignment);
        return ResponseEntity.ok("Assignment update successfully!");
    }

    private void removeGroupConfigInMilestone(Milestone milestone, List<Group> groups) {
        for (Group group : groups) {
            List<Submit> submits = group.getSubmits();
            List<Submit> submitNew = new ArrayList<>();
            for (Submit submit : submits) {
                if (submit.getMilestone().getMilestoneId() == milestone.getMilestoneId()) {
                    if (submit.getClassUser() == null) {
                        submitRepository.delete(submit);
                    } else {
                        submit.setGroup(null);
                        submitNew.add(submit);
                    }
                }

            }
            submitRepository.saveAll(submitNew);
        }

        List<Group> deleteGroups = groupRepository.findBySubmitsIsNull();
        for (Group group : deleteGroups) {

            List<GroupMember> groupMembers = group.getGroupMembers();
            memberRepositories.deleteAll(groupMembers);

        }
        groupRepository.deleteAll(deleteGroups);
    }

    @Override
    public ResponseEntity<String> updateStatus(Long assId) {
        Assignment assignment = assignmentRepository.findById(assId).get();
        if (assignment == null) {
            throw new CustomException("Assignment doesn't exist!");
        }
        if (assignment.getStatus() == Status.Active) {
            assignment.setStatus(Status.Inactive);
        } else {
            assignment.setStatus(Status.Active);
        }
        assignmentRepository.save(assignment);
        return ResponseEntity.ok("Status update successfully!");
    }

    @Override
    public ResponseEntity<String> addAssignment(AssignmentRequestDTO dto) {
        Assignment assignment = new Assignment();
        String subjectRequest = dto.getSubjectName();
        Subject subject = subjecRepository.findBySubjectCode(subjectRequest);
        if (dto.getAssBody() != null) {
            assignment.setAssBody(dto.getAssBody());
        }
        if (dto.getEval_weight() != null) {
            assignment.setEval_weight(dto.getEval_weight());
        }
        if (dto.getTitle() != null) {
            assignment.setTitle(dto.getTitle());
        }
        assignment.setStatus(Status.getFromValue(Integer.parseInt(dto.getStatus())).get());
        if (subjectRequest != null) {
            assignment.setForSubject(subject);
        } else {
            throw new CustomException("You haven't assigned subject yet!");
        }

        assignment.setOnGoing(false);

        if (dto.getIsTeamWork() == 1) {
            assignment.setTeamWork(true);
        } else {
            assignment.setTeamWork(false);
        }

        if (dto.getIsFinal() == 1) {
            assignment.setFinal(true);
        } else {
            assignment.setFinal(false);
        }

        assignmentRepository.save(assignment);
        return ResponseEntity.ok("Assignment add successfully!");
    }

    @Override
    public ResponseEntity<AssignmentFilterDTO> getFilter() {
        List<String> subjects = new ArrayList<>();
        List<StatusEntity> statuses = new ArrayList<>();

        for (Subject subject : subjecRepository.findSubjectActive()) {
            subjects.add(subject.getSubjectCode());
        }

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statuses.add(new StatusEntity(status));
        }

        AssignmentFilterDTO filterDTO = new AssignmentFilterDTO();
        filterDTO.setStatusFilter(statuses);
        filterDTO.setSubjectFilter(subjects);

        return ResponseEntity.ok(filterDTO);
    }

    public AssignmentResponseDTO toDTO(Assignment entity) {
        AssignmentResponseDTO responseDTO = new AssignmentResponseDTO();

        responseDTO.setAssId(entity.getAssId());
        if (entity.getAssBody() != null) {
            responseDTO.setAssBody(entity.getAssBody());
        }
        if (entity.getEval_weight() != null) {
            responseDTO.setEval_weight(entity.getEval_weight());
        }
        if (entity.getTitle() != null) {
            responseDTO.setTitle(entity.getTitle());
        }
        if (entity.getForSubject().getSubjectCode() != null) {
            responseDTO.setSubjectName(entity.getForSubject().getSubjectCode());
        }
        responseDTO.setIsOnGoing(entity.isOnGoing() ? 1 : 0);
        responseDTO.setIsFinal(entity.isFinal() ? 1 : 0);
        responseDTO.setIsTeamWork(entity.isTeamWork() ? 1 : 0);
        responseDTO.setStatus(entity.getStatus());

        return responseDTO;
    }

}
