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
import swp490.g23.onlinelearningsystem.util.EnumEntity.SettingStatusEnum;

@Service
public class ClassService implements IClassService{

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<ClassResponsePaginateDTO> displayClasses(int limit, int currentPage) {
        Pageable pageable = PageRequest.of(currentPage - 1, limit, Sort.by(Sort.Direction.ASC, "classId"));
        List<Classes> classes = classRepositories.findAll(pageable).getContent();
        List<ClassResponseDTO> result = new ArrayList<>();

        for (Classes clazz : classes) {
            result.add(toDTO(clazz));
        }

        ClassResponsePaginateDTO responseDTO = new ClassResponsePaginateDTO();
        responseDTO.setPage(currentPage);
        responseDTO.setListResult(result);
        responseDTO.setTotalPage((int) Math.ceil((double) classRepositories.count() / limit));

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

        clazz.setCode(dto.getCode());
        //update roles
        classRepositories.save(clazz);
        return ResponseEntity.ok("Class has been udated");
    }

    @Override
    public ResponseEntity<String> updateStatus(Long id) {
        Classes clazz = classRepositories.findById(id).get();
        if (clazz.getStatus() == SettingStatusEnum.ACTIVE) {
            clazz.setStatus(SettingStatusEnum.INACTIVE);
        } else {
            clazz.setStatus(SettingStatusEnum.ACTIVE);
        }
        classRepositories.save(clazz);
        return ResponseEntity.ok("Class status updated");
    }

    @Override
    public ResponseEntity<ClassFilterDTO> getFilter() {
        // List<String> list = new ArrayList<>();
        // for (Setting setting : settingRepositories.()) {
        //     list.add(setting.getSettingTitle());
        // }

        ClassFilterDTO filterDTO = new ClassFilterDTO();
        filterDTO.setStatusFilter(List.of(SettingStatusEnum.ACTIVE.toString(), SettingStatusEnum.INACTIVE.toString()));
        // filterDTO.setTrainerFilter(list);
        
        return ResponseEntity.ok(filterDTO);
    }
    
    public ClassResponseDTO toDTO(Classes entity) {
        ClassResponseDTO responseDTO = new ClassResponseDTO();
        responseDTO.setClassId(entity.getClassId());
        responseDTO.setCode(entity.getCode());
        responseDTO.setDescription(entity.getDescription());
        responseDTO.setStatus(entity.getStatus());
        return responseDTO;
    }
}
