package swp490.g23.onlinelearningsystem.entities.contact.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.contact.domain.filter.ContactFilter;
import swp490.g23.onlinelearningsystem.entities.contact.domain.request.ContactRequestDTO;
import swp490.g23.onlinelearningsystem.entities.contact.domain.response.ContactPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.contact.domain.response.ContactResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface IContactService {
    ResponseEntity<ContactPaginateDTO> getAllContact(String q , int limit ,int page , String filterCategory , String filterStatus);

    ResponseEntity<ContactResponseDTO> getContactDetail(Long id);

    ResponseEntity<String> editContactDetail(Long id , ContactRequestDTO dto , User supp);

    ResponseEntity<String> addContact( ContactRequestDTO requestDTOs);

    ResponseEntity< List<ContactFilter>> contactFilter();
}

