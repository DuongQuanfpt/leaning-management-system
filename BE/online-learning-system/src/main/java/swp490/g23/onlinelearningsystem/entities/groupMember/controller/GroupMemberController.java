package swp490.g23.onlinelearningsystem.entities.groupMember.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @DeleteMapping(value = "/group-member-remove/{userName}/{groupCode}/{milestoneId}")
    public ResponseEntity<String> getGroup(@PathVariable("userName") String userName,
            @PathVariable("groupCode") String groupCode,
            @PathVariable("milestoneId") Long milestoneId) {

        return groupMemberService.removeMember(userName,groupCode,milestoneId);
    }

    @PutMapping(value = "/group-set-leader/{userName}/{groupCode}")
    public ResponseEntity<String> setLeader(@PathVariable("userName") String userName,
            @PathVariable("groupCode") String groupCode) {

        return groupMemberService.setLeader(userName,groupCode);
    }
}
