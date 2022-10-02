package swp490.g23.onlinelearningsystem.entities.subject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.subject.service.impl.SubjectService;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class SubjectController {

    @Autowired SubjectService service ; 

    @GetMapping(value = "/subjects")
	public ResponseEntity<?> getSetting(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);

		return ResponseEntity.ok(service.getSubject(limit, page));
	}

}
