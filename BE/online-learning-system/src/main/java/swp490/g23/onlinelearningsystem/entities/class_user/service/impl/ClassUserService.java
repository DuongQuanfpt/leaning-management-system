package swp490.g23.onlinelearningsystem.entities.class_user.service.impl;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.List;

import javax.mail.MessagingException;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import swp490.g23.onlinelearningsystem.entities.auth.service.impl.AuthService;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.filter.TraineeFilterDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.request.TraineeRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeImportResponse;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.ClassUserRepositories;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria.UserTraineeCriteria;
import swp490.g23.onlinelearningsystem.entities.class_user.service.IClassUserService;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NullException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.ObjectDuplicateException;
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.TraineeStatusEntity;

@Service
@RequiredArgsConstructor
@Transactional
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
    SettingRepositories settingRepositories;

    @Autowired
    AuthService authService;

    private final EntityManager em;

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
    public ResponseEntity<List<TraineeImportResponse>> addTrainee(List<TraineeRequestDTO> listRequestDTO) {
        String newPass = RandomString.make(10);
        List<ClassUser> newList = new ArrayList<>();
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        List<Setting> settings = Arrays.asList(settingRepositories.findBySettingValue("ROLE_TRAINEE"));
        List<TraineeImportResponse> importList = new ArrayList<>();
        for (TraineeRequestDTO requestDTO : listRequestDTO) {
            User newTrainee = new User();
            TraineeImportResponse importResponse = new TraineeImportResponse();
            ClassUser classUser = new ClassUser();
            String usernameRequest = requestDTO.getUsername();
            String emailRequest = requestDTO.getEmail();
            String classRequest = requestDTO.getClasses();
            Classes clazz = classRepositories.findClassByCode(classRequest);

            importResponse.setUsername(usernameRequest);
            importResponse.setEmail(emailRequest);
            if (usernameRequest != null) {
                if (userRepository.findByAccountName(usernameRequest) == null) {
                    newTrainee.setAccountName(usernameRequest);
                } else {
                    importResponse.setImportStatus("Failed!");
                    importResponse.setImportMessage("username already existed!");
                    importList.add(importResponse);
                    continue;
                }
            } else {
                importResponse.setImportMessage("username empty!");
                importResponse.setImportStatus("Failed!");
                importList.add(importResponse);
                continue;
            }

            if (emailRequest != null) {
                if (!userRepository.findByEmail(emailRequest).isPresent()) {
                    newTrainee.setEmail(emailRequest);
                } else {
                    importResponse.setImportMessage("username already existed!");
                    importResponse.setImportStatus("Failed!");
                    importList.add(importResponse);
                    continue;
                }
            } else {
                importResponse.setImportMessage("username empty!");
                importResponse.setImportStatus("Failed!");
                importList.add(importResponse);
                continue;
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
            newTrainee.setSettings(settings);

            userRepository.save(newTrainee);
            if (classRequest != null) {
                classUser.setClasses(clazz);
                classUser.setUser(newTrainee);
                classUser.setStatus(TraineeStatus.Inactive);
                newList.add(classUser);
                // newTrainee.setClassUsers(newList);
            }

            // em.persist(newTrainee);
            // userRepository.save(newTrainee);
            // em.persist(classUser);
            // em.merge(newTrainee);
            // em.merge(clazz);
            classUserRepositories.save(classUser);
            importResponse.setImportStatus("Successfully!");
            importList.add(importResponse);
        }

        return ResponseEntity.ok(importList);
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
