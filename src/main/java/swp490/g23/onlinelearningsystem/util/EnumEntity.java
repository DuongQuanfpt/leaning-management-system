package swp490.g23.onlinelearningsystem.util;

public class EnumEntity {
    public enum SettingStatusEnum {
        ACTIVE,INACTIVE;
    }

    public enum UserStatusEnum {
        ACTIVE,INACTIVE,UNVERIFIED;
    }
    
    public enum RoleEnum {
        ROLE_ADMIN,ROLE_MANAGER,ROLE_SUPPORTER,ROLE_TRAINEE,ROLE_TRAINER;
    }
}
