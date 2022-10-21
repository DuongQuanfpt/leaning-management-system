package swp490.g23.onlinelearningsystem.entities.assignment.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.request.AssignmentRequestDTO;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentPaginate;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.AssignmentRepository;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.criteria.AssignmentCriteria;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.criteriaEntity.AssignmenQuery;
import swp490.g23.onlinelearningsystem.entities.assignment.service.IAssignmentService;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.SubjecRepository;
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
    private SubjecRepository subjecRepository;

    @Override
    public ResponseEntity<AssignmentPaginate> getAssignment(int limit, int page, String keyword, String subjectFilter,
            String statusFilter) {
        AssignmenQuery result = assignmentCriteria.searchFilterAssignment(keyword, statusFilter, subjectFilter);

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
            subjectList.add(assignment.getForSubject().getSubjectCode());
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
        assignmentRepository.save(assignment);
        return ResponseEntity.ok("Assignment update successfully!");
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
        }
        return ResponseEntity.ok("Assignment add successfully!");
    }

    public AssignmentResponseDTO toDTO(Assignment entity) {
        AssignmentResponseDTO responseDTO = new AssignmentResponseDTO();

        responseDTO.setAssId(entity.getAssId());
        responseDTO.setAssBody(entity.getAssBody());
        responseDTO.setEval_weight(entity.getEval_weight());
        responseDTO.setOnGoing(entity.isOnGoing());
        responseDTO.setTeamWork(entity.isTeamWork());
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setTitle(entity.getTitle());
        responseDTO.setSubjectName(entity.getForSubject().getSubjectCode());

        return responseDTO;
    }

}
