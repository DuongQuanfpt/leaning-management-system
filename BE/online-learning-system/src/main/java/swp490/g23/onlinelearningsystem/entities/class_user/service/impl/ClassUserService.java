package swp490.g23.onlinelearningsystem.entities.class_user.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.filter.TraineeFilterDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria.UserTraineeCriteria;
import swp490.g23.onlinelearningsystem.entities.class_user.service.IClassUserService;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.TraineeStatusEntity;

@Service
public class ClassUserService implements IClassUserService{

    @Autowired
    UserTraineeCriteria traineeCriteria;

    @Autowired
    ClassRepositories classRepositories;

    @Override
    public ResponseEntity<TraineeResponsePaginateDTP> displayTrainee(int limit, int currentPage, String keyword,
            String filterClass, String filterStatus) {

        List<TraineeResponseDTO> trainees = new ArrayList<>();
        TypedQuery<ClassUser> queryResult = traineeCriteria.displayTrainee(keyword, filterClass, filterStatus);

        int totalItem = queryResult.getResultList().size();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((currentPage - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        for (ClassUser classUser : queryResult.getResultList()) {
            TraineeResponseDTO traineeDTO = toTraineeDTO(classUser.getUser());
            traineeDTO.setClasses(classUser.getClasses().getCode());
            traineeDTO.setStatus(classUser.getStatus());
            if(classUser.getDropoutDate() != null){
                traineeDTO.setDropOut(classUser.getDropoutDate().toString());
            }
          
            trainees.add(traineeDTO);
        }

        // Collections.sort(trainees, new Comparator<TraineeResponseDTO>() {
        //     @Override
        //     public int compare(TraineeResponseDTO t1, TraineeResponseDTO t2) {
        //       return t1.getClasses().compareTo(t2.getClasses());
        //     }
        //   });

        TraineeResponsePaginateDTP responseDTO = new TraineeResponsePaginateDTP();
        responseDTO.setPage(currentPage);
        responseDTO.setTotalItem(totalItem);
        responseDTO.setListResult(trainees);
        responseDTO.setTotalPage(totalPage);

        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<TraineeFilterDTO> getFilter() {
        List<String> list = new ArrayList<>();
        List<TraineeStatusEntity> statues = new ArrayList<>();
        
        for (TraineeStatus status : new ArrayList<TraineeStatus>(EnumSet.allOf(TraineeStatus.class))) {
            statues.add(new TraineeStatusEntity(status));
        }

        for (Classes clazz : classRepositories.findAll()) {
            list.add(clazz.getCode());
        }

        TraineeFilterDTO filterDTO = new TraineeFilterDTO();
        filterDTO.setStatusFilter(statues);
        filterDTO.setClassFilter(list);

        return ResponseEntity.ok(filterDTO);
    }

    //convert to DTO
    public TraineeResponseDTO toTraineeDTO(User entity) {
        TraineeResponseDTO responseDTO = new TraineeResponseDTO();
        responseDTO.setFullName(entity.getFullName());
        responseDTO.setUsername(entity.getAccountName());
        responseDTO.setEmail(entity.getEmail());
        responseDTO.setMobile(entity.getMobile());
        responseDTO.setNote(entity.getNote());
        responseDTO.setUserId(entity.getUserId());
        return responseDTO;
    }

    
}
