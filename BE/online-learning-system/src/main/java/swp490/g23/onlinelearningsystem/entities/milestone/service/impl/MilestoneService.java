package swp490.g23.onlinelearningsystem.entities.milestone.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.AssignmentRepository;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.filter.MilestoneFilter;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.filter.MilestoneFilterValue;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.request.MilestoneRequestDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestonePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.criteria.MilestoneCriteria;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.criteria_entity.MilestoneQuery;
import swp490.g23.onlinelearningsystem.entities.milestone.service.IMilestoneService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.MilestoneStatusEntity;

@Service
public class MilestoneService implements IMilestoneService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private MilestoneCriteria milestoneCriteria;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Override
    public ResponseEntity<MilestonePaginateDTO> displayMilestone(String keyword, int limit, int page,
            String filterClass, String filterAss, String filterStatus, User user) {

        List<MilestoneResponseDTO> resultList = new ArrayList<>();
        List<String> classFilter = new ArrayList<>();
        List<MilestoneFilterValue> assFilter = new ArrayList<>();
        List<MilestoneStatusEntity> statusFilter = new ArrayList<>();

        User currentUser = userRepository.findById(user.getUserId()).get();

        MilestoneQuery result = milestoneCriteria.searchFilterMilestone(keyword, filterStatus,
                filterAss, filterClass, currentUser);
        TypedQuery<Milestone> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();
        List<Milestone> milestones = queryResult.getResultList();

        for (MilestoneStatusEnum status : new ArrayList<MilestoneStatusEnum>(
                EnumSet.allOf(MilestoneStatusEnum.class))) {
            statusFilter.add(new MilestoneStatusEntity(status));
        }

        for (Milestone milestone : milestones) {
            if (milestone.getClasses() != null) {
                if (!classFilter.contains((milestone.getClasses().getCode()))) {
                    classFilter.add((milestone.getClasses().getCode()));
                }
            }

            if (milestone.getAssignment() != null) {
                boolean canAdd = true;

                for (MilestoneFilterValue filterValue : assFilter) {

                    if (filterValue.getValue().equals(milestone.getAssignment().getAssId().toString())) {
                        canAdd = false;
                        break;
                    }
                }

                if (canAdd == true) {
                    assFilter.add(new MilestoneFilterValue(milestone.getAssignment().getTitle(),
                            milestone.getAssignment().getAssId().toString()));
                }
            }
        }

        Long toltalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) toltalItem / limit);
        } else {
            totalPage = 1;
        }

        for (Milestone milestone : queryResult.getResultList()) {
            resultList.add(toDTO(milestone));
        }

        MilestonePaginateDTO dto = new MilestonePaginateDTO();
        dto.setPage(page);
        dto.setTotalItem(toltalItem);
        dto.setTotalPage(totalPage);
        dto.setListResult(resultList);
        dto.setStatusFilter(statusFilter);
        dto.setClassFilter(classFilter);
        dto.setAssFilter(assFilter);

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<MilestoneResponseDTO> milestoneDetail(Long id) {
        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new CustomException("Subject setting doesnt exist"));
        return ResponseEntity.ok(toDTO(milestone));
    }

    @Override
    public ResponseEntity<MilestoneFilter> milestoneFilter() {
        MilestoneFilter filter = new MilestoneFilter();
        List<Classes> classes = classRepositories.findAll();
        List<Assignment> assignments = assignmentRepository.findAll();

        List<MilestoneStatusEntity> statusFilter = new ArrayList<>();
        for (MilestoneStatusEnum status : new ArrayList<MilestoneStatusEnum>(
                EnumSet.allOf(MilestoneStatusEnum.class))) {
            statusFilter.add(new MilestoneStatusEntity(status));
        }

        List<String> classCodes = new ArrayList<>();
        for (Classes c : classes) {
            classCodes.add(c.getCode());
        }

        List<MilestoneFilterValue> assFilter = new ArrayList<>();
        for (Assignment assignment : assignments) {
            assFilter.add(new MilestoneFilterValue(assignment.getTitle(), assignment.getAssId().toString()));
        }

        filter.setStatusFilter(statusFilter);
        filter.setAssFilter(assFilter);
        filter.setClassCode(classCodes);
        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<String> milestonAdd(MilestoneRequestDTO dto) {
        Milestone milestone = new Milestone();

        if (dto.getAssignmentId() != null) {
            milestone.setAssignment(assignmentRepository.findById(dto.getAssignmentId())
                    .orElseThrow(() -> new CustomException("Assignment doesnt exist")));
        }

        if (dto.getClassesCode() != null) {
            Classes classes = classRepositories.findClassByCode(dto.getClassesCode());
            if (classes != null) {
                milestone.setClasses(classes);
            } else {
                throw new CustomException("Classes doesnt exist");
            }

        }

        if (dto.getTitle() != null) {
            milestone.setTitle(dto.getTitle());
        }

        if (dto.getDescription() != null) {
            milestone.setDescription(dto.getDescription());
            ;
        }

        if (dto.getFromDate() != null) {
            milestone.setFromDate(LocalDate.parse(dto.getFromDate()));
        }

        if (dto.getToDate() != null) {
            milestone.setToDate(LocalDate.parse(dto.getToDate()));
        }

        if (dto.getStatus() != null) {
            milestone.setStatus(MilestoneStatusEnum.fromInt(Integer.parseInt(dto.getStatus())));
        } else {
            throw new CustomException("Must asign a status");
        }

        milestoneRepository.save(milestone);
        return ResponseEntity.ok("Milestone added");
    }

    @Override
    public ResponseEntity<String> milestonEdit(MilestoneRequestDTO dto, Long id) {
        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        if(dto.getTitle() != null){
            milestone.setTitle(dto.getTitle());
        }    
        
        if(dto.getDescription() != null){
            milestone.setDescription(dto.getDescription());
        }        

        if(dto.getToDate() != null) {
            milestone.setToDate(LocalDate.parse(dto.getToDate()));
        }

        if(dto.getFromDate() != null) {
            milestone.setFromDate(LocalDate.parse( dto.getFromDate()));
        }

        milestoneRepository.save(milestone);
        return ResponseEntity.ok("milestone updated");
    }

    public MilestoneResponseDTO toDTO(Milestone entity) {
        MilestoneResponseDTO responseDTO = new MilestoneResponseDTO();

        responseDTO.setMilestoneId(entity.getMilestoneId());
        responseDTO.setAssignment(
                new MilestoneFilterValue(entity.getAssignment().getTitle(),
                        entity.getAssignment().getAssId().toString()));

        if (entity.getClasses() != null) {
            responseDTO.setClassesCode(entity.getClasses().getCode());
        }
        responseDTO.setStatus(entity.getStatus().toString());
        if (entity.getDescription() != null) {
            responseDTO.setDescription(entity.getDescription());
        }

        if (entity.getFromDate() != null) {
            responseDTO.setFromDate(entity.getFromDate().toString());
        }

        if (entity.getToDate() != null) {
            responseDTO.setToDate(entity.getToDate().toString());
        }

        if (entity.getTitle() != null) {
            responseDTO.setTitle(entity.getTitle());
        }

        return responseDTO;
    }

}
