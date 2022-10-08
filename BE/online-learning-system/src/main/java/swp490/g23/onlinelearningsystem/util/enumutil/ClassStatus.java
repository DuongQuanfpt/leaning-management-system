package swp490.g23.onlinelearningsystem.util.enumutil;

import java.util.Arrays;
import java.util.Optional;

public enum ClassStatus {
    INACTIVE(0), ACTIVE(1), CLOSED(-1);

     ClassStatus(int value) {
        this.value = value;
    }

    private int value;

    public String getValue() {
        return Integer.toString(value);
    }

    public static Optional<ClassStatus> getFromValue(int value) {
        return Arrays.stream(values())
                .filter(s -> s.value == value)
                .findFirst();
    }
}
