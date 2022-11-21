package swp490.g23.onlinelearningsystem.entities.class_user.service.impl;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeImportResponse;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.ClassUserRepositories;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria.UserTraineeCriteria;
import swp490.g23.onlinelearningsystem.entities.class_user.service.IClassUserService;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.groupMember.repositories.GroupMemberRepositories;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.TraineeStatusEntity;

@Service
public class ClassUserService implements IClassUserService {

    @Autowired
    UserTraineeCriteria traineeCriteria;

    @Autowired
    SubmitRepository submitRepository;

    @Autowired
    GroupMemberRepositories memberRepositories;

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

    public static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
            Pattern.CASE_INSENSITIVE);

    @Override
    public ResponseEntity<TraineeResponsePaginateDTP> displayTrainee(int limit, int currentPage, String keyword,
            String filterClass, Long statusValue, Long userId) {
        User user = userRepository.findById(userId).get();
        List<TraineeResponseDTO> trainees = new ArrayList<>();
        List<String> classList = new ArrayList<>();
        List<TraineeStatusEntity> statusList = new ArrayList<>();

        TypedQuery<ClassUser> queryResult = traineeCriteria.displayTrainee(keyword, filterClass, statusValue, user);

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
        if (classUser == null) {
            throw new CustomException("Trainee doesn't exist!");
        }
        return ResponseEntity.ok(toTraineeDTO(classUser));
    }

    @Override
    public ResponseEntity<String> updateTrainee(Long userId, String classCode, TraineeRequestDTO dto) {
        ClassUser classUser = classUserRepositories.findByClassesAndUser(userId, classCode);
        if (classUser == null) {
            throw new CustomException("Trainee doesn't exist!");
        }
        if (dto.getStatus() != null) {
            classUser.setStatus(TraineeStatus.fromInt(Integer.parseInt(dto.getStatus())));
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
    public ResponseEntity<List<TraineeImportResponse>> addTrainee(List<TraineeRequestDTO> listRequestDTO,
            String classCode) {
        String newPass = RandomString.make(10);
        // List<ClassUser> newList = new ArrayList<>();
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        List<Setting> settings = Arrays.asList(settingRepositories.findBySettingValue("ROLE_TRAINEE"));
        List<TraineeImportResponse> importList = new ArrayList<>();
        for (TraineeRequestDTO requestDTO : listRequestDTO) {
            User newTrainee = new User();
            TraineeImportResponse importResponse = new TraineeImportResponse();
            ClassUser classUser = new ClassUser();
            String nameRequest = requestDTO.getFullName();
            String emailRequest = requestDTO.getEmail();
            Classes clazz = classRepositories.findClassByCode(classCode);

            importResponse.setFullName(nameRequest);
            importResponse.setEmail(emailRequest);
            // if (nameRequest != null) {
            // String username = nameRequest.replaceAll("\\s+", "").toLowerCase();
            // newTrainee.setAccountName(authService.accountNameGenerate(username));
            // newTrainee.setFullName(nameRequest);
            // } else {
            // importResponse.setImportMessage("Full name is empty!");
            // importResponse.setImportStatus("Failed!");
            // importList.add(importResponse);
            // continue;
            // }

            if (emailRequest != null) {
                Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailRequest);
                if (!userRepository.findByEmail(emailRequest).isPresent()) {
                    if (nameRequest != null) {
                        String username = nameRequest.replaceAll("\\s+", "").toLowerCase();
                        newTrainee.setAccountName(authService.accountNameGenerate(username));
                        newTrainee.setFullName(nameRequest);
                    } else {
                        importResponse.setImportMessage("Full name is empty!");
                        importResponse.setImportStatus("Failed!");
                        importList.add(importResponse);
                        continue;
                    }
                    if (matcher.find()) {
                        newTrainee.setEmail(emailRequest);
                        newTrainee.setPassword(encoder.encode(newPass));
                        newTrainee.setSettings(settings);
                        newTrainee.setStatus(UserStatus.Inactive);
                        classUser.setUser(newTrainee);
                    } else {
                        importResponse.setImportMessage("Email is wrong format");
                        importResponse.setImportStatus("Failed!");
                        importList.add(importResponse);
                        continue;
                    }
                    try {
                        authService.sendGooglePass(emailRequest, newPass);
                    } catch (UnsupportedEncodingException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    } catch (MessagingException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                    userRepository.save(newTrainee);
                } else {
                    if (userRepository.findByEmail(emailRequest).isPresent()
                            && classUserRepositories.findByClassesAndUser(
                                    userRepository.findByEmail(emailRequest).get().getUserId(), classCode) == null) {
                        if (nameRequest != null) {
                            if (!nameRequest.equals(userRepository.findByEmail(emailRequest).get().getFullName())) {
                                importResponse.setImportMessage("This email already used by another user!");
                                importResponse.setImportStatus("Failed!");
                                importList.add(importResponse);
                                continue;
                            }
                            classUser.setUser(userRepository.findByEmail(emailRequest).get());
                        }
                        classUser.setUser(userRepository.findByEmail(emailRequest).get());
                    } else {
                        importResponse.setImportMessage("Email have already existed!");
                        importResponse.setImportStatus("Failed!");
                        importList.add(importResponse);
                        continue;
                    }
                }
            } else {
                importResponse.setImportMessage("Email is empty!");
                importResponse.setImportStatus("Failed!");
                importList.add(importResponse);
                continue;
            }

            // newTrainee.setStatus(UserStatus.Inactive);
            // try {
            // authService.sendGooglePass(emailRequest, newPass);
            // } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            // e.printStackTrace();
            // } catch (MessagingException e) {
            // TODO Auto-generated catch block
            // e.printStackTrace();
            // }
            // newTrainee.setPassword(encoder.encode(newPass));
            // newTrainee.setSettings(settings);
            // userRepository.save(newTrainee);
            classUser.setClasses(clazz);
            // classUser.setUser(newTrainee);
            classUser.setStatus(TraineeStatus.Inactive);
            // newList.add(classUser);
            // newTrainee.setClassUsers(newList);

            classUserRepositories.save(classUser);
            importSubmit(classUser);
            importResponse.setImportStatus("Successfully!");
            importList.add(importResponse);
        }

        return ResponseEntity.ok(importList);
    }

    @Override
    public ResponseEntity<String> updateStatus(Long userId, String classCode) {
        ClassUser classUser = classUserRepositories.findByClassesAndUser(userId, classCode);
        if (classUser == null) {
            throw new CustomException("Trainee doesn't exist!");
        }
        if (classUser.getStatus() == TraineeStatus.Active) {
            classUser.setStatus(TraineeStatus.Inactive);

        } else {
            classUser.setStatus(TraineeStatus.Active);
        }
        classUserRepositories.save(classUser);
        updateSubmit(classUser);
        return ResponseEntity.ok("Trainee status updated");
    }

    public void importSubmit(ClassUser classUser) {
        if (classUser.getSubmits() == null) {
            List<Milestone> milestones = classUser.getClasses().getMilestones();
            List<Submit> newSubmits = new ArrayList<>();
            for (Milestone milestone : milestones) {
                Submit submit = new Submit();
                submit.setClassUser(classUser);
                submit.setGroup(null);
                submit.setStatus(SubmitStatusEnum.Pending);
                submit.setMilestone(milestone);

                newSubmits.add(submit);
            }
            submitRepository.saveAll(newSubmits);
        }
    }

    public void updateSubmit(ClassUser classUser) {

        List<GroupMember> memberToUpdate = new ArrayList<>();
        for (GroupMember groupMember : classUser.getUser().getGroupMembers()) {
            if (classUser.getStatus() != TraineeStatus.Active) {
                groupMember.setIsActive(false);
            } else {
                groupMember.setIsActive(true);
            }
            memberToUpdate.add(groupMember);
        }
        memberRepositories.saveAll(memberToUpdate);
    }

    @Override
    public ResponseEntity<String> setDropout(Long userId, String classCode, TraineeRequestDTO dto) {
        ClassUser classUser = classUserRepositories.findByClassesAndUser(userId, classCode);
        if (classUser == null) {
            throw new CustomException("Trainee doesn't exist!");
        }
        LocalDate date = LocalDate.parse(dto.getDropoutDate());
        if (classUser.getStatus() == TraineeStatus.Active || classUser.getStatus() == TraineeStatus.Inactive) {
            classUser.setDropoutDate(date);
            classUser.setStatus(TraineeStatus.Dropout);
        }
        classUserRepositories.save(classUser);
        updateSubmit(classUser);
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

        if (entity.getUser().getAvatar_url() != null) {
            responseDTO.setProfileUrl(entity.getUser().getAvatar_url());
        }
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setClasses(entity.getClasses().getCode());

        return responseDTO;
    }

}
