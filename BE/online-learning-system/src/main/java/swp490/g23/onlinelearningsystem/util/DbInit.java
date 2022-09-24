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

        Setting typeRole = new Setting("userRole", "TYPE_ROLE", "contain settings relate to user role");
        // typeRole.setStatus(Status.ACTIVE.toString());

        Setting adminRole = new Setting("admin","ROLE_ADMIN","description for admin",typeRole);
        Setting traineeRole = new Setting("trainee","ROLE_TRAINEE","description for trainee",typeRole);
        Setting managerRole = new Setting("manager","ROLE_MANAGER","description for manager",typeRole);
        Setting supporterRole = new Setting("supporter","ROLE_SUPPORTER","description for supporter",typeRole);
        Setting trainerRole = new Setting("trainee","ROLE_TRAINER","description for trainer",typeRole);
        settingRepositories.saveAll(List.of(typeRole,adminRole,traineeRole,managerRole,supporterRole,trainerRole));

        User defaultUser = new User("xucxichbo@doivl.com", encoder.encode("123456"));
        defaultUser.setStatus(UserStatusEnum.ACTIVE);
        defaultUser.addRole(settingRepositories.findBySettingValue("ROLE_ADMIN"));
        defaultUser.addRole(settingRepositories.findBySettingValue("ROLE_TRAINEE"));
        userRepository.save(defaultUser);
    
    }
}