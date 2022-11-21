package swp490.g23.onlinelearningsystem.entities.work_update.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.request.WorkUpdateRequestDTo;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.response.WorkUpdateWorkDTO;
import swp490.g23.onlinelearningsystem.entities.work_update.service.impl.WorkUpdateService;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class WorkUpdateController {

    @Autowired
    private WorkUpdateService  workUpdateService;

    @GetMapping(value = "/work-update/{submitId}/{workId}")
    public ResponseEntity<WorkUpdateWorkDTO> getWorkUpdate(@PathVariable("submitId") Long submitId,
            @PathVariable("workId") Long workId,  
            @AuthenticationPrincipal User user) {
        return workUpdateService.getWorkUpdate(submitId, workId, user);
    }

    @PostMapping(value = "/work-update/{submitId}/{workId}")
    public ResponseEntity<String> addWorkUpdate(@PathVariable("submitId") Long submitId, 
            @PathVariable("workId") Long workId,
            @RequestBody WorkUpdateRequestDTo requestDTo,   
            @AuthenticationPrincipal User user) {
        return workUpdateService.addWorkUpdate(submitId, workId, user, requestDTo);
    }

    @PutMapping(value = "/work-update/{updateId}")
    public ResponseEntity<String> editWorkUpdate(
            @PathVariable("updateId") Long updateId,
            @RequestBody WorkUpdateRequestDTo requestDTo,   
            @AuthenticationPrincipal User user) {
        return workUpdateService.editWorkUpdate(updateId, user, requestDTo);
    }
}
