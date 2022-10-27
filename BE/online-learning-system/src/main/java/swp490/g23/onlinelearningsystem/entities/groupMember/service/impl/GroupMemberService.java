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
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum;

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
    public ResponseEntity<String> removeMember(String userName,Long groupId, Long milestoneId) {

        if (milestoneRepository.findById(milestoneId).get().getStatus() != MilestoneStatusEnum.Open) {
            throw new CustomException("Cant apply changes , Milestone of this group is in progress or have been close");
        }

        GroupMember member = memberRepositories.getMemberByGroup(userName, groupId);
        if (member == null) {
            throw new CustomException("member doesnt exist");
        }
        memberRepositories.delete(member);

        List<Submit> submits = submitRepository.getFromGroupAndUserName( groupId, userName);
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
        GroupMember groupMember = memberRepositories.getMemberByGroup(userName, groupId);
        if (groupMember == null) {
            throw new CustomException("member doesnt exist");
        }

        Group oldGroup = groupRepository.findById(groupId)
                .orElseThrow(() -> new CustomException("current group doesnt exist"));

        for (Submit submit : oldGroup.getSubmits()) {
            if (submit.getMilestone().getStatus() != MilestoneStatusEnum.Open) {
                throw new CustomException(
                        "Cant apply changes ,Some milestone of group " + oldGroup.getGroupCode()
                                + " is in progress or have been close");
            }
        }

        Group newGroup = groupRepository.findById(newGroupId)
                .orElseThrow(() -> new CustomException("new group doesnt exist"));

        for (Submit submit : newGroup.getSubmits()) {
            if (submit.getMilestone().getStatus() != MilestoneStatusEnum.Open) {
                throw new CustomException(
                        "Cant apply changes ,Some milestone of group " + newGroup.getGroupCode()
                                + " is in progress or have been close");
            }
        }

        if(groupMember.getGroup().getClasses().getClassId() != newGroup.getClasses().getClassId()){
            throw new CustomException("member not in class of new group");
        }

        memberRepositories.delete(groupMember);
        groupMember.setGroup(newGroup);
        memberRepositories.save(groupMember);

        List<Submit> oldSubmits = submitRepository.getFromGroupAndUserName(groupId, userName);
        submitRepository.deleteAll(oldSubmits);
        List<Milestone> milestones = new ArrayList<>();

        for (Submit submit : newGroup.getSubmits()) {
            if (!milestones.contains(submit.getMilestone())) {
                milestones.add(submit.getMilestone());
            }
        }

        ClassUser classUser = classUserRepositories.findByClassesAndUserName(userName, newGroup.getClasses().getCode());
        List<Submit> newSubmit = new ArrayList<>();
        for (Milestone milestone : milestones) {
            Submit submit = new Submit();
            submit.setClassUser(classUser);
            submit.setGroup(newGroup);
            submit.setMilestone(milestone);
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
    public ResponseEntity<String> memberAdd(String userName, Long groupId, Long milestoneId) {

        Milestone milestone = milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

        if (!milestoneService.isMilestoneOpen(milestone)) {
            throw new CustomException(
                    "Milestone of this group is in progress or have been closed , edit is not possible");
        }

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new CustomException("Group doesnt exist"));

        if (!group.getClasses().equals(milestone.getClasses())) {
            throw new CustomException("Group not in this milestone class");
        }

       

        ClassUser classUser = classUserRepositories.findByClassesAndUserName(userName,
                milestone.getClasses().getCode());
        List<Submit> submits = submitRepository.findByClassUserAndGroupIsNull(classUser);

        if(submits.isEmpty()){
            throw new CustomException(userName + " already have group");
        }

        List<Submit> submitNew = new ArrayList<>();
        for (Submit submit : submits) {
            submit.setGroup(group);
            submitNew.add(submit);
        }
        submitRepository.saveAll(submitNew);

        GroupMember member = new GroupMember();
        member.setMember(classUser.getUser());
        member.setGroup(group);
        member.setIsLeader(false);
        member.setIsActive(true);
        memberRepositories.save(member);

        return ResponseEntity.ok(userName + " moved to group " + group.getGroupCode());
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
