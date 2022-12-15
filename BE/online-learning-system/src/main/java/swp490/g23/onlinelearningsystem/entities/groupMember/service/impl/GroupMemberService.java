package swp490.g23.onlinelearningsystem.entities.groupMember.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.ClassUserRepositories;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.response.GroupMemberResponseDTO;
import swp490.g23.onlinelearningsystem.entities.groupMember.repositories.GroupMemberRepositories;
import swp490.g23.onlinelearningsystem.entities.groupMember.service.IGroupMemberService;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.service.impl.MilestoneService;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.enums.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.enums.TraineeStatus;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class GroupMemberService implements IGroupMemberService {

    @Autowired
    private GroupMemberRepositories memberRepositories;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private SubmitRepository submitRepository;

    @Autowired
    private ClassUserRepositories classUserRepositories;

    @Autowired
    private MilestoneService milestoneService;

    @Override
    public ResponseEntity<String> removeMember(String userName, Long groupId, Long milestoneId) {

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new CustomException("group doesnt exist"));

        List<Milestone> milestoneOfGroup = milestoneRepository.milestoneOfGroup(groupId);
        for (Milestone milestone : milestoneOfGroup) {
            if (!milestoneService.isMilestoneOpen(milestone)) {
                throw new CustomException(
                        "Cant apply changes ,Some milestone of this group is in progress or have been close");
            }

            if (!group.getClasses().equals(milestone.getClasses())) {
                throw new CustomException("Group not in this milestone class");
            }
        }

        GroupMember member = memberRepositories.getMemberByGroup(userName, groupId);
        if (member == null) {
            throw new CustomException("member doesnt exist");
        }
        memberRepositories.delete(member);

        if (member.getIsLeader() == true && !group.getGroupMembers().isEmpty()) {
            GroupMember newLeader = new GroupMember();
            for (int i = 0; i < group.getGroupMembers().size(); i++) {
                if (!member.equals(group.getGroupMembers().get(i))) {
                    newLeader = group.getGroupMembers().get(i);
                    newLeader.setIsLeader(true);
                    memberRepositories.save(newLeader);
                    break;
                }
            }
        }

        List<Submit> submits = submitRepository.getFromGroupAndUserName(groupId, userName);
        List<Submit> submitNews = new ArrayList<>();
        for (Submit submit : submits) {
            submit.setGroup(null);
            submitNews.add(submit);
        }

        submitRepository.saveAll(submitNews);
        return ResponseEntity.ok("delete success");
    }

    @Override
    public ResponseEntity<String> groupChange(String userName, Long groupId, Long newGroupId) {
        Group oldGroup = groupRepository.findById(groupId)
                .orElseThrow(() -> new CustomException("current group doesnt exist"));

        for (Submit submit : oldGroup.getSubmits()) {
            if (submit.getMilestone().getStatus() != MilestoneStatusEnum.Open) {
                throw new CustomException(
                        "Cant apply changes ,Some milestone of this group is in progress or have been close");
            }
        }

        Group newGroup = groupRepository.findById(newGroupId)
                .orElseThrow(() -> new CustomException("new group doesnt exist"));

        for (Submit submit : newGroup.getSubmits()) {
            if (submit.getMilestone().getStatus() != MilestoneStatusEnum.Open) {
                throw new CustomException(
                        "Cant apply changes ,Some milestone of this group is in progress or have been close");
            }
        }

        if (oldGroup.getClasses().getClassId() != newGroup.getClasses().getClassId()) {
            throw new CustomException("Cant move member to group of other classes");
        }

        ClassUser classUser = classUserRepositories.findByClassesAndUserName(userName, oldGroup.getClasses().getCode());
        if (classUser == null) {
            throw new CustomException("Trainee not found in this class");
        }

        for (GroupMember oldMember : oldGroup.getGroupMembers()) {
            if (oldMember.getMember().equals(classUser.getUser())) {
                memberRepositories.removeMemberByGroup(oldMember.getMember(), oldMember.getGroup());

                if (oldMember.getIsLeader() && !oldGroup.getGroupMembers().isEmpty()) {
                    GroupMember newLeader = new GroupMember();
                    for (int i = 0; i < oldGroup.getGroupMembers().size(); i++) {
                        if (!oldMember.equals(oldGroup.getGroupMembers().get(i))) {
                            newLeader = oldGroup.getGroupMembers().get(i);
                            newLeader.setIsLeader(true);
                            memberRepositories.save(newLeader);
                            break;
                        }
                    }
                }
                break;
            }
        }

        GroupMember groupMember = new GroupMember();
        groupMember.setMember(classUser.getUser());
        groupMember.setGroup(newGroup);
        groupMember.setIsLeader(true);
        groupMember.setIsActive(setMemberStatus(classUser.getStatus()));

        for (GroupMember member : newGroup.getGroupMembers()) {
            if (member.getIsLeader() == true) {
                groupMember.setIsLeader(false);
                break;
            }
        }

        memberRepositories.save(groupMember);

        List<Submit> oldSubmits = submitRepository.getFromGroupAndUserName(groupId, userName);
        submitRepository.deleteAll(oldSubmits);
        List<Milestone> milestones = new ArrayList<>();

        for (Submit submit : newGroup.getSubmits()) {
            if (!milestones.contains(submit.getMilestone())) {
                milestones.add(submit.getMilestone());
            }
        }

        List<Submit> newSubmit = new ArrayList<>();
        for (Milestone milestone : milestones) {
            Submit submit = new Submit();
            submit.setClassUser(classUser);
            submit.setGroup(newGroup);
            submit.setMilestone(milestone);
            submit.setStatus(SubmitStatusEnum.Pending);
            newSubmit.add(submit);
        }

        submitRepository.saveAll(newSubmit);
        return ResponseEntity.ok(userName + " assigned to group " + newGroup.getGroupCode());
    }

    @Override
    public ResponseEntity<String> setLeader(String userName, Long groupId) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        GroupMember member = memberRepositories.getMemberByGroup(userName, groupId);
        if (!group.getGroupMembers().contains(member)) {
            throw new CustomException(userName + " not in group " + group.getGroupCode());
        }
        List<GroupMember> groupMembers = new ArrayList<>();
        for (GroupMember groupMember : group.getGroupMembers()) {
            if (groupMember.getIsLeader()) {
                groupMember.setIsLeader(false);
            }

            if (groupMember.getMember().getAccountName().equals(userName)) {
                groupMember.setIsLeader(true);
            }
            groupMembers.add(groupMember);
        }

        memberRepositories.saveAll(groupMembers);
        return ResponseEntity.ok("Leader assign to " + userName);
    }

    @Override
    public ResponseEntity<String> memberAdd(String userName, Long groupId) {

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new CustomException("Group doesnt exist"));

        List<Milestone> milestoneOfGroup = milestoneRepository.milestoneOfGroup(groupId);
        for (Milestone milestone : milestoneOfGroup) {
            if (!milestoneService.isMilestoneOpen(milestone)) {
                throw new CustomException(
                        "Cant apply changes ,Some milestone of this group is in progress or have been close");
            }

            if (!group.getClasses().equals(milestone.getClasses())) {
                throw new CustomException("Group not in this milestone class");
            }
        }

        ClassUser classUser = classUserRepositories.findByClassesAndUserName(userName,
                group.getClasses().getCode());

        List<Submit> submitNew = new ArrayList<>();
        List<Submit> submits = submitRepository.getByClassUserInMilestones(milestoneOfGroup, classUser);

        if (submits.isEmpty()) {
            throw new CustomException(userName + " already have group or not in this class");
        }
        for (Submit submit : submits) {
            for (Milestone groupMilestone : milestoneOfGroup) {
                if (submit.getMilestone().equals(groupMilestone)) {
                    submit.setGroup(group);
                    submitNew.add(submit);
                }
            }

        }
        submitRepository.saveAll(submitNew);

        GroupMember member = new GroupMember();
        member.setMember(classUser.getUser());
        member.setGroup(group);
        member.setIsLeader(true);
        for (GroupMember groupMember : group.getGroupMembers()) {
            if (groupMember.getIsLeader() == true) {
                member.setIsLeader(false);
            }
        }
        member.setIsActive(setMemberStatus(classUser.getStatus()));
        memberRepositories.save(member);

        return ResponseEntity.ok(userName + " moved to group " + group.getGroupCode());
    }

    @Override
    public ResponseEntity<String> changeMemberStatus(String userName, Long groupId) {
        GroupMember groupMember = memberRepositories.getMemberByGroup(userName, groupId);
        if (groupMember == null) {
            throw new CustomException("Member not in this group ");
        }

        if (groupMember.getIsActive()) {
            groupMember.setIsActive(false);
        } else {
            groupMember.setIsActive(true);
        }
        memberRepositories.save(groupMember);
        return ResponseEntity.ok("Member status changed");
    }

    public boolean setMemberStatus(TraineeStatus status) {
        if (status == TraineeStatus.Active) {
            return true;
        }
        return false;
    }

    public GroupMemberResponseDTO toDTO(GroupMember entity) {
        GroupMemberResponseDTO dto = new GroupMemberResponseDTO();

        if (entity.getGroup() != null) {
            dto.setGroupCode(entity.getGroup().getGroupCode());
            dto.setGroupId(entity.getGroup().getGroupId());
        }

        if (entity.getIsLeader() != null) {
            dto.setIsLeader(entity.getIsLeader());
        }

        if (entity.getIsActive() != null) {
            dto.setIsActive(entity.getIsActive());
        }

        return dto;
    }

}
