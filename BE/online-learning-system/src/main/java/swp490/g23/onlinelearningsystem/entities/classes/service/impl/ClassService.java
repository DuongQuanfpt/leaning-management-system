package swp490.g23.onlinelearningsystem.entities.classes.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.domain.filter.ClassFilterDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.request.ClassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.response.ClassResponseDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.response.ClassResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.classes.service.IClassService;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Service
public class ClassService implements IClassService{

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<ClassResponsePaginateDTO> displayClasses(int limit, int currentPage) {
        List<Classes> classes = new ArrayList<>();
        if (limit == 0 ) {
            classes = classRepositories.findAll();   
        } else {
            Pageable pageable = PageRequest.of(currentPage - 1, limit, Sort.by(Sort.Direction.ASC, "classId"));
            classes = classRepositories.findAll(pageable).getContent();
        }
        
        
        List<ClassResponseDTO> result = new ArrayList<>();

        for (Classes clazz : classes) {
            result.add(toDTO(clazz));
        }

        ClassResponsePaginateDTO responseDTO = new ClassResponsePaginateDTO();
        responseDTO.setPage(currentPage);
        responseDTO.setListResult(result);
        if (limit == 0) {
            responseDTO.setTotalPage(0);
        } else{
            responseDTO.setTotalPage((int) Math.ceil((double) classRepositories.count() / limit));
        }

        responseDTO.setTotalItem(classRepositories.count());

        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<ClassResponseDTO> viewClass(long id) {
        Classes clazz = classRepositories.findById(id).get();
        return ResponseEntity.ok(toDTO(clazz));
    }

    @Override
    public ResponseEntity<String> updateClass(ClassRequestDTO dto, Long id) {
        Classes clazz = classRepositories.findById(id).get();
        String trainerEmail = dto.getTrainer();
        String supporterEmail = dto.getSupporter();
        User userTrainer = userRepository.findByEmail(trainerEmail).get();
        User userSupportter = userRepository.findByEmail(supporterEmail).get();
        
        clazz.setCode(dto.getCode());
        clazz.setUserSupporter(userSupportter);
        clazz.setUserTrainer(userTrainer);

        classRepositories.save(clazz);
        return ResponseEntity.ok("Class has been udated");
    }

    @Override
    public ResponseEntity<String> updateStatus(Long id) {
        Classes clazz = classRepositories.findById(id).get();
        if (clazz.getStatus() == Status.ACTIVE) {
            clazz.setStatus(Status.INACTIVE);
        } else {
            clazz.setStatus(Status.ACTIVE);
        }   
        classRepositories.save(clazz);
        return ResponseEntity.ok("Class status updated");
    }

    @Override
    public ResponseEntity<ClassFilterDTO> getFilter() {
        List<String> listTrainer = new ArrayList<>();
        List<String> listSupporter = new ArrayList<>();
        List<User> users = userRepository.findAll();
        for(User user : users) {
            if (user.getSettings().contains(settingRepositories.findBySettingValue("ROLE_TRAINER"))){
                listTrainer.add(user.getEmail());
            }
            if (user.getSettings().contains(settingRepositories.findBySettingValue("ROLE_SUPPORTER"))){
                listSupporter.add(user.getEmail());
            }
        }
        // List<Setting> settings = new ArrayList<>();
        // settings.add(settingRepositories.findBySettingValue("ROLE_TRAINER"));

        // for (User user : userRepository.findBySettings(settings)) {
        //     list.add(user.getFullName());
        // }

        ClassFilterDTO filterDTO = new ClassFilterDTO();
        filterDTO.setStatusFilter(List.of(Status.ACTIVE.toString(), Status.INACTIVE.toString()));
        filterDTO.setTrainerFilter(listTrainer);
        filterDTO.setSupporterFilter(listSupporter);
        
        return ResponseEntity.ok(filterDTO);
    }
    
    public ClassResponseDTO toDTO(Classes entity) {
        ClassResponseDTO responseDTO = new ClassResponseDTO();
        responseDTO.setClassId(entity.getClassId());
        responseDTO.setCode(entity.getCode());
        responseDTO.setDescription(entity.getDescription());
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setTrainer(entity.getUserTrainer().getUsername());
        responseDTO.setSupporter(entity.getUserSupporter().getUsername());
        return responseDTO;
    }
}
