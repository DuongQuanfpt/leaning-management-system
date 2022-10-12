package swp490.g23.onlinelearningsystem.entities.contact.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.contact.domain.WebContact;
import swp490.g23.onlinelearningsystem.entities.contact.domain.filter.ContactFilter;
import swp490.g23.onlinelearningsystem.entities.contact.domain.request.ContactRequestDTO;
import swp490.g23.onlinelearningsystem.entities.contact.domain.response.ContactResponseDTO;
import swp490.g23.onlinelearningsystem.entities.contact.repositories.ContactRepository;
import swp490.g23.onlinelearningsystem.entities.contact.service.IContactService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoContactException;
import swp490.g23.onlinelearningsystem.util.enumutil.ContactStatus;

@Service
public class ContactService implements IContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity< List<ContactFilter>> contactFilter() {
        List<ContactFilter> filters = new ArrayList<>();
        List<Setting> settings = settingRepositories.findAllCategory();

        for (Setting s : settings) {
            filters.add(new ContactFilter(s.getSettingTitle(), s.getSettingValue()));
        }

        return ResponseEntity.ok(filters);
    }

    @Override
    public ResponseEntity<List<ContactResponseDTO>> getAllContact() {
        List<WebContact> contacts = contactRepository.findAll();
        List<ContactResponseDTO> contacDtos = new ArrayList<>();

        for (WebContact wc : contacts) {
            contacDtos.add(toDTO(wc));
        }

        return ResponseEntity.ok(contacDtos);
    }

    @Override
    public ResponseEntity<ContactResponseDTO> getContactDetail(Long id) {
        WebContact contact = contactRepository.findById(id).orElseThrow(NoContactException::new);
        ContactResponseDTO responseDTO = toDTO(contact);
        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<String> editContactDetail(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<String> addContact(ContactRequestDTO dto) {
        WebContact entity = new WebContact();

        if (dto.getFullName()!= null) {
            entity.setFullName(dto.getFullName());
        }

        if (dto.getEmail() != null) {
            entity.setEmail(dto.getEmail());
        }

        if (dto.getMessage() != null) {
            entity.setMessage(dto.getMessage());
        }

        if (dto.getMobile() != null) {
            entity.setMobile(dto.getMobile());
        }

        if (dto.getCategoryValue() != null) {
            entity.setCategory(settingRepositories.findActiveSettingByValue(dto.getCategoryValue()));
        }

        entity.setStatus(ContactStatus.OPEN);
        contactRepository.save(entity);
        return ResponseEntity.ok("New contact added");
    }

    // public WebContact toEntity(ContactRequestDTO dto) {
    // WebContact entity = new WebContact();

    // if (dto.getFullName() != null) {
    // entity.setFullName(entity.getFullName());
    // }

    // if (dto.getEmail() != null) {
    // entity.setEmail(entity.getEmail());
    // }

    // if (dto.getMessage() != null) {
    // entity.setMessage(entity.getMessage());
    // }

    // if (dto.getMobile() != null) {
    // entity.setMobile(entity.getMobile());
    // }

    // if (dto.getResponse() != null) {
    // entity.setFullName(entity.getFullName());
    // }

    // if (dto.getStatus() != null) {
    // entity.setStatus(ContactStatus.valueOf(entity.getStatus().toString()));
    // }

    // if (entity.getResponse() != null) {
    // responseDTO.setResponse(entity.getResponse());
    // }

    // return entity;
    // }

    public ContactResponseDTO toDTO(WebContact entity) {
        ContactResponseDTO responseDTO = new ContactResponseDTO();

        responseDTO.setContactId(entity.getContactId());

        if (entity.getFullName() != null) {
            responseDTO.setFullName(entity.getFullName());
        }

        if (entity.getEmail() != null) {
            responseDTO.setEmail(entity.getEmail());
        }

        if (entity.getMessage() != null) {
            responseDTO.setMessage(entity.getMessage());
        }

        if (entity.getMobile() != null) {
            responseDTO.setMobile(entity.getMobile());
        }

        if (entity.getResponse() != null) {
            responseDTO.setFullName(entity.getFullName());
        }

        if (entity.getStaff() != null) {
            responseDTO.setStaffEmail(entity.getStaff().getEmail());
        }

        if (entity.getStatus() != null) {
            responseDTO.setStatus(entity.getStatus().toString());
        }

        if (entity.getCategory() != null) {
            responseDTO.setCategoryName(entity.getCategory().getSettingTitle());
        }

        if (entity.getResponse() != null) {
            responseDTO.setResponse(entity.getResponse());
        }

        return responseDTO;
    }

    
}
