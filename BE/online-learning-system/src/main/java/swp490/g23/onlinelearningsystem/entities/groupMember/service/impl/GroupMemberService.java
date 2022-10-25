package swp490.g23.onlinelearningsystem.entities.groupMember.service.impl;

import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.response.GroupMemberResponseDTO;
import swp490.g23.onlinelearningsystem.entities.groupMember.service.IGroupMemberService;

@Service
public class GroupMemberService implements IGroupMemberService {

    public GroupMemberResponseDTO toDTO(GroupMember entity) {
        GroupMemberResponseDTO dto = new GroupMemberResponseDTO();

        if (entity.getGroup() != null) {
            dto.setGroupCode(entity.getGroup().getGroupCode());
        }

        if (entity.getMember() != null) {
            dto.setMember(entity.getMember().getAccountName());
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
