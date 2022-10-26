package swp490.g23.onlinelearningsystem.entities.groupMember.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.response.GroupMemberResponseDTO;
import swp490.g23.onlinelearningsystem.entities.groupMember.repositories.GroupMemberRepositories;
import swp490.g23.onlinelearningsystem.entities.groupMember.service.IGroupMemberService;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class GroupMemberService implements IGroupMemberService {

    @Autowired
    private GroupMemberRepositories memberRepositories;
    
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private SubmitRepository submitRepository;

    @Override
    public ResponseEntity<String> removeMember(String userName ,String groupCode ,Long milestoneId) {

        GroupMember member= memberRepositories.getMember(userName, groupCode);
        if(member == null){
            throw new CustomException("member doesnt exist");
        }
        memberRepositories.delete(member);
        
        Submit submit = submitRepository.getMemberFromMilestone(milestoneId, groupCode, userName);
        submit.setGroup(null);
        submitRepository.save(submit);
        return ResponseEntity.ok("delete success");
    }

    @Override
    public ResponseEntity<String> setLeader(String userName, String groupCode) {
        Group group = groupRepository.findByGroupCode(groupCode);
        List<GroupMember> groupMembers = new ArrayList<>(); 
        for (GroupMember groupMember : group.getGroupMembers()) {
            if(groupMember.getIsLeader()){
                groupMember.setIsLeader(false);
            }

            if(groupMember.getMember().getAccountName().equals(userName)){
                groupMember.setIsLeader(true);
            }
            groupMembers.add(groupMember);
        }

        memberRepositories.saveAll(groupMembers);
        return ResponseEntity.ok("Leader assign to " + userName);
    }

    public GroupMemberResponseDTO toDTO(GroupMember entity) {
        GroupMemberResponseDTO dto = new GroupMemberResponseDTO();

        if (entity.getGroup() != null) {
            dto.setGroupCode(entity.getGroup().getGroupCode());
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
