package swp490.g23.onlinelearningsystem.entities.classes.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.domain.filter.ClassFilterDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.request.ClassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.response.ClassResponseDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.response.ClassResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.response.ClassTypeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.criteria.ClassRepositoriesCriteria;
import swp490.g23.onlinelearningsystem.entities.classes.service.IClassService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.SubjecRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.ClassStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ClassStatusEntity;

@Service
public class ClassService implements IClassService {

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    private ClassRepositoriesCriteria classCriteria;

    @Autowired
    private SubjecRepository subjecRepository;

    @Override
    public ResponseEntity<ClassResponsePaginateDTO> displayClasses(int limit, int currentPage, String keyword,
            String filterTerm, String filterTrainer,
            String filterSupporter, String filterBranch, String filterStatus, User user) {

        User currentUser = userRepository.findById(user.getUserId()).get();
        List<ClassResponseDTO> classes = new ArrayList<>();
        List<ClassStatusEntity> statusFilter = new ArrayList<>();
        List<ClassTypeResponseDTO> listTerm = new ArrayList<>();
        List<ClassTypeResponseDTO> listBranch = new ArrayList<>();
        List<String> trainerList = new ArrayList<>();
        List<String> supporterList = new ArrayList<>();
        List<String> classFilter = new ArrayList<>();

        TypedQuery<Classes> queryResult = classCriteria.displayClass(keyword, filterTerm, filterTrainer,
                filterSupporter, filterBranch, filterStatus, currentUser);

        List<Classes> classList = queryResult.getResultList();

        for (ClassStatus status : new ArrayList<ClassStatus>(EnumSet.allOf(ClassStatus.class))) {
            statusFilter.add(new ClassStatusEntity(status));
        }

        for (Classes clazz : classList) {
            if (clazz.getUserTrainer() != null && !trainerList.contains(clazz.getUserTrainer().getAccountName())) {
                trainerList.add(clazz.getUserTrainer().getAccountName());
            }

            if (clazz.getUserSupporter() != null
                    && !supporterList.contains(clazz.getUserSupporter().getAccountName())) {
                supporterList.add(clazz.getUserSupporter().getAccountName());
            }

            boolean canAdd = true;
            if (clazz.getSettingBranch() != null) {
                for (ClassTypeResponseDTO ct : listBranch) {
                    if (clazz.getSettingBranch().getSettingValue().equals(ct.getValue())) {
                        canAdd = false;
                        break;
                    }
                }
                if (canAdd == true) {
                    listBranch.add(new ClassTypeResponseDTO(clazz.getSettingBranch().getSettingTitle(),
                            clazz.getSettingBranch().getSettingValue()));
                }

            }

            canAdd = true;
            if (clazz.getSettingTerm() != null) {

                for (ClassTypeResponseDTO ct : listTerm) {
                    if (clazz.getSettingTerm().getSettingValue().equals(ct.getValue())) {
                        canAdd = false;
                        break;
                    }
                }
                if (canAdd == true) {
                    listTerm.add(new ClassTypeResponseDTO(clazz.getSettingTerm().getSettingTitle(),
                            clazz.getSettingTerm().getSettingValue()));
                }
            }
            classFilter.add(clazz.getCode());
        }

        int totalItem = queryResult.getResultList().size();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((currentPage - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        for (Classes clazz : queryResult.getResultList()) {
            classes.add(toDTO(clazz));
        }

        ClassResponsePaginateDTO responseDTO = new ClassResponsePaginateDTO();
        responseDTO.setPage(currentPage);
        responseDTO.setTotalItem(totalItem);
        responseDTO.setListResult(classes);
        responseDTO.setTotalPage(totalPage);
        responseDTO.setBranchFilter(listBranch);
        responseDTO.setTermFilter(listTerm);
        responseDTO.setTrainerFilter(trainerList);
        responseDTO.setSupporterFilter(supporterList);
        responseDTO.setStatusFilter(statusFilter);
        responseDTO.setClassFilter(classFilter);

        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<ClassResponseDTO> viewClass(long id) {
        Classes clazz = classRepositories.findById(id).get();
        if (clazz.equals(null)) {
            throw new CustomException("this class doesnt exist");
        }
        return ResponseEntity.ok(toDTO(clazz));
    }

    @Override
    public ResponseEntity<String> updateClass(ClassRequestDTO dto, Long id) {
        Classes clazz = classRepositories.findById(id).get();
        if (clazz.equals(null)) {
            throw new CustomException("this class doesnt exist");
        }
        String trainerUsername = dto.getTrainer();
        String supporterUsername = dto.getSupporter();
        String term = dto.getTerm();
        String branch = dto.getBranch();

        User userTrainer = userRepository.findByAccountName(trainerUsername);
        User userSupportter = userRepository.findByAccountName(supporterUsername);
        Setting settingTerm = settingRepositories.findBySettingValue(term);
        Setting settingBranch = settingRepositories.findBySettingValue(branch);

        if (dto.getSubjectCode() != null) {
            clazz.setSubject(subjecRepository.findBySubjectCode(dto.getSubjectCode()));
        }

        if (dto.getCode() != null && !clazz.getCode().equals(dto.getCode())) {
            if (classRepositories.findByCode(dto.getCode()).isEmpty()) {
                clazz.setCode((dto.getCode()));
            } else {
                throw new CustomException("Class name already exist");
            }
        }

        if (dto.getStatus() != null) {
            clazz.setStatus(ClassStatus.getFromValue(Integer.parseInt(dto.getStatus())).get());
        }

        if (dto.getDescription() != null) {
            clazz.setDescription(dto.getDescription());
        }

        if (dto.getSupporter() != null) {
            clazz.setUserSupporter(userSupportter);
        }

        if (dto.getTrainer() != null) {
            clazz.setUserTrainer(userTrainer);
        }

        if (dto.getBranch() != null) {
            clazz.setSettingBranch(settingBranch);
        }

        if (dto.getTerm() != null) {
            clazz.setSettingTerm(settingTerm);
        }

        classRepositories.save(clazz);
        return ResponseEntity.ok("Class has been updated");
    }

    @Override
    public ResponseEntity<String> updateStatus(Long id) {
        Classes clazz = classRepositories.findById(id).get();
        if (clazz.getStatus() == ClassStatus.Active) {
            clazz.setStatus(ClassStatus.Inactive);
        } else {
            clazz.setStatus(ClassStatus.Active);
        }
        classRepositories.save(clazz);
        return ResponseEntity.ok("Class status updated");
    }

    @Override
    public ResponseEntity<ClassFilterDTO> getFilter() {
        List<String> listTrainer = new ArrayList<>();
        List<String> listSupporter = new ArrayList<>();
        List<String> subjectFilter = new ArrayList<>();
        List<String> classFilter = new ArrayList<>();
        List<ClassTypeResponseDTO> listTerm = new ArrayList<>();
        List<ClassTypeResponseDTO> listBranch = new ArrayList<>();
        List<Setting> settingTerm = settingRepositories.termList();
        List<Setting> settingBranch = settingRepositories.branchList();
        Setting roleTrainer = settingRepositories.findBySettingValue("ROLE_TRAINER");
        Setting roleSupporter = settingRepositories.findBySettingValue("ROLE_SUPPORTER");
        List<ClassStatusEntity> statuses = new ArrayList<>();
        List<User> userTrainers = userRepository.findTrainer();
        List<User> userSupporters = userRepository.findSupport();
        List<Subject> subjects = subjecRepository.findSubjectActive();
        List<Classes> classes = classRepositories.findAll();

        for (Subject subject : subjects) {
            subjectFilter.add(subject.getSubjectCode());
        }

        for (User user : userTrainers) {
            if (user.getSettings().contains(roleTrainer)) {
                listTrainer.add(user.getAccountName());
            }
        }
        for (User user : userSupporters) {
            if (user.getSettings().contains(roleSupporter)) {
                listSupporter.add(user.getAccountName());
            }
        }
        for (Setting setting : settingTerm) {
            listTerm.add(new ClassTypeResponseDTO(setting.getSettingTitle(), setting.getSettingValue()));
        }
        for (Setting setting : settingBranch) {
            listBranch.add(new ClassTypeResponseDTO(setting.getSettingTitle(), setting.getSettingValue()));
        }

        for (ClassStatus status : new ArrayList<ClassStatus>(EnumSet.allOf(ClassStatus.class))) {
            statuses.add(new ClassStatusEntity(status));
        }

        for (Classes clazz : classes) {
            classFilter.add(clazz.getCode());
        }

        ClassFilterDTO filterDTO = new ClassFilterDTO();
        filterDTO.setStatusFilter(statuses);
        filterDTO.setTrainerFilter(listTrainer);
        filterDTO.setSupporterFilter(listSupporter);
        filterDTO.setTerms(listTerm);
        filterDTO.setBranches(listBranch);
        filterDTO.setBranches(listBranch);
        filterDTO.setSubjectFilter(subjectFilter);
        filterDTO.setClassCodeFilter(classFilter);

        return ResponseEntity.ok(filterDTO);
    }

    @Override
    public ResponseEntity<String> addClass(ClassRequestDTO requestDTO) {
        Classes clazz = new Classes();
        List<User> listTrainer = userRepository.findTrainer();
        List<User> listSupport = userRepository.findSupport();

        // clazz.setCode((requestDTO.getCode()));

        if (requestDTO.getCode() != null) {
            if (classRepositories.findByCode(requestDTO.getCode()).isEmpty()) {
                clazz.setCode((requestDTO.getCode()));
            } else {
                throw new CustomException("Class name already exist");
            }
        } else {
            throw new CustomException("must assign to a class code");
        }

        clazz.setStatus(ClassStatus.getFromValue(Integer.parseInt(requestDTO.getStatus())).get());

        if (requestDTO.getDescription() != null) {
            clazz.setDescription(requestDTO.getDescription());
        }

        if (requestDTO.getSubjectCode() != null) {
            clazz.setSubject(subjecRepository.findBySubjectCode(requestDTO.getSubjectCode()));
        }

        if (requestDTO.getTrainer() != null && requestDTO.getSupporter() != null) {
            for (User user : listTrainer) {
                if (user.getAccountName().equals(requestDTO.getTrainer())) {
                    clazz.setUserTrainer(user);
                }
            }
            for (User user : listSupport) {
                if (user.getAccountName().equals(requestDTO.getSupporter())) {
                    clazz.setUserSupporter(user);
                }
            }
        }

        if (requestDTO.getTerm() != null) {
            clazz.setSettingTerm(settingRepositories.findBySettingValue(requestDTO.getTerm()));
        }

        if (requestDTO.getBranch() != null) {
            clazz.setSettingBranch(settingRepositories.findBySettingValue(requestDTO.getBranch()));
        }

        classRepositories.save(clazz);
        return ResponseEntity.ok("Class added");
    }

    public ClassResponseDTO toDTO(Classes entity) {
        ClassResponseDTO responseDTO = new ClassResponseDTO();

        responseDTO.setClassId(entity.getClassId());
        responseDTO.setCode(entity.getCode());

        if (entity.getDescription() != null) {
            responseDTO.setDescription(entity.getDescription());
        }

        if (entity.getSubject() != null) {
            responseDTO.setSubjectCode(entity.getSubject().getSubjectCode());
        }

        if (entity.getSettingTerm() != null) {
            responseDTO.setTerm(new ClassTypeResponseDTO(entity.getSettingTerm().getSettingTitle(),
                    entity.getSettingTerm().getSettingValue()));
        }

        if (entity.getSettingBranch() != null) {

            responseDTO.setBranch(new ClassTypeResponseDTO(entity.getSettingBranch().getSettingTitle(),
                    entity.getSettingBranch().getSettingValue()));
        }

        if (entity.getUserSupporter() != null) {
            responseDTO.setSupporter(entity.getUserSupporter().getAccountName());
        }

        if (entity.getUserTrainer() != null) {
            responseDTO.setTrainer(entity.getUserTrainer().getAccountName());
        }

        responseDTO.setStatus(entity.getStatus());

        return responseDTO;
    }

}
