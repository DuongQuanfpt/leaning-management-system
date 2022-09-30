package swp490.g23.onlinelearningsystem.util;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;
import swp490.g23.onlinelearningsystem.entities.permission.repositories.PermissionRepositories;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.util.EnumEntity.RoleEnum;
import swp490.g23.onlinelearningsystem.util.EnumEntity.SettingStatusEnum;
import swp490.g23.onlinelearningsystem.util.EnumEntity.UserStatusEnum;

@Component
public class DbInit {
        @Autowired
        private UserRepository userRepository;

        @Autowired
        private SettingRepositories settingRepositories;

        @Autowired
        private PermissionRepositories permissionRepositories;

        @PostConstruct // Create User on app startup
        private void postConstruct() {
                PasswordEncoder encoder = new BCryptPasswordEncoder();

                // create type setting
                Setting typeRole = new Setting("User Role", "TYPE_ROLE", "contain settings relate to user role");
                typeRole.setStatus(SettingStatusEnum.ACTIVE);

                Setting typeTest = new Setting("Test", "TYPE_TEST", "type for test");
                typeRole.setStatus(SettingStatusEnum.ACTIVE);

                Setting typeScreen = new Setting("System Screen", "TYPE_SCREEN",
                                "contain setting for each screen in system");
                typeRole.setStatus(SettingStatusEnum.ACTIVE);

                // create screen setting

                Setting screen1 = new Setting("Setting List ", "/admin/setting", SettingStatusEnum.ACTIVE,
                                "description",
                                "1",
                                typeScreen);

                Setting screen2 = new Setting("User List", "/admin/user", SettingStatusEnum.ACTIVE,
                                "description ", "1",
                                typeScreen);

                Setting screen3 = new Setting("PermissionTest", "/user/authorities", SettingStatusEnum.ACTIVE,
                                "description ", "1",
                                typeScreen);

                // create test setting
                Setting test3 = new Setting("test3", "TEST3", SettingStatusEnum.INACTIVE, "description for test", "2",
                                typeTest);

                Setting test4 = new Setting("test4", "TEST4", SettingStatusEnum.INACTIVE, "description for test", "3",
                                typeTest);

                // create role setting
                Setting adminRole = new Setting("admin", "ROLE_ADMIN", SettingStatusEnum.ACTIVE,
                                "description for admin", "1",
                                typeRole);
                Setting traineeRole = new Setting("trainee", "ROLE_TRAINEE", SettingStatusEnum.ACTIVE,
                                "description for trainee", "1", typeRole);
                Setting managerRole = new Setting("manager", "ROLE_MANAGER", SettingStatusEnum.ACTIVE,
                                "description for manager", "1", typeRole);
                Setting supporterRole = new Setting("supporter", "ROLE_SUPPORTER", SettingStatusEnum.ACTIVE,
                                "description for supporter", "1", typeRole);
                Setting trainerRole = new Setting("trainer", "ROLE_TRAINER", SettingStatusEnum.ACTIVE,
                                "description for trainer", "1", typeRole);
                settingRepositories.saveAll(
                                List.of(typeScreen, typeRole, adminRole, traineeRole, managerRole, supporterRole,
                                                trainerRole,
                                                typeTest, screen1, screen2, screen3, test3, test4));

                // create permission
                SettingPermission adminSetting = new SettingPermission();
                adminSetting.setScreen(screen1);
                adminSetting.setRole(adminRole);
                adminSetting.setCanAdd(true);
                adminSetting.setCanDelete(true);
                adminSetting.setCanEdit(true);
                adminSetting.setCanGetAll(true);

                SettingPermission adminUser = new SettingPermission();
                adminUser.setScreen(screen2);
                adminUser.setRole(adminRole);
                adminUser.setCanAdd(true);
                adminUser.setCanDelete(true);
                adminUser.setCanEdit(true);
                adminUser.setCanGetAll(true);

                SettingPermission permissionTest = new SettingPermission();
                permissionTest.setScreen(screen3);
                permissionTest.setRole(adminRole);
                permissionTest.setCanAdd(true);
                permissionTest.setCanDelete(true);
                permissionTest.setCanEdit(true);
                permissionTest.setCanGetAll(true);

                SettingPermission permissionTest2 = new SettingPermission();
                permissionTest2.setScreen(screen3);
                permissionTest2.setRole(traineeRole);
                permissionTest2.setCanAdd(false);
                permissionTest2.setCanDelete(false);
                permissionTest2.setCanEdit(true);
                permissionTest2.setCanGetAll(true);
                permissionRepositories.saveAll(List.of(adminSetting, adminUser, permissionTest,permissionTest2));

                 // create user
                User defaultUser = new User("xucxichbo@doivl.com", encoder.encode("123456"));
                User u1 = new User("quan1@doivl.com", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_MANAGER.toString()));

                User u2 = new User("quan2@doivl.com", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_SUPPORTER.toString()));

                User u3 = new User("quan3@doivl.com", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_TRAINEE.toString()));

                User u4 = new User("quan4@doivl.com", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_TRAINER.toString()));

                User u5 = new User("hoangnhhe141380@fpt.edu.vn", encoder.encode("123456"),
                                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_ADMIN.toString()));

                defaultUser.setStatus(UserStatusEnum.ACTIVE);
                defaultUser.addRole(settingRepositories.findActiveSettingByValue("ROLE_ADMIN"));
                defaultUser.addRole(settingRepositories.findActiveSettingByValue("ROLE_TRAINEE"));
                userRepository.saveAll(List.of(defaultUser, u1, u2, u3, u4, u5));

        }

}