package swp490.g23.onlinelearningsystem.util.enumutil;

import java.util.Arrays;
import java.util.Optional;

public enum MilestoneStatusEnum {
    Open(false), InProgress(true), Closed(null);

    MilestoneStatusEnum(Boolean value) {
        this.value = value;
    }

    private Boolean value;

    public Boolean getValue() {
        return value;
    }

    public static MilestoneStatusEnum fromValue(Boolean value) {
        if (value == null) {
            return MilestoneStatusEnum.Closed;
        }

        if (value == true) {
            return MilestoneStatusEnum.InProgress;
        }

        if (value == false) {
            return MilestoneStatusEnum.Open;
        }

        throw new IllegalArgumentException("Milestone [" + value + "] not supported.");

    }


    public static MilestoneStatusEnum fromInt(int value) {
        if (value == 1) {
            return MilestoneStatusEnum.InProgress;
        }

        if (value == 0) {
            return MilestoneStatusEnum.Open;
        }

        if (value == -1) {
            return MilestoneStatusEnum.Closed;
        }

        throw new IllegalArgumentException("Milestone [" + value + "] not supported.");

    }
}
