package swp490.g23.onlinelearningsystem.enums;

import java.util.Arrays;
import java.util.Optional;

public enum ClassStatus {
    Inactive(0), Active(1), Closed(-1);

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
