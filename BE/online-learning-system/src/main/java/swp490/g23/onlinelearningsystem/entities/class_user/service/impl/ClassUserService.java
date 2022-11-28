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
import swp490.g23.onlinelearningsystem.entities.class_user.domain.request.ClassEvalRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.request.TraineeRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.AssignmentFilterType;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.AssignmentGradeDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.ClassEvalPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.ClassEvalResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeImportResponse;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.ClassUserRepositories;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria.ClassEvalCriteria;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria.UserTraineeCriteria;
import swp490.g23.onlinelearningsystem.entities.class_user.service.IClassUserService;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.groupMember.repositories.GroupMemberRepositories;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.MilestoneEval;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.enums.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.enums.TraineeStatus;
import swp490.g23.onlinelearningsystem.enums.UserStatus;
import swp490.g23.onlinelearningsystem.enums.enumentities.TraineeStatusEntity;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

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

    @Autowired
    private ClassEvalCriteria classEvalCriteria;

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

    @Override
    public ResponseEntity<ClassEvalPaginateDTO> classEvalList(int limit, int currentPage, String keyword,
            String filterAssignment,
            Long userId, String classCode) {

        User user = userRepository.findById(userId).get();
        Classes clazz = classRepositories.findClassByCode(classCode);
        List<AssignmentFilterType> milestoneList = new ArrayList<>();
        List<ClassEvalResponseDTO> dto = new ArrayList<>();

        TypedQuery<ClassUser> queryResult = classEvalCriteria.displayTrainee(keyword,
                filterAssignment, user, classCode);

        List<ClassUser> classUsers = queryResult.getResultList();

        for (Milestone milestone : clazz.getMilestones()) {
            AssignmentFilterType type = new AssignmentFilterType();
            String evalWeight = milestone.getAssignment().getEval_weight().substring(0,
                    milestone.getAssignment().getEval_weight().length() - 1);
            type.setAssignmentId(milestone.getAssignment().getAssId());
            type.setAssignmentTitle(milestone.getAssignment().getTitle());
            type.setEvalWeight(evalWeight);
            if (milestone.getAssignment().isFinal()) {
                type.setFinal(true);
            } else {
                type.setFinal(false);
            }
            milestoneList.add(type);
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
            List<AssignmentGradeDTO> gradeDTO = new ArrayList<>();
            ClassEvalResponseDTO responseDTO = new ClassEvalResponseDTO();
            // Double ongoingGrade = 0.0;
            responseDTO.setUserName(classUser.getUser().getAccountName());
            responseDTO.setFullName(classUser.getUser().getFullName());
            responseDTO.setComment(classUser.getComment());
            for (Milestone milestone : classUser.getClasses().getMilestones()) {
                AssignmentGradeDTO grade = new AssignmentGradeDTO();
                grade.setAssignmentId(milestone.getAssignment().getAssId());
                grade.setAssingmentTitle(milestone.getAssignment().getTitle());
                String evalWeight = milestone.getAssignment().getEval_weight().substring(0,
                        milestone.getAssignment().getEval_weight().length() - 1);
                for (MilestoneEval eval : classUser.getMilestoneEvals()) {
                    grade.setEvalWeight(evalWeight);
                    if (eval.getMilestone().equals(milestone)) {
                        // grade.setAssignmentId(milestone.getAssignment().getAssId());
                        // grade.setAssingmentTitle(milestone.getAssignment().getTitle());
                        grade.setGrade(eval.getGrade());
                        if (eval.getMilestone().getAssignment().isFinal()) {
                            grade.setFinal(true);
                            // responseDTO.setFinalEval(eval.getGrade() * Double.parseDouble(evalWeight) /
                            // 100);
                            // continue;
                        } else {
                            grade.setFinal(false);
                            // ongoingGrade += eval.getGrade() * Double.parseDouble(evalWeight) / 100;
                        }
                    }
                    if (classUser.getFinalEval() != null) {
                        responseDTO.setFinalEval(classUser.getFinalEval());
                    }
                    if (classUser.getOngoingEval() != null) {
                        responseDTO.setOngoing(classUser.getOngoingEval());
                    }
                    if (classUser.getTopicEval() != null) {
                        responseDTO.setGpa(classUser.getTopicEval());
                    }
                    responseDTO.setAssignmentGrade(gradeDTO);
                    // if (responseDTO.getFinalEval() == null) {
                    // responseDTO.setGpa(null);
                    // } else {
                    // responseDTO.setGpa(ongoingGrade + responseDTO.getFinalEval());
                    // }
                }
                gradeDTO.add(grade);
            }
            dto.add(responseDTO);
        }

        ClassEvalPaginateDTO responseDTO = new ClassEvalPaginateDTO();
        responseDTO.setPage(currentPage);
        responseDTO.setListResult(dto);
        responseDTO.setAssingmentFilter(milestoneList);
        responseDTO.setTotalItem(totalItem);
        responseDTO.setTotalPage(totalPage);

        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<String> uodateEval(List<ClassEvalRequestDTO> requestDTOs, String classCode) {
        for (ClassEvalRequestDTO requestDTO : requestDTOs) {
            if (requestDTO.getAccountName() != null) {
                User user = userRepository.findByAccountName(requestDTO.getAccountName());
                ClassUser classUser = classUserRepositories.findByClassesAndUser(user.getUserId(), classCode);
                if (requestDTO.getFinalEval() != null) {
                    classUser.setFinalEval(requestDTO.getFinalEval());
                }
                if (requestDTO.getOngoing() != null) {
                    classUser.setOngoingEval(requestDTO.getOngoing());
                }
                if (requestDTO.getGpa() != null) {
                    classUser.setTopicEval(requestDTO.getGpa());
                }
                classUserRepositories.save(classUser);
            }
        }
        return ResponseEntity.ok("Changes has saved successfully");
    }

}
