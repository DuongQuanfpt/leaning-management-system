package swp490.g23.onlinelearningsystem.entities.class_user.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria.UserTraineeCriteria;
import swp490.g23.onlinelearningsystem.entities.class_user.service.IClassUserService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;

@Service
public class ClassUserService implements IClassUserService{

    @Autowired
    UserTraineeCriteria traineeCriteria;

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
            TraineeResponseDTO responseDTO = toTraineeDTO(classUser.getUser());
            responseDTO.setClasses(classUser.getClasses().getCode());
            responseDTO.setStatus(classUser.getStatus());
            trainees.add(responseDTO);
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
