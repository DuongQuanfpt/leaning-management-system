
package swp490.g23.onlinelearningsystem.enums.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.TraineeStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TraineeStatusEntity {
    String name;
    String value;

    public TraineeStatusEntity(TraineeStatus status) {
        this.name = status.toString();
        if (status == TraineeStatus.Active) {
            this.value = "1";
        }

        if (status == TraineeStatus.Inactive) {
            this.value = "0";
        }

        if (status == TraineeStatus.Dropout) {
            this.value = "-1";
        }
    }
}
