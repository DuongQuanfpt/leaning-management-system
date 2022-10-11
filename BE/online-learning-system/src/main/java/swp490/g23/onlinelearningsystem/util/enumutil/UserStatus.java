package swp490.g23.onlinelearningsystem.util.enumutil;

import java.util.Arrays;
import java.util.Optional;

public enum UserStatus {
    Inactive(0), Active(1), Unverified(-1);

    UserStatus(int value) {
        this.value = value;
    }

    private int value;

    public String getValue() {
        return Integer.toString(value);
    }

    public static Optional<UserStatus> getFromValue(int value) {
        return Arrays.stream(values())
                .filter(s -> s.value == value)
                .findFirst();
    }
   
}
