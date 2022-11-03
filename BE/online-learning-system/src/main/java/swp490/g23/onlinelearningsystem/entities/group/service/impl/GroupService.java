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
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.ClassUserRepositories;
import swp490.g23.onlinelearningsystem.entities.class_user.service.impl.ClassUserService;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.domain.filter.GroupFilter;
import swp490.g23.onlinelearningsystem.entities.group.domain.request.GroupRequestDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.request.GroupSetWrapper;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupClassDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupClassMemberDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupMilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupResponseDTO;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.group.repositories.criteria.GroupCriteria;
import swp490.g23.onlinelearningsystem.entities.group.repositories.criteria_entity.GroupQuery;
import swp490.g23.onlinelearningsystem.entities.group.service.IGroupService;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.request.GroupMemberRequestDTO;
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
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;
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
    private ClassUserRepositories classUserRepositories;

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

        List<Group> groupOfMilestone = groupRepository.findGroupByMilestone(milestone.getMilestoneId());
        if (groupOfMilestone.isEmpty()) {
            throw new CustomException("There are no group in milestone " + milestone.getTitle());
        }

        removeGroupConfigInMilestone(milestone, groupOfMilestone);
        return ResponseEntity.ok("Group configuration of milestone " + milestone.getTitle() + " have been reset");
    }

    public void removeGroupConfigInMilestone(Milestone milestone, List<Group> groups) {
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
    public ResponseEntity<String> editGroup(Long id, GroupRequestDTO dto) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new CustomException("Group doesnt exist"));

        for (Submit submit : group.getSubmits()) {
            if (submit.getMilestone().getStatus() != MilestoneStatusEnum.Open) {
                throw new CustomException(
                        "Cant apply changes ,Some milestone of this group is in progress or have been close");
            }
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
    public ResponseEntity<GroupFilter> groupFilter(Long userId, String classCode) {
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

        List<Milestone> milestones = milestoneRepository.getByClassCode(classCode);
        List<GroupMilestoneDTO> groupMilestoneDTOs = new ArrayList<>();
        for (Milestone milestone : milestones) {
            // if (roles.contains("ROLE_TRAINER") || roles.contains("ROLE_SUPPORTER")) {
            // if (milestone.getClasses().getUserSupporter().equals(currentUser)
            // || (milestone.getClasses().getUserTrainer().equals(currentUser))) {
            // responseDTOs.add(milestoneService.toDTO(milestone));
            // }
            // }
            // else if (roles.contains("ROLE_TRAINEE")) {
            // for (ClassUser classUser : milestone.getClasses().getClassUsers()) {
            // if (classUser.getUser().equals(currentUser)) {
            // responseDTOs.add(milestoneService.toDTO(milestone));
            // }
            // }
            // }
            groupMilestoneDTOs.add(toMilestoneDTO(milestone));

        }

        filter.setMilstoneFilter(groupMilestoneDTOs);
        filter.setStatusFilter(statusFilter);
        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<String> groupCreate(Long milestoneId, GroupRequestDTO dto, String memberName) {
        // check condition
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

        ClassUser classUser = classUserRepositories.findByClassesAndUserName(memberName,
                milestone.getClasses().getCode());

        if (classUser == null) {
            throw new CustomException("trainee not found in this milestone");
        }

        User user = classUser.getUser();

        if (!milestoneService.isMilestoneOpen(milestone)) {
            throw new CustomException(
                    "Milestone of this group is in progress or have been closed , edit is not possible");
        }

        // check if trainee have group
        Group oldGroup = groupRepository.findGroupByMilestoneAndUser(milestone, user);
        List<Milestone> affectedMilestones = new ArrayList<>();

        if (oldGroup != null) {
            // check if old group allow edit
            for (Submit submit : oldGroup.getSubmits()) {
                if (submit.getMilestone().getStatus() != MilestoneStatusEnum.Open) {
                    throw new CustomException(
                            "Cant apply changes ,Some milestone of this group is in progress or have been close");
                }
            }

            // remove trainee from old group
            GroupMember oldMember = new GroupMember();
            for (GroupMember member : oldGroup.getGroupMembers()) {
                if (member.getMember().getAccountName().equals(memberName)) {
                    oldMember = member;
                    memberRepositories.removeMemberByGroup(user, oldGroup);
                    break;
                }
            }

            // set new leader for old group if trainee was a leader
            if (oldMember.getIsLeader() && oldGroup.getGroupMembers().size() >= 1) {
                GroupMember newLeader = oldGroup.getGroupMembers().get(0);
                newLeader.setIsLeader(true);
                memberRepositories.save(newLeader);
            }

            // milestones to apply changess
            affectedMilestones = milestoneRepository.milestoneOfGroup(oldGroup.getGroupId());
        }

        // Create a new group
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

        // Create group member detail
        GroupMember newMember = new GroupMember();
        newMember.setGroup(group);
        newMember.setMember(user);
        newMember.setIsActive(setMemberStatus(classUser.getStatus()));
        newMember.setIsLeader(true);
        memberRepositories.save(newMember);

        List<Submit> submits = new ArrayList<>();
        if (affectedMilestones.isEmpty()) {
            Submit submit = new Submit();
            submit.setGroup(group);
            submit.setMilestone(milestone);

            submits.add(submit);

            for (Submit memberSubmit : milestone.getSubmits()) {
                if (memberSubmit.getClassUser() != null
                        && memberSubmit.getClassUser().getUser().getAccountName().equals(memberName)) {
                    memberSubmit.setGroup(group);
                    submits.add(memberSubmit);
                }
            }
        } else {

            for (Milestone tempM : affectedMilestones) {
                Submit submit = new Submit();
                submit.setGroup(group);
                submit.setMilestone(tempM);
                submits.add(submit);

                for (Submit memberSubmit : tempM.getSubmits()) {
                    if (memberSubmit.getClassUser() != null
                            && memberSubmit.getClassUser().getUser().getAccountName().equals(memberName)) {
                        memberSubmit.setGroup(group);
                        submits.add(memberSubmit);
                    }
                }
            }
        }
        submitRepository.saveAll(submits);// save changes to db
        return ResponseEntity.ok("Group created");
    }

    @Override
    public ResponseEntity<String> groupDetach(Long groupid, Long milestoneId) {
        Group group = groupRepository.findById(groupid).orElseThrow(() -> new CustomException("Group doesnt exist"));

        // Milestone milestone = milestoneRepository.findById(milestoneId)
        // .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        // if (!milestoneService.isMilestoneOpen(milestone)) {
        // throw new CustomException(
        // "Milestone of this group is in progress or have been closed , edit is not
        // possible");
        // }

        for (Submit submit : group.getSubmits()) {
            if (submit.getMilestone().getStatus() != MilestoneStatusEnum.Open) {
                throw new CustomException(
                        "Cant apply changes ,Some milestone of this group is in progress or have been close");
            }
        }

        List<GroupMember> groupMembers = group.getGroupMembers();
        memberRepositories.deleteAll(groupMembers);

        List<Submit> submits = new ArrayList<>();
        for (Submit submit : group.getSubmits()) {
            if (submit.getClassUser() != null) {
                submit.setGroup(null);
                submits.add(submit);
            } else {
                submitRepository.delete(submit);
            }

        }
        groupRepository.delete(group);
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

    @Override
    public ResponseEntity<String> groupSet(Long milestoneId, GroupSetWrapper groupSetWrapper) {
        // check condition
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        if (!milestoneService.isMilestoneOpen(milestone)) {
            throw new CustomException(
                    "Milestone of this group is in progress or have been closed , edit is not possible");
        }

        // remove group if exist
        List<Group> groupOfMilestone = groupRepository.findGroupByMilestone(milestone.getMilestoneId());
        if (!groupOfMilestone.isEmpty()) {
            removeGroupConfigInMilestone(milestone, groupOfMilestone);
        }

        // handling request
        List<GroupRequestDTO> groupRequestDTOs = groupSetWrapper.getListGroup();
        List<Group> groups = new ArrayList<>();
        List<Submit> submits = new ArrayList<>();
        List<GroupMember> groupMembers = new ArrayList<>();

        for (GroupRequestDTO requestDTO : groupRequestDTOs) {
            // create a new group
            Group newGroup = new Group();

            newGroup.setGroupCode(requestDTO.getGroupCode());
            newGroup.setTopicName(requestDTO.getTopicName());
            newGroup.setDescription(requestDTO.getDescription());

            newGroup.setStatus(Status.Active);
            newGroup.setClasses(milestone.getClasses());
            groups.add(newGroup);

            // asign newGroup to milestone
            Submit groupSubmit = new Submit();
            groupSubmit.setGroup(newGroup);
            groupSubmit.setMilestone(milestone);
            submits.add(groupSubmit);

            if (!requestDTO.getMembers().isEmpty()) {
                for (GroupMemberRequestDTO memberRequestDTO : requestDTO.getMembers()) {

                    for (Submit milestoneSubmit : milestone.getSubmits()) {
                        ClassUser classUser = milestoneSubmit.getClassUser();
                        if (classUser.getUser().getAccountName().equals(memberRequestDTO.getMemberName())) {
                            // create group member detail
                            GroupMember groupMember = new GroupMember();

                            groupMember.setMember(classUser.getUser());
                            groupMember.setGroup(newGroup);
                            groupMember.setIsActive(setMemberStatus(classUser.getStatus()));

                            if (memberRequestDTO.getIsLeader().equals("true")) {
                                groupMember.setIsLeader(true);
                            } else {
                                groupMember.setIsLeader(false);
                            }
                            groupMembers.add(groupMember);
                            // asign trainee to newGroup
                            milestoneSubmit.setGroup(newGroup);
                            submits.add(milestoneSubmit);
                        }
                    }
                }
            }
        }

        groupRepository.saveAll(groups); // save groups to db
        memberRepositories.saveAll(groupMembers); // save group member detail to db
        submitRepository.saveAll(submits); // save group config to db

        return ResponseEntity.ok("Milestone group configuration overridden");
    }

    @Override
    public ResponseEntity<String> reuseGroupSet(Long milestoneId, Long reuseMilestoneId) {
        // check condition of milestone
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        if (!milestoneService.isMilestoneOpen(milestone)) {
            throw new CustomException(
                    "Milestone of this group is in progress or have been closed , edit is not possible");
        }

        Milestone reuseMilestone = milestoneRepository.findById(reuseMilestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        if (reuseMilestone.getStatus() == MilestoneStatusEnum.Open) {
            throw new CustomException(
                    "Cant apply group config of milestone " + reuseMilestone.getTitle()
                            + " because it is open for editting");
        }

        if (!milestone.getClasses().equals(reuseMilestone.getClasses())) {
            throw new CustomException("cant reuse group config of milestone in different class");
        }

        // remove group config of milestone if exist
        List<Group> groupOfMilestone = groupRepository.findGroupByMilestone(milestone.getMilestoneId());
        if (!groupOfMilestone.isEmpty()) {
            removeGroupConfigInMilestone(milestone, groupOfMilestone);
        }

        // assign milestone to group of reuseMilestone
        List<Submit> submits = new ArrayList<>();
        List<Group> groupOfReuseMilestone = groupRepository.findGroupByMilestone(reuseMilestone.getMilestoneId());
        for (Group group : groupOfReuseMilestone) {
            Submit submitGroup = new Submit();
            submitGroup.setGroup(group);
            submitGroup.setMilestone(milestone);

            submits.add(submitGroup);

            // assign group to trainee in milestone
            for (GroupMember member : group.getGroupMembers()) {
                for (Submit submitMilestone : milestone.getSubmits()) {
                    if (submitMilestone.getClassUser().getUser().equals(member.getMember())) {
                        submitMilestone.setGroup(group);
                        submits.add(submitMilestone);
                    }
                }
            }
        }

        submitRepository.saveAll(submits);
        return ResponseEntity.ok("group configuration of milestone " + reuseMilestone.getTitle()
                + " applied to milestone " + milestone.getTitle());
    }

    @Override
    public ResponseEntity<String> cloneGroupSet(Long milestoneId, Long cloneMilestoneId) {
        // check condition of milestone
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        if (!milestoneService.isMilestoneOpen(milestone)) {
            throw new CustomException(
                    "Milestone of this group is in progress or have been closed , edit is not possible");
        }

        Milestone milestoneToClone = milestoneRepository.findById(cloneMilestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        if (milestoneToClone.getStatus() == MilestoneStatusEnum.Open) {
            throw new CustomException(
                    "Cant apply group config of milestone " + milestoneToClone.getTitle()
                            + " because it is open for editting");
        }

        if (!milestone.getClasses().equals(milestoneToClone.getClasses())) {
            throw new CustomException("cant reuse group config of milestone in different class");
        }

        // remove group config of milestone if exist
        List<Group> groupOfMilestone = groupRepository.findGroupByMilestone(milestone.getMilestoneId());
        if (!groupOfMilestone.isEmpty()) {
            removeGroupConfigInMilestone(milestone, groupOfMilestone);
        }

        List<Group> groups = new ArrayList<>();
        List<GroupMember> members = new ArrayList<>();
        List<Submit> submits = new ArrayList<>();
        List<Group> groupOfCloneMilestone = groupRepository.findGroupByMilestone(milestoneToClone.getMilestoneId());

        for (Group group : groupOfCloneMilestone) {
            // create group
            Group newGroup = new Group();
            newGroup.setGroupCode(group.getGroupCode());
            newGroup.setTopicName(group.getTopicName());
            newGroup.setDescription(group.getDescription());
            newGroup.setStatus(group.getStatus());
            newGroup.setClasses(milestone.getClasses());

            groups.add(newGroup);

            // asign newGroup to milestone
            Submit groupSubmit = new Submit();
            groupSubmit.setGroup(newGroup);
            groupSubmit.setMilestone(milestone);
            submits.add(groupSubmit);

            for (GroupMember member : group.getGroupMembers()) {
                GroupMember newMember = new GroupMember();
                newMember.setMember(member.getMember());
                newMember.setGroup(newGroup);
                newMember.setIsActive(member.getIsActive());
                newMember.setIsLeader(member.getIsLeader());
                members.add(newMember);
                for (Submit milestoneSubmit : milestone.getSubmits()) {
                    if (milestoneSubmit.getClassUser().getUser().equals(member.getMember())) {
                        milestoneSubmit.setGroup(newGroup);
                        submits.add(milestoneSubmit);
                    }
                }

            }

        }

        groupRepository.saveAll(groups); // save groups to db
        memberRepositories.saveAll(members); // save group member detail to db
        submitRepository.saveAll(submits); // save group config to db

        return ResponseEntity.ok("group configuration of milestone " + milestoneToClone.getTitle()
                + " clone to milestone " + milestone.getTitle());
    }

    @Override
    public ResponseEntity<GroupClassDTO> groupSetFilter(Long milestoneId) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

        GroupClassDTO classDTO = new GroupClassDTO();
        Classes classes = milestone.getClasses();

        classDTO.setClassId(classes.getClassId());
        classDTO.setCode(classes.getCode());
        classDTO.setSubjectCode(classes.getSubject().getSubjectCode());

        List<GroupClassMemberDTO> classMemberDTOs = new ArrayList<>();
        for (ClassUser classUser : classes.getClassUsers()) {
                classMemberDTOs.add(toClassMemberDTO(classUser));
        }

        classDTO.setClassSize(classMemberDTOs.size());
        classDTO.setTraineeList(classMemberDTOs);
        return ResponseEntity.ok(classDTO);
    }

    @Override
    public ResponseEntity<List<MilestoneResponseDTO>> reuseGroupSetFilter(Long milestoneId) {
        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

        if (!milestoneService.isMilestoneOpen(milestone)) {
            throw new CustomException(
                    "Milestone of this group is in progress or have been closed , edit is not possible");
        }

        List<Milestone> milestoneCanReuses = milestoneRepository.getByClassCode(milestone.getClasses().getCode());
        List<MilestoneResponseDTO> dtos = new ArrayList<>();

        for (Milestone m : milestoneCanReuses) {
            if(m.getStatus() != MilestoneStatusEnum.Open){
                dtos.add(milestoneService.toDTO(m));
            }
        }

        return ResponseEntity.ok(dtos);
    }

    public GroupClassMemberDTO toClassMemberDTO(ClassUser classUser) {
        GroupClassMemberDTO dto = new GroupClassMemberDTO();
        if (classUser.getUser().getFullName() != null) {
            dto.setFullName(classUser.getUser().getFullName());
        }
        dto.setUserId(classUser.getUser().getUserId());
        dto.setEmail(classUser.getUser().getEmail());
        dto.setUsername(classUser.getUser().getAccountName());
        dto.setProfileUrl(classUser.getUser().getAvatar_url());

        return dto;
    }

    public GroupMilestoneDTO toMilestoneDTO(Milestone milestone) {
        GroupMilestoneDTO dto = new GroupMilestoneDTO();
        if (milestone.getTitle() != null) {
            dto.setTitle(milestone.getTitle());
        }

        dto.setTeamWork(milestone.getAssignment().isTeamWork());
        dto.setMilestoneId(milestone.getMilestoneId());
        dto.setStatus(milestone.getStatus().toString());
        dto.setClassesCode(milestone.getClasses().getCode());

        return dto;
    }

    public boolean setMemberStatus(TraineeStatus status) {
        if (status == TraineeStatus.Active) {
            return true;
        }
        return false;
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

        List<GroupMilestoneDTO> groupMilestoneDTOs = new ArrayList<>();
        boolean editTable = true;
        for (Submit submit : entity.getSubmits()) {
            boolean isAdd = true;
            for (GroupMilestoneDTO milestoneDTO : groupMilestoneDTOs) {
                if (milestoneDTO.getMilestoneId() == submit.getMilestone().getMilestoneId()) {
                    isAdd = false;
                    break;
                }
            }

            if (isAdd == true) {
                if (submit.getMilestone().getStatus() != MilestoneStatusEnum.Open) {
                    editTable = false;
                }
                groupMilestoneDTOs.add(toMilestoneDTO(submit.getMilestone()));
            }
        }
        dto.setLinkedMilestone(groupMilestoneDTOs);
        dto.setEditable(editTable);

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
