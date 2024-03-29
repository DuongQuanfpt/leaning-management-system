package swp490.g23.onlinelearningsystem.enums.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneStatusEntity {
    String name;
    String value;

    public MilestoneStatusEntity(MilestoneStatusEnum status) {
        this.name = status.toString();
        if (status == MilestoneStatusEnum.In_Progress) {
            this.value = "1";
        }

        if (status == MilestoneStatusEnum.Open) {
            this.value = "0";
        }

        if (status == MilestoneStatusEnum.Closed) {
            this.value = "-1";
        }
    }
}
