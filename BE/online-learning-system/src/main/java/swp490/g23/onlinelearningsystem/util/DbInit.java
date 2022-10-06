package swp490.g23.onlinelearningsystem.util;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;
import swp490.g23.onlinelearningsystem.entities.permission.repositories.PermissionRepositories;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.SubjecRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.util.enumutil.EnumEntity.RoleEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;

@Component
public class DbInit {

        @Autowired
        private SubjecRepository subjecRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private SettingRepositories settingRepositories;

        @Autowired
        private PermissionRepositories permissionRepositories;

        @Autowired
        private ClassRepositories classRepositories;

        @PostConstruct // Create User on app startup
        private void postConstruct() {

                // load Setting
                loadSetting();

                // load user
                loadUser();

                // loadSubject
                loadSubject();

                //loadClass
                loadClass();

        }

        public void loadSubject() {
                Subject s1 = new Subject("LAB101", "Lab Java", Status.ACTIVE,
                                userRepository.findByEmail("quan1@doivl.com").get());
                Subject s2 = new Subject("MAE203", "Math", Status.ACTIVE,
                                userRepository.findByEmail("quan1@doivl.com").get());

                Subject s3 = new Subject("PRF192", "Programming Fundamentals", Status.ACTIVE,
                                userRepository.findByEmail("hoangnhhe141380@fpt.edu.vn").get());

                Subject s4 = new Subject("PRO201", "Front-end Web Development", Status.ACTIVE,
                                userRepository.findByEmail("hoangnhhe141380@fpt.edu.vn").get());

                Subject s5 = new Subject("JPD121", "Elementary Japanese 1.2", Status.ACTIVE,
                                userRepository.findByEmail("quan1@doivl.com").get());
                subjecRepository.saveAll(List.of(s1, s2, s3, s4, s5));
        }

