package swp490.g23.onlinelearningsystem.util.enumutil;

import java.util.Arrays;
import java.util.Optional;

public enum TraineeStatus {
    Inactive(0), Active(1), Dropout(-1);

    TraineeStatus(int value) {
        this.value = value;
    }

    private int value;

    public String getValue() {
        return Integer.toString(value);
    }

    public static Optional<TraineeStatus> getFromValue(int value) {
        return Arrays.stream(values())
                .filter(s -> s.value == value)
                .findFirst();
    }
}
