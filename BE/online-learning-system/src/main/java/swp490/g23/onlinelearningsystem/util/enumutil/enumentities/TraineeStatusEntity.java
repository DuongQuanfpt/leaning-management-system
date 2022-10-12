
package swp490.g23.onlinelearningsystem.util.enumutil.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TraineeStatusEntity {
    String name;
    String value;

    public TraineeStatusEntity (TraineeStatus status){
        this.name = status.toString();
        this.value = status.getValue();
    }
}
