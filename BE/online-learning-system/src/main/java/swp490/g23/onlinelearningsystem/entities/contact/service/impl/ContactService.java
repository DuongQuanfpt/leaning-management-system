package swp490.g23.onlinelearningsystem.entities.contact.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.contact.domain.WebContact;
import swp490.g23.onlinelearningsystem.entities.contact.domain.filter.ContactCategoryFilter;
import swp490.g23.onlinelearningsystem.entities.contact.domain.request.ContactRequestDTO;
import swp490.g23.onlinelearningsystem.entities.contact.domain.response.ContactPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.contact.domain.response.ContactResponseDTO;
import swp490.g23.onlinelearningsystem.entities.contact.repositories.ContactRepository;
import swp490.g23.onlinelearningsystem.entities.contact.repositories.criteria.ContactCriteria;
import swp490.g23.onlinelearningsystem.entities.contact.repositories.criteriaEntity.ContactQuery;
import swp490.g23.onlinelearningsystem.entities.contact.service.IContactService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoObjectException;
import swp490.g23.onlinelearningsystem.util.enumutil.ContactStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ContactStatusEntity;

@Service
public class ContactService implements IContactService {

    @Autowired
    private ContactCriteria contactCriteria;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<List<ContactCategoryFilter>> contactFilter() {// get category to filter
        List<ContactCategoryFilter> filters = new ArrayList<>();
        List<Setting> settings = settingRepositories.findAllCategory();

        for (Setting s : settings) {
            filters.add(new ContactCategoryFilter(s.getSettingTitle(), s.getSettingValue()));
        }

        return ResponseEntity.ok(filters);
    }

    @Override
    public ResponseEntity<ContactPaginateDTO> getAllContact(String q, int limit, int page, // display ,search and filter
                                                                                           // all webcontact,
            String filterCategory, String filterStatus , String filterSupp) {

        ContactQuery result = contactCriteria.displaySetting(q, filterCategory, filterStatus ,filterSupp);
        TypedQuery<WebContact> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        List<ContactResponseDTO> contacDtos = new ArrayList<>();
        List<ContactCategoryFilter> contactFilters = new ArrayList<>();
        List<ContactStatusEntity> statusfilter = new ArrayList<>();
        List<String> suppFilter = new ArrayList<>();
        List<WebContact> contacts = queryResult.getResultList();

        for (ContactStatus status : new ArrayList<ContactStatus>(EnumSet.allOf(ContactStatus.class))) {
            statusfilter.add(new ContactStatusEntity(status));
        }

        for (WebContact webContact : contacts) {
            if (webContact.getStaff() != null && !suppFilter.contains(webContact.getStaff().getAccountName())) {
                suppFilter.add(webContact.getStaff().getAccountName());
            }
        }

        for (WebContact contact : contacts) {// get category in query result
            ContactCategoryFilter category = new ContactCategoryFilter(contact.getCategory().getSettingTitle(),
                    contact.getCategory().getSettingValue());

            boolean canAdd = true;

            for (ContactCategoryFilter contactTemp : contactFilters) {
                if (contactTemp.getValue().equals(category.getValue())) {
                    canAdd = false;
                    break;
                }
            }

            if (canAdd == true) {
                contactFilters.add(category);
            }

        }

        Long totalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        for (WebContact wc : queryResult.getResultList()) {
            contacDtos.add(toDTO(wc));
        }

        ContactPaginateDTO responseDTO = new ContactPaginateDTO();
        responseDTO.setPage(page);
        responseDTO.setTotalItem(totalItem);
        responseDTO.setListResult(contacDtos);
        responseDTO.setTotalPage(totalPage);
        responseDTO.setContactFilter(contactFilters);
        responseDTO.setStatusFilter(statusfilter);
        responseDTO.setSuppFilter(suppFilter);

        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<ContactResponseDTO> getContactDetail(Long id) {
        WebContact contact = contactRepository.findById(id)
                .orElseThrow(() -> new NoObjectException("Contact doesnt exist"));
        ContactResponseDTO responseDTO = toDTO(contact);
        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<String> editContactDetail(Long id, ContactRequestDTO dto, User user) {
        WebContact contact = contactRepository.findById(id)
                .orElseThrow(() -> new NoObjectException("Contact doesnt exist"));
        if (dto.getResponse() != null) {
            contact.setResponse(dto.getResponse());
        }

        if (dto.getStatus() != null) {
            contact.setStatus(ContactStatus.getFromValue(Integer.parseInt(dto.getStatus())).get());
        }

        if (contact.getResponse().equals(dto.getResponse())
                && contact.getStatus().equals(ContactStatus.getFromValue(Integer.parseInt(dto.getStatus())).get())) {
            contact.setStaff(user);
        }

        contactRepository.save(contact);
        return ResponseEntity.ok("Contact updated");
    }

    @Override
    public ResponseEntity<String> addContact(ContactRequestDTO dto) {
        WebContact entity = new WebContact();

        if (dto.getFullName() != null) {
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
            responseDTO.setStaffName(entity.getStaff().getAccountName());
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
