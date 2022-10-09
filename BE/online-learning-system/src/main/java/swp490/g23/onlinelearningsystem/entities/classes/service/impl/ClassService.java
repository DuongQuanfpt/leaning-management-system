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
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoClassException;
import swp490.g23.onlinelearningsystem.util.enumutil.ClassStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Service
public class ClassService implements IClassService {

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    ClassRepositoriesCriteria classCriteria;

    @Override
    public ResponseEntity<ClassResponsePaginateDTO> displayClasses(int limit, int currentPage, String keyword,
            String filterTerm, String filterTrainer,
            String filterSupporter, String filterBranch, String filterStatus) {
        List<ClassResponseDTO> classes = new ArrayList<>();
        TypedQuery<Classes> queryResult = classCriteria.displayClass(keyword, filterTerm, filterTrainer,
                filterSupporter, filterBranch, filterStatus);

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
        String trainerEmail = dto.getTrainer();
        String supporterEmail = dto.getSupporter();
        String term = dto.getTerm();
        String branch = dto.getBranch();
        User userTrainer = userRepository.findByEmail(trainerEmail).get();
        User userSupportter = userRepository.findByEmail(supporterEmail).get();
        Setting settingTerm = settingRepositories.findBySettingTitle(term);
        Setting settingBranch = settingRepositories.findBySettingTitle(branch);

        clazz.setCode(dto.getCode());
        clazz.setUserSupporter(userSupportter);
        clazz.setUserTrainer(userTrainer);
        clazz.setSettingTerm(settingTerm);
        clazz.setSettingBranch(settingBranch);

        classRepositories.save(clazz);
        return ResponseEntity.ok("Class has been udated");
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
        List<StatusEntity> statuses = new ArrayList<>();
        List<User> users = userRepository.findAll();
        for(User user : users) {
            if (user.getSettings().contains(roleTrainer)) {
                listTrainer.add(user.getEmail());
            }
            if (user.getSettings().contains(roleSupporter)){
                listSupporter.add(user.getEmail());
            }
        }
        for (Setting setting : settingTerm) {
            listTerm.add(new ClassTypeResponseDTO(setting.getSettingTitle(), setting.getSettingValue()));
        }
        for (Setting setting : settingBranch) {
            listBranch.add(new ClassTypeResponseDTO(setting.getSettingTitle(), setting.getSettingValue()));
        }

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statuses.add(new StatusEntity(status));
        }
        // for (Classes clazz : classes) {
        // listTerm.add(clazz.getSettingTerm().getSettingTitle());
        // listBranch.add(clazz.getSettingBranch().getSettingTitle());
        // }

        // Set<Setting> settings = new HashSet<>();
        // settings.add(settingRepositories.findBySettingTitle("trainer"));

        // for (User user : userRepository.findAllBySettings(settings)) {
        // listTrainer.add(user.getFullName());
        // }

        ClassFilterDTO filterDTO = new ClassFilterDTO();
        filterDTO.setStatusFilter(statuses);
        filterDTO.setTrainerFilter(listTrainer);
        filterDTO.setSupporterFilter(listSupporter);
        filterDTO.setTerms(listTerm);
        filterDTO.setBranches(listBranch);

        return ResponseEntity.ok(filterDTO);
    }

    public ClassResponseDTO toDTO(Classes entity) {
        ClassResponseDTO responseDTO = new ClassResponseDTO();
        responseDTO.setClassId(entity.getClassId());
        responseDTO.setCode(entity.getCode());
        responseDTO.setDescription(entity.getDescription());
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setTerm(entity.getSettingTerm().getSettingTitle());
        responseDTO.setBranch(entity.getSettingBranch().getSettingTitle());
        responseDTO.setTrainer(entity.getUserTrainer().getUsername());
        responseDTO.setSupporter(entity.getUserSupporter().getUsername());
        return responseDTO;
    }
}
