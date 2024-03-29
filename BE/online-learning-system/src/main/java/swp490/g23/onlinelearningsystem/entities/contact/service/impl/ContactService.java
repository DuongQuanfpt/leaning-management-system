package swp490.g23.onlinelearningsystem.entities.contact.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.mail.MessagingException;
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
import swp490.g23.onlinelearningsystem.entities.email.EmailDetails;
import swp490.g23.onlinelearningsystem.entities.email.service.impl.EmailService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.enums.ContactStatus;
import swp490.g23.onlinelearningsystem.enums.enumentities.ContactStatusEntity;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class ContactService implements IContactService {

    @Autowired
    private ContactCriteria contactCriteria;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private EmailService emailService;

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
            String filterCategory, String filterStatus, String filterSupp, User user) {

        User user2 = userRepository.findById(user.getUserId()).get();
        ContactQuery result = contactCriteria.displaySetting(q, filterCategory, filterStatus, filterSupp, user2);
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
                .orElseThrow(() -> new CustomException("Contact doesnt exist"));
        ContactResponseDTO responseDTO = toDTO(contact);
        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<String> editContactDetail(Long id, ContactRequestDTO dto, User user) {
        WebContact contact = contactRepository.findById(id)
                .orElseThrow(() -> new CustomException("Contact doesnt exist"));

        User author = userRepository.findById(user.getUserId()).get();

        if (dto.getResponse() != null) {
            contact.setResponse(dto.getResponse());
            try {
                sendResponseEmail(contact.getEmail(),contact);
            } catch (UnsupportedEncodingException | MessagingException e) {
               
               throw new CustomException("sent response fail");
            }
        }

        if (dto.getStatus() != null) {
            contact.setStatus(ContactStatus.getFromValue(Integer.parseInt(dto.getStatus())).get());
        }
        contact.setStaff(author);
        contactRepository.save(contact);
        return ResponseEntity.ok("Contact updated");
    }

    public void sendResponseEmail(String email , WebContact contact)
            throws UnsupportedEncodingException, MessagingException {

        EmailDetails details = new EmailDetails();

        details.setRecipient(email);

        String subject = "RE:["+contact.getContactId()+"] : "+contact.getMessage()+"";

        String content = contact.getResponse();

        details.setMsgBody(content);
        details.setSubject(subject);

        emailService.sendMimeMail(details);
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
