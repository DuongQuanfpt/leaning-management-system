package swp490.g23.onlinelearningsystem.entities.subject.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.subject.domain.filter.SubjectFilter;
import swp490.g23.onlinelearningsystem.entities.subject.domain.request.SubjectRequestDTO;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.SubjecRepository;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.criteria.SubjectRepositoriesCriteria;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.criteriaEntity.SubjectQuery;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponseDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.subject.service.ISubjectService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.enums.Status;
import swp490.g23.onlinelearningsystem.enums.enumentities.StatusEntity;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class SubjectService implements ISubjectService {

    @Autowired
    private SubjecRepository subjectRepository;

    @Autowired
    private SubjectRepositoriesCriteria subjectCriteria;

    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<SubjectResponsePaginateDTO> getSubject(int limit, int currentPage, String keyword,
            String managerFilter, String expertFilter, String statusFilter,User user) {
        
        User currentUser = userRepository.findById(user.getUserId()).get();

        SubjectQuery result = subjectCriteria.searchFilterSubject(keyword, statusFilter, managerFilter,
        expertFilter,currentUser);

        TypedQuery<Subject> queryResult =  result.getResultQuery();
        TypedQuery<Long> countQuery =   result.getCountQuery();

        List<SubjectResponseDTO> list = new ArrayList<>();
        List<StatusEntity> statusfilter = new ArrayList<>();
        List<String> managerList = new ArrayList<>();
        List<String> expertList = new ArrayList<>();
        List<Subject> subjects = queryResult.getResultList();

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statusfilter.add(new StatusEntity(status));
        }

        for (Subject subject : subjects) {
            if (subject.getManager() != null && !managerList.contains(subject.getManager().getAccountName())) {
                managerList.add(subject.getManager().getAccountName());
            }

            if (subject.getExpert() != null && !expertList.contains(subject.getExpert().getAccountName())) {
                expertList.add(subject.getExpert().getAccountName());

            }
        }

        Long totalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((currentPage - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        for (Subject subject : queryResult.getResultList()) {
            list.add(toDTO(subject));
        }

        SubjectResponsePaginateDTO dto = new SubjectResponsePaginateDTO();
        dto.setPage(currentPage);
        dto.setTotalItem(totalItem);
        dto.setListResult(list);
        dto.setTotalPage(totalPage);
        dto.setManagerFilter(managerList);
        dto.setExpertFilter(expertList);
        dto.setStatusFilter(statusfilter);

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<String> addSubject(SubjectRequestDTO dto) {
        Subject subject = new Subject();

        if (dto.getSubjectName() != null) {
            subject.setSubjectName(dto.getSubjectName());
        }

        if (dto.getBody() != null) {
            subject.setBody(dto.getBody());
        }

        if (dto.getExpertUsername() != null) {
            User expert = userRepository.findActiveByAccountName(dto.getExpertUsername());
            if (expert != null) {
                subject.setExpert(expert);
            } else {
                throw new CustomException("Expert " + dto.getExpertUsername() + " doesnt exist");
            }
        }

        if (dto.getManagerUsername() != null) {
            User manager = userRepository.findActiveByAccountName(dto.getManagerUsername());
            if (manager != null) {
                subject.setManager(manager);
            } else {
                throw new CustomException("Manager " + dto.getManagerUsername() + " doesnt exist");
            }
        }

        if (dto.getSubjectCode() != null) {
            if (subjectRepository.findBySubjectCode(dto.getSubjectCode()) == null) {
                subject.setSubjectCode(dto.getSubjectCode());
            } else {
                throw new CustomException("Subject code already exist");
            }
        }
        subject.setSubjectStatus(Status.getFromValue(Integer.parseInt(dto.getSubjectStatus())).get());

        subjectRepository.save(subject);
        return ResponseEntity.ok("Subject added");
    }

    @Override
    public ResponseEntity<SubjectResponseDTO> getSubjectDetail(Long id) {
        Subject subject = subjectRepository.findById(id).get();
        if (subject == null) {
            throw new CustomException("Subject doesnt exist");
        }
        return ResponseEntity.ok(toDTO(subject));
    }

    @Override
    public ResponseEntity<String> editSubject(Long id, SubjectRequestDTO dto) {
        Subject subject = subjectRepository.findById(id).get();

        if (subject == null) {
            throw new CustomException("Subject doesnt exist");
        }

        if (dto.getSubjectCode() != null && subject.getSubjectCode().equalsIgnoreCase(dto.getSubjectCode()) == false) {
            if (subjectRepository.findBySubjectCode(dto.getSubjectCode()) == null) {
                subject.setSubjectCode(dto.getSubjectCode());
            } else {
                throw new CustomException("Subject code already exist");
            }

        }

        if (dto.getSubjectName() != null) {
            subject.setSubjectName(dto.getSubjectName());

        }

        if (dto.getBody() != null) {
            subject.setBody(dto.getBody());

        }

        if (dto.getSubjectStatus() != null) {
            subject.setSubjectStatus(Status.getFromValue(Integer.parseInt(dto.getSubjectStatus())).get());
        }

        if (dto.getManagerUsername() != null) {
            User manager = userRepository.findActiveByAccountName(dto.getManagerUsername());
            if (manager == null) {
                throw new CustomException("There are no manager with that username");
            }
            subject.setManager(manager);
        }

        if (dto.getExpertUsername() != null) {
            User expert = userRepository.findActiveByAccountName(dto.getExpertUsername());
            if (expert == null) {
                throw new CustomException("There are no expert with that username");
            }
            subject.setExpert(expert);
        }
        subjectRepository.save(subject);
        return ResponseEntity.ok("Update Success");
    }

    public SubjectResponseDTO toDTO(Subject entity) {
        SubjectResponseDTO responseDTO = new SubjectResponseDTO();

        responseDTO.setSubjectId(entity.getSubjectId());
        responseDTO.setSubjectCode(entity.getSubjectCode());
        responseDTO.setSubjectName(entity.getSubjectName());
        if (entity.getExpert() != null) {
            responseDTO.setExpertUsername(entity.getExpert().getAccountName());
        }

        if (entity.getManager() != null) {
            responseDTO.setManagerUsername(entity.getManager().getAccountName());
        }

        responseDTO.setSubjectStatus(entity.getSubjectStatus());
        responseDTO.setBody(entity.getBody());

        return responseDTO;
    }

    @Override
    public ResponseEntity<String> editSubjectStatus(Long id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new CustomException("Subject doesnt exist"));
        
        if (subject.getSubjectStatus() == Status.Active) {
            subject.setSubjectStatus(Status.Inactive);
        } else {
            subject.setSubjectStatus(Status.Active);
        }
        subjectRepository.save(subject);
        return ResponseEntity.ok(" Status update success");
    }

    @Override
    public ResponseEntity<SubjectFilter> subjectFilter() {
        List<String> manager = new ArrayList<>();
        List<String> expert = new ArrayList<>();
        List<StatusEntity> statuses = new ArrayList<>();

        List<User> allManagerExpert = userRepository.findManagerAndExpert();
        Setting managerSetting = settingRepositories.findActiveSettingByValue("ROLE_MANAGER");
        Setting expertSetting = settingRepositories.findActiveSettingByValue("ROLE_EXPERT");

        for (User user : allManagerExpert) {
            if (user.getSettings().contains(managerSetting)) {
                manager.add(user.getAccountName());
            }
            if (user.getSettings().contains(expertSetting)) {
                expert.add(user.getAccountName());
            }
        }

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statuses.add(new StatusEntity(status));
        }

        SubjectFilter filterDTO = new SubjectFilter();
        filterDTO.setStatusFilter(statuses);
        filterDTO.setExpertFilter(expert);
        filterDTO.setManagerFilter(manager);

        return ResponseEntity.ok(filterDTO);
    }

}
