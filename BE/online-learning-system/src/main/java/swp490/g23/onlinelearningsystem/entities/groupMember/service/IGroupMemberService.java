package swp490.g23.onlinelearningsystem.entities.groupMember.service;

import org.springframework.http.ResponseEntity;

public interface IGroupMemberService {
    ResponseEntity<String> removeMember(String userName ,String groupCode ,Long milestoneId);
    ResponseEntity<String> setLeader(String userName ,String groupCode);
}
