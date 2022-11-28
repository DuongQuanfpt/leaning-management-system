package swp490.g23.onlinelearningsystem.util.enumutil;

public enum SubmitWorkStatusEnum {
    Rejected(false), Evaluated(true), Submitted(null);

    SubmitWorkStatusEnum(Boolean value) {
        this.value = value;
    }

    private Boolean value;

    public Boolean getValue() {
        return value;
    }

    public static SubmitWorkStatusEnum fromValue(Boolean value) {
        if (value == null) {
            return SubmitWorkStatusEnum.Submitted;
        }

        if (value == true) {
            return SubmitWorkStatusEnum.Evaluated;
        }

        if (value == false) {
            return SubmitWorkStatusEnum.Rejected;
        }

        throw new IllegalArgumentException("Submit work [" + value + "] not supported.");

    }

    public static SubmitWorkStatusEnum fromInt(int value) {
        if (value == 1) {
            return SubmitWorkStatusEnum.Evaluated;
        }

        if (value == 0) {
            return SubmitWorkStatusEnum.Rejected;
        }

        if (value == -1) {
            return SubmitWorkStatusEnum.Submitted;
        }

        throw new IllegalArgumentException("Submit work [" + value + "] not supported.");

    }
}
