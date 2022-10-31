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
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.AssignmentRepository;
import swp490.g23.onlinelearningsystem.entities.assignment.service.impl.AssignmentService;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.EvalCriteriaRepositories;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.filter.MilestoneFilter;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.filter.MilestoneFilterClass;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.request.MilestoneRequestDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneGroupDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneMemberDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestonePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.criteria.MilestoneCriteria;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.criteria_entity.MilestoneQuery;
import swp490.g23.onlinelearningsystem.entities.milestone.service.IMilestoneService;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.MilestoneStatusEntity;

@Service
public class MilestoneService implements IMilestoneService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private MilestoneCriteria milestoneCriteria;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private SubmitRepository submitRepository;

    @Autowired
    private EvalCriteriaRepositories evalCriteriaRepositories;

    @Override
    public ResponseEntity<MilestonePaginateDTO> displayMilestone(String keyword, int limit, int page,
            String filterClass, String filterAss, String filterStatus, User user) {

        List<MilestoneResponseDTO> resultList = new ArrayList<>();
        List<String> classFilter = new ArrayList<>();
        List<AssignmentResponseDTO> assFilter = new ArrayList<>();
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

                for (AssignmentResponseDTO filterValue : assFilter) {

                    if (filterValue.getAssId() == milestone.getAssignment().getAssId()) {
                        canAdd = false;
                        break;
                    }
                }

                if (canAdd == true) {
                    assFilter.add(assignmentService.toDTO(milestone.getAssignment()));
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
                .orElseThrow(() -> new CustomException("current user setting doesnt exist"));
        return ResponseEntity.ok(toDTO(milestone));
    }

    @Override
    public ResponseEntity<MilestoneFilter> milestoneFilter(Long id) {
        User user = userRepository.findById(id).get();
        MilestoneFilter filter = new MilestoneFilter();
        List<Classes> classes = classRepositories.findClassTrainerAssigned(user.getAccountName());
        List<Assignment> assignments = assignmentRepository.findAll();

        List<MilestoneStatusEntity> statusFilter = new ArrayList<>();
        for (MilestoneStatusEnum status : new ArrayList<MilestoneStatusEnum>(
                EnumSet.allOf(MilestoneStatusEnum.class))) {
            statusFilter.add(new MilestoneStatusEntity(status));
        }

        List<MilestoneFilterClass> classFilter = new ArrayList<>();
        for (Classes c : classes) {
            classFilter.add(new MilestoneFilterClass(c.getCode(), c.getSubject().getSubjectCode()));
        }

        List<AssignmentResponseDTO> assFilter = new ArrayList<>();
        for (Assignment assignment : assignments) {
            if(assignment.getMilestones().isEmpty()){
                assFilter.add(assignmentService.toDTO(assignment));
            }
           
        }

        filter.setStatusFilter(statusFilter);
        filter.setAssFilter(assFilter);
        filter.setClassFilter(classFilter);
        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<String> milestonAdd(MilestoneRequestDTO dto) {
        Milestone milestone = new Milestone();
        if (dto.getAssignmentId() != null) {
            milestone.setAssignment(assignmentRepository.findById(dto.getAssignmentId())
                    .orElseThrow(() -> new CustomException("Assignment doesnt exist")));
            List<EvalCriteria> evalCriterias = milestone.getAssignment().getEvalCriteriaList();

            for (EvalCriteria evalCriteria : evalCriterias) {
                evalCriteria.setMilestone(milestone);
                evalCriteriaRepositories.save(evalCriteria);
            }
        } else {
            throw new CustomException("Must assign a assignment to milestone");
        }

        Classes classes = new Classes();
        if (dto.getClassesCode() != null) {
            classes = classRepositories.findClassByCode(dto.getClassesCode());
            if (classes != null) {
                milestone.setClasses(classes);
            } else {
                throw new CustomException("Class doesnt exist");
            }

        } else {
            throw new CustomException("Must assign a class to milestone");
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

        List<Submit> submits = new ArrayList<>();
        for (ClassUser user : classes.getClassUsers()) {
                Submit submit = new Submit();
                submit.setClassUser(user);
                submit.setMilestone(milestone);
                submits.add(submit);
        }
        submitRepository.saveAll(submits);
        return ResponseEntity.ok("Milestone added");
    }

    @Override
    public ResponseEntity<String> milestonEdit(MilestoneRequestDTO dto, Long id) {
        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        if (dto.getTitle() != null) {
            milestone.setTitle(dto.getTitle());
        }

        if (dto.getDescription() != null) {
            milestone.setDescription(dto.getDescription());
        }

        if (dto.getToDate() != null) {
            milestone.setToDate(LocalDate.parse(dto.getToDate()));
        }

        if (dto.getFromDate() != null) {
            milestone.setFromDate(LocalDate.parse(dto.getFromDate()));
        }

        milestoneRepository.save(milestone);
        return ResponseEntity.ok("milestone updated");
    }

    @Override
    public ResponseEntity<String> milestoneInProgess(Long id) {
        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        if (milestone.getStatus() == MilestoneStatusEnum.In_Progress) {
            milestone.setStatus(MilestoneStatusEnum.Open);

        } else {
            milestone.setStatus(MilestoneStatusEnum.In_Progress);
        }

        milestoneRepository.save(milestone);
        return ResponseEntity.ok("Milestone swich to " + milestone.getStatus().toString());
    }

    @Override
    public ResponseEntity<String> milestoneClosed(Long id) {
        Milestone milestone = milestoneRepository.findById(id)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

        if (milestone.getStatus() == MilestoneStatusEnum.Closed) {
            milestone.setStatus(MilestoneStatusEnum.Open);

        } else {
            milestone.setStatus(MilestoneStatusEnum.Closed);
        }

        milestoneRepository.save(milestone);
        return ResponseEntity.ok("Milestone swich to " + milestone.getStatus().toString());
    }

    public MilestoneResponseDTO toDTO(Milestone entity) {
        MilestoneResponseDTO responseDTO = new MilestoneResponseDTO();

        responseDTO.setMilestoneId(entity.getMilestoneId());
        Assignment assignment = entity.getAssignment();
        responseDTO.setAssignment(assignmentService.toDTO(assignment));
        // Group groups = groupRepository.findGroupByMilestone(entity.getMilestoneId());

        if (entity.getClasses() != null) {
            responseDTO.setClassesCode(entity.getClasses().getCode());
            responseDTO.setClassesSize(entity.getClasses().getClassUsers().size());
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

        List<MilestoneGroupDTO> groupResponseDTOs = new ArrayList<>();
        List<MilestoneMemberDTO> noGroupDTOs = new ArrayList<>();
        List<Group> groupOfMilestone = new ArrayList<>();
        List<Submit> submits = entity.getSubmits();

        if (!submits.isEmpty()) {
            for (Submit submit : submits) {
                if (submit.getGroup() == null) {
                    MilestoneMemberDTO noGroupDto = toMilestoneMemberDTO(submit.getClassUser().getUser());
                    noGroupDTOs.add(noGroupDto);
                }

                if (!groupOfMilestone.contains(submit.getGroup())) {
                    groupOfMilestone.add(submit.getGroup());
                }
            }
        }

        for (Group group : groupOfMilestone) {
            MilestoneGroupDTO milestoneGroupDTO = toMilestoneGroupDTO(group);
            if (milestoneGroupDTO != null) {
                groupResponseDTOs.add(milestoneGroupDTO);
            }
        }

        responseDTO.setNoGroup(noGroupDTOs);
        responseDTO.setGroups(groupResponseDTOs);
        return responseDTO;
    }

    public MilestoneGroupDTO toMilestoneGroupDTO(Group group) {

        if (group == null) {
            return null;
        }
        MilestoneGroupDTO groupDTO = new MilestoneGroupDTO();
        if (group.getGroupCode() != null) {
            groupDTO.setGroupCode(group.getGroupCode());
        }

        if (group.getTopicName() != null) {
            groupDTO.setTopicName(group.getTopicName());
        }
        groupDTO.setGroupId(group.getGroupId());

        List<GroupMember> groupMembers = group.getGroupMembers();
        List<MilestoneMemberDTO> memberDTOs = new ArrayList<>();
        if (!groupMembers.isEmpty()) {
            for (GroupMember groupMember : groupMembers) {
                MilestoneMemberDTO memberDTO = toMilestoneMemberDTO(groupMember.getMember());

                memberDTO.setActive(groupMember.getIsActive());
                memberDTO.setLeader(groupMember.getIsLeader());
                memberDTOs.add(memberDTO);
            }
        }

        groupDTO.setMemberList(memberDTOs);
        return groupDTO;
    }

    public MilestoneMemberDTO toMilestoneMemberDTO(User user) {
        MilestoneMemberDTO memberDTO = new MilestoneMemberDTO();
        if (user.getAccountName() != null) {
            memberDTO.setUserName(user.getAccountName());
        }

        if (user.getAvatar_url() != null) {
            memberDTO.setAvatarUrl(user.getAvatar_url());
        }

        if (user.getAccountName() != null) {
            memberDTO.setUserName(user.getAccountName());
        }

        if (user.getFullName() != null) {
            memberDTO.setFullName(user.getFullName());
        }

        memberDTO.setEmail(user.getEmail());
        return memberDTO;
    }

    public boolean isMilestoneOpen(Milestone milestone) {

        if (milestone.getStatus() == MilestoneStatusEnum.Closed
                || milestone.getStatus() == MilestoneStatusEnum.In_Progress) {
            return false;
        }
        return true;
    }

}
