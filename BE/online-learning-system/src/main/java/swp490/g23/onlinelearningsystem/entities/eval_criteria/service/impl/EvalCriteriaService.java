package swp490.g23.onlinelearningsystem.entities.eval_criteria.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.AssignmentRepository;
import swp490.g23.onlinelearningsystem.entities.assignment.service.impl.AssignmentService;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.filter.CriteriaFilterDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.request.CriteriaRequestDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response.CriteriaPaginateResponseDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response.CriteriaResponseDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.EvalCriteriaRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.criteria.ClassCriteriaRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.criteria.CriteriaRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.criteriaEntity.CriteriaQuery;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.service.IEvalCriteriaService;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.service.impl.MilestoneService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Service
public class EvalCriteriaService implements IEvalCriteriaService {

    @Autowired
    private EvalCriteriaRepositories evalCriteriaRepositories;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private CriteriaRepositories criteriaRepositories;

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private ClassCriteriaRepositories classCriteriaRepositories;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private MilestoneService milestoneService;

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<CriteriaPaginateResponseDTO> getCriteria(int limit, int page, String keyword,
            String statusFilter, String assignmentFilter) {

        CriteriaQuery result = criteriaRepositories.searchFilterCriteria(keyword, statusFilter, assignmentFilter);

        TypedQuery<EvalCriteria> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        List<CriteriaResponseDTO> list = new ArrayList<>();
        List<StatusEntity> statusfilter = new ArrayList<>();
        List<String> filterAssignment = new ArrayList<>();
        List<EvalCriteria> criteriaList = queryResult.getResultList();

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statusfilter.add(new StatusEntity(status));
        }

