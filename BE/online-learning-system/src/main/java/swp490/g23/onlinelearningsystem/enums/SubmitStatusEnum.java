package swp490.g23.onlinelearningsystem.enums;

public enum SubmitStatusEnum {
    Submitted (false), Evaluated  (true), Pending(null);
    SubmitStatusEnum(Boolean value) {
        this.value = value;
    }

    private Boolean value;

    public Boolean getValue() {
        return value;
    }

    public static SubmitStatusEnum fromValue(Boolean value) {
        if (value == null) {
            return SubmitStatusEnum.Pending;
        }

        if (value == true) {
            return SubmitStatusEnum.Evaluated;
        }

        if (value == false) {
            return SubmitStatusEnum.Submitted;
        }

        throw new IllegalArgumentException("Attendance [" + value + "] not supported.");

    }

    public static SubmitStatusEnum fromInt(int value) {
        if (value == 1) {
            return SubmitStatusEnum.Evaluated;
        }

        if (value == 0) {
            return SubmitStatusEnum.Submitted;
        }

        if (value == -1) {
            return SubmitStatusEnum.Pending;
        }

        throw new IllegalArgumentException("Attendance [" + value + "] not supported.");

    }
}
