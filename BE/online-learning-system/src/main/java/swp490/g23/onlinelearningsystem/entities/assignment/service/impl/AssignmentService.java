package swp490.g23.onlinelearningsystem.entities.assignment.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentPaginate;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.AssignmentRepository;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.criteria.AssignmentCriteria;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.criteriaEntity.AssignmenQuery;
import swp490.g23.onlinelearningsystem.entities.assignment.service.IAssignmentService;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Service
public class AssignmentService implements IAssignmentService {

    @Autowired
    private AssignmentCriteria asignmentCriteria;

    @Autowired
    private AssignmentRepository asignmentRepository;

    @Override
    public ResponseEntity<AssignmentPaginate> getAssignment(int limit, int page, String keyword, String subjectFilter,
            String statusFilter) {
        AssignmenQuery result = asignmentCriteria.searchFilterAssignment(keyword, statusFilter, subjectFilter);

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
