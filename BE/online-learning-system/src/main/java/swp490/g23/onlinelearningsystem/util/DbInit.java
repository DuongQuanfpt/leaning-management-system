package swp490.g23.onlinelearningsystem.util;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

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

    @PostConstruct // Create User on app startup
    private void postConstruct() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();

        Setting typeRole = new Setting("User Role", "TYPE_ROLE", "contain settings relate to user role");
        typeRole.setStatus(SettingStatusEnum.ACTIVE);

        Setting typeTest = new Setting("Test", "TYPE_TEST", "type for test");
        typeRole.setStatus(SettingStatusEnum.ACTIVE);

        Setting test1 = new Setting("test1", "TEST", SettingStatusEnum.ACTIVE, "description for test", "1",
                typeTest);

        Setting test2 = new Setting("test2", "TEST2", SettingStatusEnum.ACTIVE, "description for test", "1",
                typeTest);

        Setting test3 = new Setting("test3", "TEST3", SettingStatusEnum.INACTIVE, "description for test", "2",
                typeTest);

        Setting test4 = new Setting("test4", "TEST4", SettingStatusEnum.INACTIVE, "description for test", "3",
                typeTest);

        Setting adminRole = new Setting("admin", "ROLE_ADMIN", SettingStatusEnum.ACTIVE, "description for admin", "1",
                typeRole);
        Setting traineeRole = new Setting("trainee", "ROLE_TRAINEE", SettingStatusEnum.ACTIVE,
                "description for trainee", "1", typeRole);
        Setting managerRole = new Setting("manager", "ROLE_MANAGER", SettingStatusEnum.ACTIVE,
                "description for manager", "1", typeRole);
        Setting supporterRole = new Setting("supporter", "ROLE_SUPPORTER", SettingStatusEnum.ACTIVE,
                "description for supporter", "1", typeRole);
        Setting trainerRole = new Setting("trainer", "ROLE_TRAINER", SettingStatusEnum.ACTIVE,
                "description for trainer", "1", typeRole);
        settingRepositories.saveAll(List.of(typeRole, adminRole, traineeRole, managerRole, supporterRole, trainerRole,
                typeTest, test1, test2,test3,test4));

        User defaultUser = new User("xucxichbo@doivl.com", encoder.encode("123456"));
        User u1 = new User("quan1@doivl.com", encoder.encode("123456"),
                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_MANAGER.toString()));

        User u2 = new User("quan2@doivl.com", encoder.encode("123456"),
                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_SUPPORTER.toString()));

        User u3 = new User("quan3@doivl.com", encoder.encode("123456"),
                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_TRAINEE.toString()));

        User u4 = new User("quan4@doivl.com", encoder.encode("123456"),
                settingRepositories.findActiveSettingByValue(RoleEnum.ROLE_TRAINER.toString()));

        defaultUser.setStatus(UserStatusEnum.ACTIVE);
        defaultUser.addRole(settingRepositories.findActiveSettingByValue("ROLE_ADMIN"));
        defaultUser.addRole(settingRepositories.findActiveSettingByValue("ROLE_TRAINEE"));
        userRepository.saveAll(List.of(defaultUser, u1, u2, u3, u4));

    }
}