package swp490.g23.onlinelearningsystem.util.enumutil;

public enum TraineeStatus {
    Inactive(false), Active(true), Dropout(null);

    TraineeStatus(Boolean value) {
        this.value = value;
    }

    private Boolean value;

    public Boolean getValue() {
        return value;
    }

    public static TraineeStatus fromValue(Boolean value) {
        if (value == null) {
            return TraineeStatus.Dropout;
        }

        if (value == true) {
            return TraineeStatus.Active;
        }

        if (value == false) {
            return TraineeStatus.Inactive;
        }

        throw new IllegalArgumentException("Trainee [" + value + "] not supported.");

    }

    public static TraineeStatus fromInt(int value) {
        if (value == 1) {
            return TraineeStatus.Active;
        }

        if (value == 0) {
            return TraineeStatus.Inactive;
        }

        if (value == -1) {
            return TraineeStatus.Dropout;
        }

        throw new IllegalArgumentException("Trainee [" + value + "] not supported.");

    }
}