        for (EvalCriteria evalCriteria : criteriaList) {
            if (!filterAssignment.contains(evalCriteria.getAssignment().getTitle())) {
                filterAssignment.add(evalCriteria.getAssignment().getTitle());
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

        for (EvalCriteria evalCriteria : queryResult.getResultList()) {
            list.add(toDTO(evalCriteria));
        }

        CriteriaPaginateResponseDTO dto = new CriteriaPaginateResponseDTO();
        dto.setPage(page);
        dto.setTotalItem(totalItem);
        dto.setListResult(list);
        dto.setTotalPage(totalPage);
        dto.setStatusFilter(statusfilter);
        dto.setAssignmentFilter(filterAssignment);

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<String> updateStatus(Long criteriaId) {
        EvalCriteria evalCriteria = evalCriteriaRepositories.findById(criteriaId).get();
        if (evalCriteria == null) {
            throw new CustomException("Criteria doesn't exist!");
        }
        if (evalCriteria.getStatus() == Status.Active) {
            evalCriteria.setStatus(Status.Inactive);
        } else {
            evalCriteria.setStatus(Status.Active);
        }
        evalCriteriaRepositories.save(evalCriteria);
        return ResponseEntity.ok("Status update successfully");
    }

    @Override
    public ResponseEntity<CriteriaResponseDTO> viewCriteria(Long criteriaId) {
        EvalCriteria evalCriteria = evalCriteriaRepositories.findById(criteriaId).get();
        if (evalCriteria == null) {
            throw new CustomException("Criteria doesn't exist!");
        }
        return ResponseEntity.ok(toDTO(evalCriteria));
    }

    @Override
    public ResponseEntity<String> updateCriteria(Long criteriaId, CriteriaRequestDTO dto) {
        EvalCriteria evalCriteria = evalCriteriaRepositories.findById(criteriaId).get();
        if (evalCriteria == null) {
            throw new CustomException("Criteria doesn't exist!");
        }
        if (dto.getCriteriaName() != null) {
            evalCriteria.setCriteriaName(dto.getCriteriaName());
        }
        if (dto.getDescription() != null) {
            evalCriteria.setDescription(dto.getDescription());
        }
        if (dto.getEvalWeight() != null) {
            evalCriteria.setEvalWeight(dto.getEvalWeight());
        }
        if (dto.getExpectedWork() != null) {
            evalCriteria.setExpectedWork(dto.getExpectedWork());
        }
        if (dto.getStatus() != null) {
            evalCriteria.setStatus(dto.getStatus());
        }
        if (dto.getIsTeamEval() == 1) {
            evalCriteria.setTeamEval(true);
        } else {
            evalCriteria.setTeamEval(false);
        }
        evalCriteriaRepositories.save(evalCriteria);
        return ResponseEntity.ok("Criteria updated successfully");
    }

    @Override
    public ResponseEntity<String> addCriteria(CriteriaRequestDTO dto) {
        EvalCriteria evalCriteria = new EvalCriteria();
        if (dto.getCriteriaName() != null) {
            evalCriteria.setCriteriaName(dto.getCriteriaName());
        }
        if (dto.getDescription() != null) {
            evalCriteria.setDescription(dto.getDescription());
        }
        if (dto.getEvalWeight() != null) {
            evalCriteria.setEvalWeight(dto.getEvalWeight());
        }
        if (dto.getExpectedWork() != null) {
            evalCriteria.setExpectedWork(dto.getExpectedWork());
        }
        if (dto.getStatus() != null) {
            evalCriteria.setStatus(dto.getStatus());
        }
        if (dto.getIsTeamEval() == 1) {
            evalCriteria.setTeamEval(true);
        } else {
            evalCriteria.setTeamEval(false);
        }
        if (dto.getAssignment() != null) {
            Assignment assignment = assignmentRepository.findByTitle(dto.getAssignment());
            evalCriteria.setAssignment(assignment);
        }
        evalCriteriaRepositories.save(evalCriteria);
        return ResponseEntity.ok("Add Criteria successfully");
    }

    @Override
    public ResponseEntity<CriteriaFilterDTO> getFilter() {
        List<StatusEntity> statuses = new ArrayList<>();
        List<AssignmentResponseDTO> filterAssignment = new ArrayList<>();
        List<MilestoneResponseDTO> filterMilestone = new ArrayList<>();
        List<String> filterClass = new ArrayList<>();
        List<Assignment> assignments = assignmentRepository.findAssigmentWithActiveSubject();
        List<Milestone> milestones = milestoneRepository.findByActiveClass();
        List<Classes> classes = classRepositories.findClassesActive();

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statuses.add(new StatusEntity(status));
        }
        for (Assignment assignment : assignments) {
            filterAssignment.add(assignmentService.toDTO(assignment));
        }
        for (Milestone milestone : milestones) {
            filterMilestone.add(milestoneService.toDTO(milestone));
        }
        for (Classes clazz : classes) {
            filterClass.add(clazz.getCode());
        }
        CriteriaFilterDTO filterDTO = new CriteriaFilterDTO();
        filterDTO.setStatusFilter(statuses);
        filterDTO.setAssignmentFilter(filterAssignment);
        filterDTO.setClassFilter(filterClass);
        filterDTO.setMilestoneFilter(filterMilestone);

        return ResponseEntity.ok(filterDTO);
    }

    @Override
    public ResponseEntity<CriteriaPaginateResponseDTO> getClassCriteria(int limit, int page, String keyword,
            String statusFilter, String classFilter, String milestoneFilter, Long userId) {
        User user = userRepository.findById(userId).get();
        CriteriaQuery result = classCriteriaRepositories.searchFilterClassCriteria(keyword, statusFilter,
                milestoneFilter, classFilter, user);

        TypedQuery<EvalCriteria> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        List<CriteriaResponseDTO> list = new ArrayList<>();
        List<StatusEntity> filterStatus = new ArrayList<>();
        List<String> filterClass = new ArrayList<>();
        List<String> filterMilestone = new ArrayList<>();
        List<EvalCriteria> criteriaList = queryResult.getResultList();

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            filterStatus.add(new StatusEntity(status));
        }

        for (EvalCriteria evalCriteria : criteriaList) {
            if (!filterClass.contains(evalCriteria.getMilestone().getClasses().getCode())) {
                filterClass.add(evalCriteria.getMilestone().getClasses().getCode());
            }
            if (!filterMilestone.contains(evalCriteria.getMilestone().getTitle())) {
                filterMilestone.add(evalCriteria.getMilestone().getTitle());
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

        for (EvalCriteria evalCriteria : queryResult.getResultList()) {
            list.add(toDTO(evalCriteria));
        }

        CriteriaPaginateResponseDTO dto = new CriteriaPaginateResponseDTO();
        dto.setPage(page);
        dto.setTotalItem(totalItem);
        dto.setListResult(list);
        dto.setTotalPage(totalPage);
        dto.setStatusFilter(filterStatus);
        dto.setClassFilter(filterClass);
        dto.setMilestoneFilter(filterMilestone);

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<String> updateClassCriteriaStatus(Long criteriaId) {
        EvalCriteria evalCriteria = evalCriteriaRepositories.findById(criteriaId).get();
        if (evalCriteria == null) {
            throw new CustomException("Criteria doesn't exist!");
        }
        if (evalCriteria.getStatus() == Status.Active) {
            evalCriteria.setStatus(Status.Inactive);
        } else {
            evalCriteria.setStatus(Status.Active);
        }
        evalCriteriaRepositories.save(evalCriteria);
        return ResponseEntity.ok("Status update successfully");
    }

    @Override
    public ResponseEntity<CriteriaResponseDTO> viewClassCriteria(Long criteriaId) {
        EvalCriteria evalCriteria = evalCriteriaRepositories.findById(criteriaId).get();
        if (evalCriteria == null) {
            throw new CustomException("Criteria doesn't exist!");
        }
        return ResponseEntity.ok(toDTO(evalCriteria));
    }

    @Override
    public ResponseEntity<String> updateClassCriteria(Long criteriaId, CriteriaRequestDTO dto) {
        EvalCriteria evalCriteria = evalCriteriaRepositories.findById(criteriaId).get();
        if (evalCriteria == null) {
            throw new CustomException("Criteria doesn't exist!");
        }
        if (dto.getCriteriaName() != null) {
            evalCriteria.setCriteriaName(dto.getCriteriaName());
        }
        if (dto.getDescription() != null) {
            evalCriteria.setDescription(dto.getDescription());
        }
        if (dto.getEvalWeight() != null) {
            evalCriteria.setEvalWeight(dto.getEvalWeight());
        }
        if (dto.getExpectedWork() != null) {
            evalCriteria.setExpectedWork(dto.getExpectedWork());
        }
        if (dto.getStatus() != null) {
            evalCriteria.setStatus(dto.getStatus());
        }
        if (dto.getIsTeamEval() == 1) {
            evalCriteria.setTeamEval(true);
        } else {
            evalCriteria.setTeamEval(false);
        }
        evalCriteriaRepositories.save(evalCriteria);
        return ResponseEntity.ok("Criteria updated successfully");
    }

    @Override
    public ResponseEntity<String> addClassCriteria(CriteriaRequestDTO dto) {
        EvalCriteria evalCriteria = new EvalCriteria();
        if (dto.getCriteriaName() != null) {
            evalCriteria.setCriteriaName(dto.getCriteriaName());
        }
        if (dto.getDescription() != null) {
            evalCriteria.setDescription(dto.getDescription());
        }
        if (dto.getEvalWeight() != null) {
            evalCriteria.setEvalWeight(dto.getEvalWeight());
        }
        if (dto.getExpectedWork() != null) {
            evalCriteria.setExpectedWork(dto.getExpectedWork());
        }
        if (dto.getStatus() != null) {
            evalCriteria.setStatus(dto.getStatus());
        }
        if (dto.getIsTeamEval() == 1) {
            evalCriteria.setTeamEval(true);
        } else {
            evalCriteria.setTeamEval(false);
        }
        if (dto.getAssignment() != null) {
            Assignment assignment = assignmentRepository.findByTitle(dto.getAssignment());
            evalCriteria.setAssignment(assignment);
        }
        if (dto.getMilestone() != null) {
            Milestone milestone = milestoneRepository.findByTitle(dto.getMilestone());
            evalCriteria.setMilestone(milestone);
        }
        evalCriteriaRepositories.save(evalCriteria);
        return ResponseEntity.ok("Add Criteria successfully");
    }

    public CriteriaResponseDTO toDTO(EvalCriteria entity) {
        CriteriaResponseDTO responseDTO = new CriteriaResponseDTO();

        responseDTO.setCriteriaId(entity.getCriteriaId());
        if (entity.getCriteriaName() != null) {
            responseDTO.setCriteriaName(entity.getCriteriaName());
        }
        if (entity.getDescription() != null) {
            responseDTO.setDescription(entity.getDescription());
        }
        if (entity.getEvalWeight() != null) {
            responseDTO.setEvalWeight(entity.getEvalWeight());
        }
        if (entity.getExpectedWork() != null) {
            responseDTO.setExpectedWork(entity.getExpectedWork());
        }
        if (entity.getAssignment() != null) {
            responseDTO.setAssignment(assignmentService.toDTO(entity.getAssignment()));
        }
        if (entity.getAssignment().getForSubject().getSubjectCode() != null) {
            responseDTO.setSubjectName(entity.getAssignment().getForSubject().getSubjectCode());
        }
        if (entity.getMilestone() != null) {
            responseDTO.setMilestone(entity.getMilestone().getTitle());
            responseDTO.setClassCode(entity.getMilestone().getClasses().getCode());
        }
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setIsTeamEval(entity.isTeamEval() ? 1 : 0);

        return responseDTO;
    }
}
