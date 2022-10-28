package swp490.g23.onlinelearningsystem.entities.groupMember.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.groupMember.service.impl.GroupMemberService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class GroupMemberController {

    @Autowired
    private GroupMemberService groupMemberService;

    @DeleteMapping(value = "/group-member-remove/{userName}/{groupId}/{milestoneId}")
    public ResponseEntity<String> removeMember(@PathVariable("userName") String userName,
            @PathVariable("groupId") Long groupId,
            @PathVariable("milestoneId") Long milestoneId) {

        return groupMemberService.removeMember(userName, groupId, milestoneId);
    }

    @PostMapping(value = "/group-member-add/{userName}/{groupId}/{milestoneId}")
    public ResponseEntity<String> addMember(@PathVariable("userName") String userName,
            @PathVariable("groupId") Long groupId,
            @PathVariable("milestoneId") Long milestoneId) {

        return groupMemberService.memberAdd(userName, groupId, milestoneId);
    }

    @PutMapping(value = "/group-set-leader/{userName}/{groupId}")
    public ResponseEntity<String> setLeader(@PathVariable("userName") String userName,
            @PathVariable("groupId") Long groupId) {

        return groupMemberService.setLeader(userName, groupId);
    }

    @PutMapping(value = "/group-change/{userName}/{groupId}/{newGroupId}")
    public ResponseEntity<String> changeGroup(@PathVariable("userName") String userName,
            @PathVariable("groupId") Long groupId,
            @PathVariable("newGroupId") Long newGroupId) {

        return groupMemberService.groupChange(userName, groupId, newGroupId);
    }
}
