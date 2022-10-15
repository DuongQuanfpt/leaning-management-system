package swp490.g23.onlinelearningsystem.entities.class_user.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.RequestScope;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.filter.TraineeFilterDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.request.TraineeRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria.UserTraineeCriteria;
import swp490.g23.onlinelearningsystem.entities.class_user.service.IClassUserService;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.ObjectDuplicateException;
import swp490.g23.onlinelearningsystem.util.enumutil.ClassStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ClassStatusEntity;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.TraineeStatusEntity;

@Service
public class ClassUserService implements IClassUserService{

    @Autowired
    UserTraineeCriteria traineeCriteria;

    @Autowired
    ClassRepositories classRepositories;

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<TraineeResponsePaginateDTP> displayTrainee(int limit, int currentPage, String keyword,
            String filterClass, String filterStatus) {

        List<TraineeResponseDTO> trainees = new ArrayList<>();
        List<String> classList = new ArrayList<>();
        List<TraineeStatusEntity> statusList = new ArrayList<>();

        TypedQuery<ClassUser> queryResult = traineeCriteria.displayTrainee(keyword, filterClass, filterStatus);
        
        List<ClassUser> classUsers = queryResult.getResultList();

        for (TraineeStatus status : new ArrayList<TraineeStatus>(EnumSet.allOf(TraineeStatus.class))) {
            statusList.add(new TraineeStatusEntity(status));
        }

        for (ClassUser classUser : classUsers) {
            if (classUser.getClass() != null && !classList.contains(classUser.getClasses().getCode())) {
                classList.add(classUser.getClasses().getCode());
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
        responseDTO.setClassFilter(classList);
        responseDTO.setStatuFilter(statusList);

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

    @Override
    public ResponseEntity<String> addTrainee(List<TraineeRequestDTO> listRequestDTO) {
        User newTrainee = new User();
        List<User> listTrainee = new ArrayList<>();
        for (TraineeRequestDTO requestDTO : listRequestDTO) {
            String usernameRequest = requestDTO.getUsername();
            String emailRequest = requestDTO.getEmail();
            ClassUser classUser = new ClassUser();
            String classRequest = requestDTO.getClasses();
            if (usernameRequest != null && !requestDTO.getUsername().equals(userRepository.findByAccountName(usernameRequest).getAccountName())) {
                newTrainee.setAccountName(usernameRequest);
            } else if (usernameRequest != null && requestDTO.getUsername().equals(userRepository.findByAccountName(usernameRequest).getAccountName())) {
                throw new ObjectDuplicateException("username already existed");
            } 

            if (emailRequest != null && !requestDTO.getEmail().equals(userRepository.findByEmail(usernameRequest).get().getEmail())) {
                newTrainee.setEmail(emailRequest);
            } else if (emailRequest != null && requestDTO.getUsername().equals(userRepository.findByEmail(usernameRequest).get().getEmail())) {
                throw new ObjectDuplicateException("email already existed");
            } 

            if (requestDTO.getFullName() != null) {
                newTrainee.setFullName(requestDTO.getFullName());
            }

            if (requestDTO.getMobile() != null) {
                newTrainee.setMobile(requestDTO.getMobile());
            }

            if (requestDTO.getNote() != null) {
                newTrainee.setNote(requestDTO.getNote());
            }

            newTrainee.setStatus(UserStatus.Active);

            newTrainee.setPassword(emailRequest);

            // if (classRequest != null) {
            //     classUser.setClasses(classRepositories.findClassByCode(classRequest));
            //     newTrainee.setClassUsers(classUser);
            // }
        }
        return ResponseEntity.ok("Import successful");
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
