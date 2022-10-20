package swp490.g23.onlinelearningsystem.entities.class_user.service.impl;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.mail.MessagingException;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import net.bytebuddy.utility.RandomString;
import swp490.g23.onlinelearningsystem.entities.auth.service.impl.AuthService;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.filter.TraineeFilterDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.request.TraineeRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.ClassUserRepositories;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria.UserTraineeCriteria;
import swp490.g23.onlinelearningsystem.entities.class_user.service.IClassUserService;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.TraineeStatusEntity;

@Service
public class ClassUserService implements IClassUserService {

    @Autowired
    UserTraineeCriteria traineeCriteria;

    @Autowired
    ClassRepositories classRepositories;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ClassUserRepositories classUserRepositories;

    @Autowired
    AuthService authService;

    @Override
    public ResponseEntity<TraineeResponsePaginateDTP> displayTrainee(int limit, int currentPage, String keyword,
            String filterClass, String filterStatus, Long userId) {
        User user = userRepository.findById(userId).get();
        List<TraineeResponseDTO> trainees = new ArrayList<>();
        List<String> classList = new ArrayList<>();
        List<TraineeStatusEntity> statusList = new ArrayList<>();

        TypedQuery<ClassUser> queryResult = traineeCriteria.displayTrainee(keyword, filterClass, filterStatus, user);

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
            TraineeResponseDTO responseDTO = toTraineeDTO(classUser);
            // responseDTO.setClasses(classUser.getClasses().getCode());
            // responseDTO.setStatus(classUser.getStatus());
            trainees.add(responseDTO);
        }

        // Collections.sort(trainees, new Comparator<TraineeResponseDTO>() {
        // @Override
        // public int compare(TraineeResponseDTO t1, TraineeResponseDTO t2) {
        // return t1.getClasses().compareTo(t2.getClasses());
        // }
        // });

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
    public ResponseEntity<TraineeResponseDTO> viewTrainee(Long userId, String classCode) {
        ClassUser classUser = classUserRepositories.findByClassesAndUser(userId, classCode);
        return ResponseEntity.ok(toTraineeDTO(classUser));
    }

    @Override
    public ResponseEntity<String> updateTrainee(Long userId, String classCode, TraineeRequestDTO dto) {
        ClassUser classUser = classUserRepositories.findByClassesAndUser(userId, classCode);
        if (dto.getStatus() != null) {
            classUser.setStatus(TraineeStatus.getFromValue(Integer.parseInt(dto.getStatus())).get());
        }
        if (dto.getDropoutDate() != null) {
            if (dto.getStatus().equals(TraineeStatus.Dropout.toString())) {
                LocalDate date = LocalDate.parse(dto.getDropoutDate());
                classUser.setDropoutDate(date);
            }
        }
        if (dto.getNote() != null) {
            classUser.setNote(dto.getNote());
        }

        classUserRepositories.save(classUser);
        return ResponseEntity.ok("Update trainee successful");
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
        String newPass = RandomString.make(10);
        ClassUser classUser = new ClassUser();
        List<ClassUser> newList = new ArrayList<>();
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        for (TraineeRequestDTO requestDTO : listRequestDTO) {
            String usernameRequest = requestDTO.getUsername();
            String emailRequest = requestDTO.getEmail();

            String classRequest = requestDTO.getClasses();
            if (usernameRequest != null
                    && userRepository.findByAccountName(usernameRequest) == null) {
                newTrainee.setAccountName(usernameRequest);
            } else if (usernameRequest != null
                    && usernameRequest.equals(userRepository.findByAccountName(usernameRequest).getAccountName())) {
                throw new CustomException("username already existed");
            } else {
                throw new CustomException("Trainee dont have username");
            }

            if (emailRequest != null
                    && !userRepository.findByEmail(emailRequest).isPresent()) {
                newTrainee.setEmail(emailRequest);
            } else if (emailRequest != null
                    && emailRequest.equals(userRepository.findByEmail(usernameRequest).get().getEmail())) {
                throw new CustomException("email already existed");
            } else {
                throw new CustomException("Trainee dont have email");
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

            newTrainee.setStatus(UserStatus.Inactive);
            try {
                authService.sendGooglePass(emailRequest, newPass);
            } catch (UnsupportedEncodingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (MessagingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            newTrainee.setPassword(encoder.encode(newPass));

            if (classRequest != null) {
                classUser.setClasses(classRepositories.findClassByCode(classRequest));
                classUser.setUser(newTrainee);
                classUser.setStatus(TraineeStatus.Inactive);
                newList.add(classUser);
                newTrainee.setClassUsers(newList);
            }

            listTrainee.add(newTrainee);
        }

        userRepository.saveAll(listTrainee);
        return ResponseEntity.ok("Import successful");
    }

    @Override
    public ResponseEntity<String> updateStatus(Long userId, String classCode) {
        ClassUser classUser = classUserRepositories.findByClassesAndUser(userId, classCode);

        if (classUser.getStatus() == TraineeStatus.Active) {
            classUser.setStatus(TraineeStatus.Inactive);
        } else {
            classUser.setStatus(TraineeStatus.Active);
        }
        classUserRepositories.save(classUser);
        return ResponseEntity.ok("Trainee status updated");
    }

    @Override
    public ResponseEntity<String> setDropout(Long userId, String classCode, TraineeRequestDTO dto) {
        ClassUser classUser = classUserRepositories.findByClassesAndUser(userId, classCode);
        LocalDate date = LocalDate.parse(dto.getDropoutDate());
        if (classUser.getStatus() == TraineeStatus.Active || classUser.getStatus() == TraineeStatus.Inactive) {
            classUser.setDropoutDate(date);
            classUser.setStatus(TraineeStatus.Dropout);
        }
        classUserRepositories.save(classUser);
        return ResponseEntity.ok("Trainee has been dropped out");
    }

    // convert to DTO
    public TraineeResponseDTO toTraineeDTO(ClassUser entity) {
        TraineeResponseDTO responseDTO = new TraineeResponseDTO();
        responseDTO.setFullName(entity.getUser().getFullName());
        responseDTO.setUsername(entity.getUser().getAccountName());
        responseDTO.setEmail(entity.getUser().getEmail());
        responseDTO.setMobile(entity.getUser().getMobile());
        responseDTO.setNote(entity.getNote());
        responseDTO.setUserId(entity.getUser().getUserId());
        if (entity.getStatus().equals(TraineeStatus.Dropout)) {
            LocalDate date = entity.getDropoutDate();
            responseDTO.setDropDate(date);
        }
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setClasses(entity.getClasses().getCode());

        return responseDTO;
    }

}
