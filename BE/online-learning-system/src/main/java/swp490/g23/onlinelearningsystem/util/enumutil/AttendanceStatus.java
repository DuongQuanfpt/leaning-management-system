package swp490.g23.onlinelearningsystem.util.enumutil;

public enum AttendanceStatus {
    Late(false), Present(true), Absent(null);

    AttendanceStatus(Boolean value) {
        this.value = value;
    }

    private Boolean value;

    public Boolean getValue() {
        return value;
    }

    public static AttendanceStatus fromValue(Boolean value) {
        if (value == null) {
            return AttendanceStatus.Absent;
        }

        if (value == true) {
            return AttendanceStatus.Present;
        }

        if (value == false) {
            return AttendanceStatus.Late;
        }

        throw new IllegalArgumentException("Attendance [" + value + "] not supported.");

    }

    public static AttendanceStatus fromInt(int value) {
        if (value == 1) {
            return AttendanceStatus.Present;
        }

        if (value == 0) {
            return AttendanceStatus.Late;
        }

        if (value == -1) {
            return AttendanceStatus.Absent;
        }

        throw new IllegalArgumentException("Attendance [" + value + "] not supported.");

    }
}
