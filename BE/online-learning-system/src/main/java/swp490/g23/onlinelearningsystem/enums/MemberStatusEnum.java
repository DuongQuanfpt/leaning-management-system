package swp490.g23.onlinelearningsystem.util.enumutil;

public enum MemberStatusEnum {
    Inactive(false), Active(true);

    MemberStatusEnum(Boolean value) {
        this.value = value;
    }

    private Boolean value;

    public Boolean getValue() {
        return value;
    }
}
