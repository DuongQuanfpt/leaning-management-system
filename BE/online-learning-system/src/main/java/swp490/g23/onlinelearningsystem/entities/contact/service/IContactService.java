package swp490.g23.onlinelearningsystem.entities.contact.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.contact.domain.filter.ContactFilter;
import swp490.g23.onlinelearningsystem.entities.contact.domain.request.ContactRequestDTO;
import swp490.g23.onlinelearningsystem.entities.contact.domain.response.ContactResponseDTO;

public interface IContactService {
    ResponseEntity<List<ContactResponseDTO>> getAllContact();

    ResponseEntity<ContactResponseDTO> getContactDetail(Long id);

    ResponseEntity<String> editContactDetail(Long id);

    ResponseEntity<String> addContact( ContactRequestDTO requestDTOs);

    ResponseEntity< List<ContactFilter>> contactFilter();
}

