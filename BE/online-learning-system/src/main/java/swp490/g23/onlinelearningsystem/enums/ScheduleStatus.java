package swp490.g23.onlinelearningsystem.util.enumutil;

public enum ScheduleStatus {
    Inactive(false), Active(true), Attendance_taken(null);

    ScheduleStatus(Boolean value) {
        this.value = value;
    }

    private Boolean value;

    public Boolean getValue() {
        return value;
    }

    public static ScheduleStatus fromValue(Boolean value) {
        if (value == null) {
            return ScheduleStatus.Attendance_taken;
        }

        if (value == true) {
            return ScheduleStatus.Active;
        }

        if (value == false) {
            return ScheduleStatus.Inactive;
        }

        throw new IllegalArgumentException("Schedule [" + value + "] not supported.");

    }

    public static ScheduleStatus fromInt(int value) {
        if (value == 1) {
            return ScheduleStatus.Active;
        }

        if (value == 0) {
            return ScheduleStatus.Inactive;
        }

        if (value == -1) {
            return ScheduleStatus.Attendance_taken;
        }

        throw new IllegalArgumentException("Schedule [" + value + "] not supported.");

    }
}
