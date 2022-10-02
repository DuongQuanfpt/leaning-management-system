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

                Setting setting = new Setting("Setting List ", "/api/setting", SettingStatusEnum.ACTIVE,
                                "description",
                                "1",
                                typeScreen);

                Setting settingFilter = new Setting("User List", "/api/setting-filter", SettingStatusEnum.ACTIVE,
                                "description ", "1",
                                typeScreen);

                Setting settingStatus = new Setting("User List", "/api/setting-status", SettingStatusEnum.ACTIVE,
                                "description ", "1",
                                typeScreen);

                Setting screen4 = new Setting("PermissionTest", "/user/authorities", SettingStatusEnum.ACTIVE,
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
                                                typeTest, setting, settingFilter, settingStatus,screen4, test3, test4));

                // create permission
                SettingPermission adminSetting = new SettingPermission();
                adminSetting.setScreen(setting);
                adminSetting.setRole(adminRole);
                adminSetting.setCanGetAll(true);
                adminSetting.setCanEdit(true);

                SettingPermission adminUser = new SettingPermission();
                adminUser.setScreen(settingFilter);
                adminUser.setRole(adminRole);
                adminUser.setCanGetAll(true);

                SettingPermission permissionTest = new SettingPermission();
                permissionTest.setScreen(settingStatus);
                permissionTest.setRole(adminRole);
                permissionTest.setCanEdit(true);

                permissionRepositories.saveAll(List.of(adminSetting, adminUser, permissionTest));

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