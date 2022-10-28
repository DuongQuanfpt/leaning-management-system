package swp490.g23.onlinelearningsystem.entities.groupMember.service;

import org.springframework.http.ResponseEntity;

public interface IGroupMemberService {
    ResponseEntity<String> removeMember(String userName ,Long groupId ,Long milestoneId);
    ResponseEntity<String> setLeader(String userName ,Long groupId);
    ResponseEntity<String> groupChange(String userName ,Long groupId ,Long newGroupId);
    ResponseEntity<String> memberAdd(String userName ,Long groupId ,Long milestoneId);
    
}