        public void loadSetting() {
                // create type setting
                Setting typeRole = new Setting("User Role", "TYPE_ROLE", "contain settings relate to user role");
                typeRole.setStatus(Status.ACTIVE);

                Setting typeTest = new Setting("Test", "TYPE_TEST", "type for test");
                typeRole.setStatus(Status.ACTIVE);

                Setting typeScreen = new Setting("System Screen", "TYPE_SCREEN",
                                "contain setting for each screen in system");
                typeRole.setStatus(Status.ACTIVE);

                // create screen setting

                Setting setting = new Setting("Setting List ", "/api/setting", Status.ACTIVE,
                                "description",
                                "1",
                                typeScreen);

                Setting settingFilter = new Setting("Setting Filter", "/api/setting-filter", Status.ACTIVE,
                                "description ", "1",
                                typeScreen);

                Setting settingStatus = new Setting("Setting Status", "/api/setting-status", Status.ACTIVE,
                                "description ", "1",
                                typeScreen);

                Setting user = new Setting("User List", "/api/user", Status.ACTIVE,
                                "description ", "1",
                                typeScreen);

                Setting userStatus = new Setting("User Status", "/api/user-status", Status.ACTIVE,
                                "description ", "1",
                                typeScreen);

                Setting userFilter = new Setting("User Filter", "/api/user-filter", Status.ACTIVE,
                                "description ", "1",
                                typeScreen);

                Setting subjects = new Setting("Subject List", "/api/subjects", Status.ACTIVE,
                                "description ", "1",
                                typeScreen);

                Setting subjectsStatus = new Setting("Subject Status", "/api/subjects-status", Status.ACTIVE,
                                "description ", "1",
                                typeScreen);

                // create test setting
                Setting test3 = new Setting("test3", "TEST3", Status.INACTIVE, "description for test", "2",
                                typeTest);

                Setting test4 = new Setting("test4", "TEST4", Status.INACTIVE, "description for test", "3",
                                typeTest);

                // create role setting
                Setting adminRole = new Setting("admin", "ROLE_ADMIN", Status.ACTIVE,
                                "description for admin", "1",
                                typeRole);
                Setting traineeRole = new Setting("trainee", "ROLE_TRAINEE", Status.ACTIVE,
                                "description for trainee", "1", typeRole);
                Setting managerRole = new Setting("manager", "ROLE_MANAGER", Status.ACTIVE,
                                "description for manager", "1", typeRole);
                Setting supporterRole = new Setting("supporter", "ROLE_SUPPORTER", Status.ACTIVE,
                                "description for supporter", "1", typeRole);
                Setting trainerRole = new Setting("trainer", "ROLE_TRAINER", Status.ACTIVE,
                                "description for trainer", "1", typeRole);
                Setting expertRole = new Setting("expert", "ROLE_EXPERT", Status.ACTIVE,
                                "description for expert", "1", typeRole);
                settingRepositories.saveAll(
                                List.of(typeScreen, typeRole, adminRole, traineeRole, managerRole, supporterRole,
                                                trainerRole, expertRole,
                                                typeTest, setting, settingFilter, settingStatus, subjects,
                                                subjectsStatus, user,
                                                userFilter, userStatus, test3,
                                                test4));

                // create permission
                SettingPermission adminSetting = new SettingPermission();
                adminSetting.setScreen(setting);
                adminSetting.setRole(adminRole);
                adminSetting.setCanGetAll(true);
                adminSetting.setCanEdit(true);

                SettingPermission adminSettingFilter = new SettingPermission();
                adminSettingFilter.setScreen(settingFilter);
                adminSettingFilter.setRole(adminRole);
                adminSettingFilter.setCanGetAll(true);

                SettingPermission adminSettingStatus = new SettingPermission();
                adminSettingStatus.setScreen(settingStatus);
                adminSettingStatus.setRole(adminRole);
                adminSettingStatus.setCanEdit(true);

                SettingPermission adminUser = new SettingPermission();
                adminUser.setScreen(user);
                adminUser.setRole(adminRole);
                adminUser.setCanGetAll(true);
                adminUser.setCanEdit(true);

                SettingPermission adminUserFilter = new SettingPermission();
                adminUserFilter.setScreen(userFilter);
                adminUserFilter.setRole(adminRole);
                adminUserFilter.setCanGetAll(true);

                SettingPermission adminUserStatus = new SettingPermission();
                adminUserStatus.setScreen(userStatus);
                adminUserStatus.setRole(adminRole);
                adminUserStatus.setCanEdit(true);

                SettingPermission adminSubjects = new SettingPermission();
                adminSubjects.setScreen(subjects);
                adminSubjects.setRole(adminRole);
                adminSubjects.setCanEdit(true);
                adminSubjects.setCanGetAll(true);

                SettingPermission adminSubjectsStatus = new SettingPermission();
                adminSubjectsStatus.setScreen(subjectsStatus);
                adminSubjectsStatus.setRole(adminRole);
                adminSubjectsStatus.setCanEdit(true);

                SettingPermission managerSubjects = new SettingPermission();
                managerSubjects.setScreen(subjects);
                managerSubjects.setRole(managerRole);
                managerSubjects.setCanGetAll(true);
                managerSubjects.setCanEdit(true);

                SettingPermission managerSubjectsStatus = new SettingPermission();
                managerSubjectsStatus.setScreen(subjectsStatus);
                managerSubjectsStatus.setRole(managerRole);
                managerSubjectsStatus.setCanEdit(true);

                permissionRepositories.saveAll(List.of(adminSetting,
                                adminSettingFilter, adminSettingStatus, adminUser, adminUserFilter, adminUserStatus,
                                adminSubjects, adminSubjectsStatus, managerSubjects, managerSubjectsStatus));
        }

        public void loadUser() {
                PasswordEncoder encoder = new BCryptPasswordEncoder();
                User defaultUser = new User("xucxichbo@doivl.com", encoder.encode("123456"));
                User u1 = new User("quan1@doivl.com", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_MANAGER.toString()));

                User u2 = new User("quan22@doivl.com", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_SUPPORTER.toString()));

                User u3 = new User("quan3@doivl.com", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_TRAINEE.toString()));

                User u4 = new User("quan4@doivl.com", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_TRAINER.toString()));

                User u5 = new User("hoangnhhe141380@fpt.edu.vn", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_ADMIN.toString()));

                User u6 = new User("quan6@doivl.com", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_EXPERT.toString()));

                defaultUser.setStatus(UserStatus.ACTIVE);
                defaultUser.addRole(settingRepositories.findActiveSettingByValue("ROLE_ADMIN"));
                defaultUser.addRole(settingRepositories.findActiveSettingByValue("ROLE_TRAINEE"));

                u5.addRole(settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_MANAGER.toString()));
                u5.addRole(settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_SUPPORTER.toString()));
                u5.addRole(settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_TRAINER.toString()));
                u5.addRole(settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_TRAINER.toString()));

                userRepository.saveAll(List.of(defaultUser, u1, u2, u3, u4, u5, u6));
        }

        public void loadClass() {
                Classes defailtClass = new Classes((long) 1, "SWP390", Status.ACTIVE, "Web project",
                                settingRepositories.findBySettingValue("TEST3"),
                                userRepository.findByEmail("quan4@doivl.com").get(),
                                userRepository.findByEmail("quan6@doivl.com").get(),
                                null);
                classRepositories.saveAll(List.of(defailtClass));
        }
        // create classsssss

}