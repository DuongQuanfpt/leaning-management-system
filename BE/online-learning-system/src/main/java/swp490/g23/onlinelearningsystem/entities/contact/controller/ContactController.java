package swp490.g23.onlinelearningsystem.entities.contact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.contact.domain.filter.ContactFilter;
import swp490.g23.onlinelearningsystem.entities.contact.domain.request.ContactRequestDTO;
import swp490.g23.onlinelearningsystem.entities.contact.domain.response.ContactResponseDTO;
import swp490.g23.onlinelearningsystem.entities.contact.service.impl.ContactService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

@RestController
@CrossOrigin
@RequestMapping(Setting.API_PREFIX)
public class ContactController {
    
    @Autowired
    private ContactService contactService;

    @GetMapping(value = "/contact")
    public ResponseEntity<List<ContactResponseDTO>> getAllContact() {

        return contactService.getAllContact();
    }

    @GetMapping(value = "/contact-detail/{id}")
    public ResponseEntity<ContactResponseDTO> getContactDetail(@PathVariable("id") Long id) {

        return contactService.getContactDetail(id);
    }

    @GetMapping(value = "/contact-subjects")
    public ResponseEntity<List<ContactFilter>> getContactFilter() {

        return contactService.contactFilter();
    }

    @PostMapping(value = "/contact-add")
    public ResponseEntity<String> addContact(@RequestBody ContactRequestDTO requestDTO) {

        return contactService.addContact(requestDTO);
    }
}
