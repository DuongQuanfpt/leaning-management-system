package swp490.g23.onlinelearningsystem.entities.contact.controller;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.contact.domain.filter.ContactCategoryFilter;
import swp490.g23.onlinelearningsystem.entities.contact.domain.request.ContactRequestDTO;
import swp490.g23.onlinelearningsystem.entities.contact.domain.response.ContactPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.contact.domain.response.ContactResponseDTO;
import swp490.g23.onlinelearningsystem.entities.contact.service.impl.ContactService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@CrossOrigin
@RequestMapping(Setting.API_PREFIX)
public class ContactController {

    @Autowired
    private ContactService contactService;

    @GetMapping(value = "/contact")
    public ResponseEntity<ContactPaginateDTO> getAllContact(
            @RequestParam(name = "page", required = false) String currentPage,
            @RequestParam(name = "limit", required = false) String requestLimit,
            @RequestParam(name = "q", required = false) String keyword,
            @RequestParam(name = "filterStatus", required = false) String statusFilter,
            @RequestParam(name = "filterSupporter", required = false) String suppFilter,
            @RequestParam(name = "filterCategory", required = false) String categoryFilter,
            @AuthenticationPrincipal User user) {

        int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
        int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);

        return contactService.getAllContact(keyword, limit, page, categoryFilter, statusFilter , suppFilter,user);
    }

    @GetMapping(value = "/contact-detail/{id}")
    public ResponseEntity<ContactResponseDTO> getContactDetail(@PathVariable("id") Long id) {

        return contactService.getContactDetail(id);
    }

    @GetMapping(value = "/contact-subjects")
    public ResponseEntity<List<ContactCategoryFilter>> getContactFilter() {

        return contactService.contactFilter();
    }

    @PostMapping(value = "/contact-add")
    public ResponseEntity<String> addContact(@RequestBody ContactRequestDTO requestDTO) {

        return contactService.addContact(requestDTO);
    }

    @PutMapping(value = "/contact-detail/{id}")
	public ResponseEntity<String> updateContact(@PathVariable("id") Long id, 
                                                @RequestBody ContactRequestDTO requestDTO,
                                                @AuthenticationPrincipal User user) {

		return contactService.editContactDetail(id , requestDTO,user);
	}

}
