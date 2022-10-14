package swp490.g23.onlinelearningsystem.entities.classes.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_subject.domain.ClassSubject;
import swp490.g23.onlinelearningsystem.entities.class_subject.repositories.ClassSubjectRepositories;
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
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoClassException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.ObjectDuplicateException;
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
    private ClassSubjectRepositories classSubjectRepositories;

    @Autowired
    private SubjecRepository subjecRepository;

    @Override
    public ResponseEntity<ClassResponsePaginateDTO> displayClasses(int limit, int currentPage, String keyword,
            String filterTerm, String filterTrainer,
            String filterSupporter, String filterBranch, String filterStatus) {
        List<ClassResponseDTO> classes = new ArrayList<>();
        List<ClassStatusEntity> statusFilter = new ArrayList<>();
        List<String> termList = new ArrayList<>();
        List<String> branchList = new ArrayList<>();
        List<String> trainerList = new ArrayList<>();
        List<String> supporterList = new ArrayList<>();

        TypedQuery<Classes> queryResult = classCriteria.displayClass(keyword, filterTerm, filterTrainer,
                filterSupporter, filterBranch, filterStatus);

        List<Classes> classList = queryResult.getResultList();
        
        for (ClassStatus status : new ArrayList<ClassStatus>(EnumSet.allOf(ClassStatus.class))) {
            statusFilter.add(new ClassStatusEntity(status));
        }

        for (Classes clazz : classList) {
            if (clazz.getUserTrainer() != null && !trainerList.contains(clazz.getUserTrainer().getAccountName())) {
                trainerList.add(clazz.getUserTrainer().getAccountName());
            }

            if (clazz.getUserSupporter() != null && !supporterList.contains(clazz.getUserSupporter().getAccountName())) {
                supporterList.add(clazz.getUserSupporter().getAccountName());
            }
            if (clazz.getSettingBranch() != null && !branchList.contains(clazz.getSettingBranch().getSettingValue())) {
                branchList.add(clazz.getSettingBranch().getSettingValue());
            }
            if (clazz.getSettingTerm() != null && !termList.contains(clazz.getSettingTerm().getSettingValue())) {
                termList.add(clazz.getSettingTerm().getSettingValue());
            }
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
        responseDTO.setBranchFilter(branchList);
        responseDTO.setTermFilter(termList);
        responseDTO.setTrainerFilter(trainerList);
        responseDTO.setSupporterFilter(supporterList);
        responseDTO.setStatusFilter(statusFilter);
        
        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<ClassResponseDTO> viewClass(long id) {
        Classes clazz = classRepositories.findById(id).get();
        if (clazz.equals(null)) {
            throw new NoClassException();
        }
        return ResponseEntity.ok(toDTO(clazz));
    }

    @Override
    public ResponseEntity<String> updateClass(ClassRequestDTO dto, Long id) {
        Classes clazz = classRepositories.findById(id).get();
        if (clazz.equals(null)) {
            throw new NoClassException();
        }
        String trainerUsername = dto.getTrainer();
        String supporterUsername= dto.getSupporter();
        String term = dto.getTerm();
        String branch = dto.getBranch();

        User userTrainer = userRepository.findByAccountName(trainerUsername);
        User userSupportter = userRepository.findByAccountName(supporterUsername);
        Setting settingTerm = settingRepositories.findBySettingValue(term);
        Setting settingBranch = settingRepositories.findBySettingValue(branch);
        List<ClassSubject> classSubjects = new ArrayList<>();
        List<Subject> subjects = subjecRepository.getSubjectsBySubjects(dto.getSubject());

        classSubjectRepositories.deleteByClass(clazz);
        for (Subject  subject : subjects) {
            ClassSubject classSubject = new ClassSubject();
            classSubject.setSubject(subject);
            classSubject.setClasses(clazz);
            if (!clazz.getClassSubject().contains(classSubject)) {
                classSubjects.add(classSubject);
            }         
        }
        classSubjectRepositories.saveAll(classSubjects);
        clazz.setClassSubject(classSubjects);

        if (dto.getCode() != null) {
            if(classRepositories.findByCode(dto.getCode()) == null){
                clazz.setCode((dto.getCode()));
            } else {
                throw new ObjectDuplicateException("Class name already exist");
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
        List<ClassTypeResponseDTO> listTerm = new ArrayList<>();
        List<ClassTypeResponseDTO> listBranch = new ArrayList<>();
        List<Setting> settingTerm = settingRepositories.termList();
        List<Setting> settingBranch = settingRepositories.branchList();
        Setting roleTrainer = settingRepositories.findBySettingValue("ROLE_TRAINER");
        Setting roleSupporter = settingRepositories.findBySettingValue("ROLE_SUPPORTER");
        List<ClassStatusEntity> statuses = new ArrayList<>();
        List<User> users = userRepository.findTrainerAndSupporter();
        for(User user : users) {
            if (user.getSettings().contains(roleTrainer)) {
                listTrainer.add(user.getAccountName());
            }
            if (user.getSettings().contains(roleSupporter)){
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

        ClassFilterDTO filterDTO = new ClassFilterDTO();
        filterDTO.setStatusFilter(statuses);
        filterDTO.setTrainerFilter(listTrainer);
        filterDTO.setSupporterFilter(listSupporter);
        filterDTO.setTerms(listTerm);
        filterDTO.setBranches(listBranch);

        return ResponseEntity.ok(filterDTO);
    }

    @Override
    public ResponseEntity<String> addClass(ClassRequestDTO requestDTO) {
        Classes clazz = new Classes();
        List<User> list = userRepository.findTrainerAndSupporter();
        List<ClassSubject> classSubjects = new ArrayList<>();
        List<Subject> subjects = subjecRepository.getSubjectsBySubjects(requestDTO.getSubject());

        // clazz.setCode((requestDTO.getCode()));
        if (requestDTO.getCode() != null) {
            if(classRepositories.findByCode(requestDTO.getCode()) == null){
                clazz.setCode((requestDTO.getCode()));
            } else {
                throw new ObjectDuplicateException("Class name already exist");
            }
        }
    
        clazz.setStatus(ClassStatus.getFromValue(Integer.parseInt(requestDTO.getStatus())).get());

        if (requestDTO.getDescription() != null) {
            clazz.setDescription(requestDTO.getDescription());
        }

        for (Subject  subject : subjects) {
            ClassSubject classSubject = new ClassSubject();
            classSubject.setSubject(subject);
            classSubject.setClasses(clazz);
            classSubjects.add(classSubject);
        }
        classSubjectRepositories.saveAll(classSubjects);
        clazz.setClassSubject(classSubjects);

        if (requestDTO.getTrainer() != null && requestDTO.getSupporter() != null) {
            for (User user : list) {
                if (user.getAccountName().equals(requestDTO.getTrainer())) {
                    clazz.setUserTrainer(user);
                }
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
        List<String> subjects = new ArrayList<>();
        List<ClassSubject> classSubjects = classSubjectRepositories.findByClasses(entity);
        for (ClassSubject classSubject : classSubjects) {
            subjects.add(classSubject.getSubject().getSubjectName());
        }
        
        responseDTO.setClassId(entity.getClassId());
        responseDTO.setCode(entity.getCode());
        responseDTO.setDescription(entity.getDescription());
        responseDTO.setSubject(subjects);
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setTerm(entity.getSettingTerm().getSettingTitle());
        responseDTO.setBranch(entity.getSettingBranch().getSettingTitle());
        responseDTO.setTrainer(entity.getUserTrainer().getAccountName());
        responseDTO.setSupporter(entity.getUserSupporter().getAccountName());
        return responseDTO;
    }

    
}
