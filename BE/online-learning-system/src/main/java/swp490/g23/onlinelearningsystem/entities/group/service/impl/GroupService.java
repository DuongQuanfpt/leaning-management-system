package swp490.g23.onlinelearningsystem.entities.group.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.service.impl.ClassUserService;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.domain.filter.GroupFilter;
import swp490.g23.onlinelearningsystem.entities.group.domain.request.GroupRequestDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupResponseDTO;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.group.repositories.criteria.GroupCriteria;
import swp490.g23.onlinelearningsystem.entities.group.repositories.criteria_entity.GroupQuery;
import swp490.g23.onlinelearningsystem.entities.group.service.IGroupService;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.response.GroupMemberResponseDTO;
import swp490.g23.onlinelearningsystem.entities.groupMember.repositories.GroupMemberRepositories;
import swp490.g23.onlinelearningsystem.entities.groupMember.service.impl.GroupMemberService;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.service.impl.MilestoneService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.MemberStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.MemberStatusEntity;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Service
public class GroupService implements IGroupService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupCriteria groupCriteria;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private GroupMemberRepositories memberRepositories;

    @Autowired
    private GroupMemberService memberService;

    @Autowired
    private SubmitRepository submitRepository;

    @Autowired
    private MilestoneService milestoneService;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private ClassUserService classUserService;

    @Override
    public ResponseEntity<GroupPaginateDTO> getGroup(int limit, int page, String keyword, String filterActive,
            String filterMilestone, User user) {
        User currentUser = userRepository.findById(user.getUserId()).get();

        GroupQuery result = groupCriteria.searchFilterGroup(keyword, filterMilestone, currentUser);
        TypedQuery<Group> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        List<Group> groupsFilter = queryResult.getResultList();
        List<MilestoneResponseDTO> milestoneFilter = new ArrayList<>();
        for (Group group : groupsFilter) {
            for (Submit submit : group.getSubmits()) {
                boolean isAdd = true;
                for (MilestoneResponseDTO dto : milestoneFilter) {

                    if (dto.getMilestoneId() == submit.getMilestone().getMilestoneId()) {
                        isAdd = false;
                        break;
                    }
                }

                if (isAdd == true) {
                    milestoneFilter.add(milestoneService.toDTO(submit.getMilestone()));
                }
            }

        }

        List<StatusEntity> statusFilter = new ArrayList<>();
        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statusFilter.add(new StatusEntity(status));
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

        Long milestoneId = (filterMilestone == null) ? null : Long.parseLong(filterMilestone);
        List<GroupResponseDTO> responseDTOs = new ArrayList<>();
        for (Group group : queryResult.getResultList()) {
            responseDTOs.add(toDTO(group, milestoneId, filterActive));
        }

        List<TraineeResponseDTO> noGroupMembers = new ArrayList<>();
        if (filterMilestone != null) {
            List<Submit> submits = submitRepository.getNoGroupMember(Long.parseLong(filterMilestone));
            for (Submit submit : submits) {
                noGroupMembers.add(classUserService.toTraineeDTO(submit.getClassUser()));
            }

        }

        GroupPaginateDTO paginateDTO = new GroupPaginateDTO();
        paginateDTO.setPage(page);
        paginateDTO.setTotalItem(totalItem);
        paginateDTO.setTotalPage(totalPage);
        paginateDTO.setListResult(responseDTOs);
        paginateDTO.setNoGroup(noGroupMembers);
        paginateDTO.setStatusFilter(statusFilter);
        paginateDTO.setMilstoneFilter(milestoneFilter);
        return ResponseEntity.ok(paginateDTO);
    }

    @Override
    public ResponseEntity<GroupResponseDTO> groupDetail(Long id) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new CustomException("Group doesnt exist"));

        return ResponseEntity.ok(toDTO(group, null, null));
    }

    @Override
    public ResponseEntity<String> groupRemoveAll(Long milestoneId) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

        if (!milestoneService.isMilestoneOpen(milestone)) {
            throw new CustomException(
                    "Milestone of this group is in progress or have been closed , edit is not possible");
        }

        List<Group> groups = groupRepository.findGroupByMilestone(milestoneId);

        for (Group group : groups) {
            List<Submit> submits = group.getSubmits();
            List<Submit> submitNew = new ArrayList<>();
            for (Submit submit : submits) {
                if (submit.getMilestone().getMilestoneId() == milestoneId) {
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
            groupRepository.delete(group);

        }

        return ResponseEntity.ok("Group configuration of milestone " + milestone.getTitle() + " have been reset");
    }

    @Override
    public ResponseEntity<String> editGroup(Long id, Long milestoneId, GroupRequestDTO dto) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new CustomException("Group doesnt exist"));
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        if (milestone.getStatus() == MilestoneStatusEnum.Closed
                || milestone.getStatus() == MilestoneStatusEnum.In_Progress) {
            throw new CustomException(
                    "Milestone of this group is in progress or have been closed , edit is not possible");
        }

        if (dto.getGroupCode() != null) {
            group.setGroupCode(dto.getGroupCode());
        }

        if (dto.getStatus() != null) {
            group.setStatus(Status.getFromValue(Integer.parseInt(dto.getStatus())).get());
        }

        if (dto.getDescription() != null) {
            group.setDescription(dto.getDescription());
        }

        if (dto.getTopicName() != null) {
            group.setTopicName(dto.getTopicName());
        }

        groupRepository.save(group);
        return ResponseEntity.ok("Group updated");
    }

    @Override
    public ResponseEntity<GroupFilter> groupFilter(Long userId) {
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User doesnt exist"));

        List<Setting> settings = currentUser.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }

        GroupFilter filter = new GroupFilter();

        List<MemberStatusEntity> statusFilter = new ArrayList<>();
        for (MemberStatusEnum status : new ArrayList<MemberStatusEnum>(EnumSet.allOf(MemberStatusEnum.class))) {
            statusFilter.add(new MemberStatusEntity(status));
        }

        List<Milestone> milestones = milestoneRepository.getActiveMilestone();
        List<MilestoneResponseDTO> responseDTOs = new ArrayList<>();
        for (Milestone milestone : milestones) {
            if (roles.contains("ROLE_TRAINER") || roles.contains("ROLE_SUPPORTER")) {
                if (milestone.getClasses().getUserSupporter().equals(currentUser)
                        || (milestone.getClasses().getUserTrainer().equals(currentUser))) {
                    responseDTOs.add(milestoneService.toDTO(milestone));
                }
            } 
            else if (roles.contains("ROLE_TRAINEE")) {
                for (ClassUser classUser : milestone.getClasses().getClassUsers()) {
                    if (classUser.getUser().equals(currentUser)) {
                        responseDTOs.add(milestoneService.toDTO(milestone));
                    }
                }
            }
            
        }

        filter.setMilstoneFilter(responseDTOs);
        filter.setStatusFilter(statusFilter);
        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<String> groupCreate(Long milestoneId, GroupRequestDTO dto) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

        if (!milestoneService.isMilestoneOpen(milestone)) {
            throw new CustomException(
                    "Milestone of this group is in progress or have been closed , edit is not possible");
        }
        Group group = new Group();
        if (dto.getGroupCode() != null) {
            group.setGroupCode(dto.getGroupCode());
        }

        if (dto.getTopicName() != null) {
            group.setTopicName(dto.getTopicName());
        }

        if (dto.getDescription() != null) {
            group.setDescription(dto.getGroupCode());
        }

        group.setStatus(Status.Active);
        group.setClasses(milestone.getClasses());

        groupRepository.save(group);

        List<Group> groups = groupRepository.findGroupByMilestone(milestoneId);
        if (groups.isEmpty()) {
            Submit submit = new Submit();
            submit.setGroup(group);
            submit.setMilestone(milestone);

            submitRepository.save(submit);
        } else {
            List<Milestone> affectedMilestones = milestoneRepository
                    .milestoneOfGroup(groups.get(0).getGroupId());

            for (Milestone tempM : affectedMilestones) {
                Submit submit = new Submit();
                submit.setGroup(group);
                submit.setMilestone(tempM);

                submitRepository.save(submit);
            }
        }

        return ResponseEntity.ok("Group created");
    }

    @Override
    public ResponseEntity<String> groupDetach(Long groupid, Long milestoneId) {
        Group group = groupRepository.findById(groupid).orElseThrow(() -> new CustomException("Group doesnt exist"));

        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        if (!milestoneService.isMilestoneOpen(milestone)) {
            throw new CustomException(
                    "Milestone of this group is in progress or have been closed , edit is not possible");
        }

        List<Submit> submits = new ArrayList<>();
        for (Submit submit : group.getSubmits()) {
            if (submit.getClassUser() != null && submit.getMilestone().getMilestoneId() == milestoneId) {
                submit.setGroup(null);
            }
            submits.add(submit);
        }

        submitRepository.saveAll(submits);
        return ResponseEntity.ok("Group " + group.getGroupCode() + " remove from current milestone");
    }

    @Override
    public ResponseEntity<String> groupStatus(Long groupId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new CustomException("Group doesnt exist"));
        if (group.getStatus() == Status.Active) {
            group.setStatus(Status.Inactive);
        } else {
            group.setStatus(Status.Active);
        }
        groupRepository.save(group);
        return ResponseEntity.ok("Group status changed");
    }

    public GroupResponseDTO toDTO(Group entity, Long milestoneId, String filterActive) {
        GroupResponseDTO dto = new GroupResponseDTO();

        dto.setGroupId(entity.getGroupId());
        if (entity.getDescription() != null) {
            dto.setDescription(entity.getDescription());
        }

        if (entity.getGroupCode() != null) {
            dto.setGroupCode(entity.getGroupCode());
        }

        if (entity.getStatus() != null) {
            dto.setStatus(entity.getStatus().toString());
        }

        if (entity.getTopicName() != null) {
            dto.setTopicName(entity.getTopicName());
        }

        if (entity.getClasses() != null) {
            dto.setClassCode(entity.getClasses().getCode());
        }

        // List<MilestoneResponseDTO> milestoneResponseDTOs = new ArrayList<>();
        // if (entity.getSubmits() != null) {
        //     for (Submit submit : entity.getSubmits()) {
        //         boolean canAdd = true;
        //         for (MilestoneResponseDTO responseDTO : milestoneResponseDTOs) {
        //             if (responseDTO.getMilestoneId() == submit.getMilestone().getMilestoneId()) {
        //                 canAdd = false;
        //                 break;
        //             }
        //         }

        //         if (canAdd == true) {
        //             milestoneResponseDTOs.add(milestoneService.toDTO(submit.getMilestone()));
        //         }
        //     }
        //     dto.setMilestone(milestoneResponseDTOs);
        // }

        List<GroupMemberResponseDTO> memberResponseDTOs = new ArrayList<>();
        if (milestoneId != null) {
            if (!entity.getSubmits().isEmpty()) {

                for (Submit submit : entity.getSubmits()) {

                    if (submit.getClassUser() != null && submit.getMilestone().getMilestoneId() == milestoneId) {

                        GroupMemberResponseDTO groupResponseDTO = new GroupMemberResponseDTO();
                        for (GroupMember member : entity.getGroupMembers()) {
                            if (member.getMember().getAccountName()
                                    .equals(submit.getClassUser().getUser().getAccountName())) {
                                groupResponseDTO = memberService.toDTO(member);
                            }

                        }

                        if (filterActive == null) {
                            groupResponseDTO.setMemberInfo(classUserService.toTraineeDTO(submit.getClassUser()));
                            memberResponseDTOs.add(groupResponseDTO);
                        } else {
                            if (groupResponseDTO.getIsActive().toString().equals(filterActive)) {
                                groupResponseDTO.setMemberInfo(classUserService.toTraineeDTO(submit.getClassUser()));
                                memberResponseDTOs.add(groupResponseDTO);
                            }
                        }

                    }

                }

                dto.setGroupMembers(memberResponseDTOs);
            }
        } else {
            if (!entity.getGroupMembers().isEmpty()) {
                GroupMemberResponseDTO groupResponseDTO = new GroupMemberResponseDTO();
                for (GroupMember groupMember : entity.getGroupMembers()) {
                    groupResponseDTO = memberService.toDTO(groupMember);
                    for (ClassUser user : groupMember.getMember().getClassUsers()) {
                        if (user.getClasses().getClassId() == entity.getClasses().getClassId()) {
                            groupResponseDTO.setMemberInfo(classUserService.toTraineeDTO(user));
                            break;
                        }
                    }
                    memberResponseDTOs.add(groupResponseDTO);
                }

                dto.setGroupMembers(memberResponseDTOs);
            }

        }

        return dto;
    }

}
