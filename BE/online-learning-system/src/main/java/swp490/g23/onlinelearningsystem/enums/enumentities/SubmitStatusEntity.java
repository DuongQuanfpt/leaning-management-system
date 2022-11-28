package swp490.g23.onlinelearningsystem.enums.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.SubmitStatusEnum;

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

        if (statusEnum == SubmitStatusEnum.Submitted) {
            this.value = "0";
        }

        if (statusEnum == SubmitStatusEnum.Pending) {
            this.value = "-1";
        }

       
    }

}
