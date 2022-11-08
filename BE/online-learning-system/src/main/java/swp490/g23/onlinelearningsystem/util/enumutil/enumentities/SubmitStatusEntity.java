package swp490.g23.onlinelearningsystem.util.enumutil.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitStatusEntity {
    String name;
    String value;

    public SubmitStatusEntity(SubmitStatusEnum statusEnum) {
        this.name = statusEnum.toString();
        if (statusEnum == SubmitStatusEnum.Evaluated) {
            this.value = "1";
        }

        if (statusEnum == SubmitStatusEnum.Pending) {
            this.value = "0";
        }

        if (statusEnum == SubmitStatusEnum.Submitted) {
            this.value = "-1";
        }
    }

}
