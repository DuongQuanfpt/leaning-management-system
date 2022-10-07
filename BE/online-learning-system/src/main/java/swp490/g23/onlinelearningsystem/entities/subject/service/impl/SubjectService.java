package swp490.g23.onlinelearningsystem.entities.subject.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.subject.domain.filter.SubjectFilter;
import swp490.g23.onlinelearningsystem.entities.subject.domain.request.SubjectRequestDTO;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.SubjecRepository;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.criteria.SubjectRepositoriesCriteria;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponseDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.subject.service.ISubjectService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.DuplicateSubjectCodeException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoSubjectException;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

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
            String managerFilter, String expertFilter, String statusFilter) {
        List<SubjectResponseDTO> list = new ArrayList<>();
        TypedQuery<Subject> queryResult = subjectCriteria.searchFilterSubject(keyword, statusFilter, managerFilter,
                expertFilter);

        int totalItem = queryResult.getResultList().size();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((currentPage - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        for (Subject setting : queryResult.getResultList()) {
            list.add(toDTO(setting));
        }

        SubjectResponsePaginateDTO dto = new SubjectResponsePaginateDTO();
        dto.setPage(currentPage);
        dto.setTotalItem(totalItem);
        dto.setListResult(list);
        dto.setTotalPage(totalPage);

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<SubjectResponseDTO> getSubjectDetail(Long id) {
        Subject subject = subjectRepository.findById(id).get();
        if (subject == null) {
            throw new NoSubjectException();
        }
        return ResponseEntity.ok(toDTO(subject));
    }

    @Override
    public ResponseEntity<String> editSubject(Long id, SubjectRequestDTO dto) {
        Subject subject = subjectRepository.findById(id).get();
        if (subjectRepository.findBySubjectCode(dto.getSubjectCode()) != null) {
            throw new DuplicateSubjectCodeException();
        }

        if (subject == null) {
            throw new NoSubjectException();
        }
        if (dto.getSubjectCode() != null) {
            subject.setSubjectCode(dto.getSubjectCode());
        }

        if (dto.getSubjectName() != null) {
            subject.setSubjectName(dto.getSubjectName());

        }

        if (dto.getSubjectStatus() != null) {
            subject.setSubjectStatus(Status.getFromValue(Integer.parseInt(dto.getSubjectStatus())).get());
        }

        if (dto.getManagerEmail() != null) {
            User manager =userRepository.findActiveUserByEmail(dto.getManagerEmail());
            if (manager == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There are no manager with that email");
            }
            subject.setManager(manager);
        }

        if (dto.getExpertEmail() != null) {
            User expert =userRepository.findActiveUserByEmail(dto.getExpertEmail());
            if ( expert == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There are no expert with that email");
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
            responseDTO.setExpertEmail(entity.getExpert().getEmail());
        }

        if (entity.getManager() != null) {
            responseDTO.setManagerEmail(entity.getManager().getEmail());
        }

        responseDTO.setSubjectStatus(entity.getSubjectStatus());
        responseDTO.setBody(entity.getBody());

        return responseDTO;
    }

    @Override
    public ResponseEntity<String> editSubjectStatus(Long id) {
        Subject subject = subjectRepository.findById(id).orElseThrow(NoSubjectException :: new);

        if (subject.getSubjectStatus() == Status.ACTIVE) {
            subject.setSubjectStatus(Status.INACTIVE);
        } else {
            subject.setSubjectStatus(Status.ACTIVE);
        }
        subjectRepository.save(subject);
        return ResponseEntity.ok(" Status update success");
    }

    @Override
    public ResponseEntity<SubjectFilter> subjectFilter() {
        List<String> manager = new ArrayList<>();
        List<String> expert = new ArrayList<>();
        List<StatusEntity> statuses = new ArrayList<>();

        List<User> allUser = userRepository.findAll();
        Setting managerSetting = settingRepositories.findBySettingValue("ROLE_TRAINER");
        Setting expertSetting = settingRepositories.findBySettingValue("ROLE_SUPPORTER");

        for (User user : allUser ) {
            if (user.getSettings().contains(managerSetting)) {
                manager.add(user.getEmail());
            }
            if (user.getSettings().contains(expertSetting)) {
                expert.add(user.getEmail());
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
