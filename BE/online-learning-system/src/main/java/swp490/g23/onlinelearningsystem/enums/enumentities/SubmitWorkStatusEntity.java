package swp490.g23.onlinelearningsystem.util.enumutil.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitWorkStatusEntity {
    String name;
    String value;

    public SubmitWorkStatusEntity(SubmitWorkStatusEnum statusEnum) {
        this.name = statusEnum.toString();
        if (statusEnum == SubmitWorkStatusEnum.Evaluated) {
            this.value = "1";
        }

        if (statusEnum == SubmitWorkStatusEnum.Rejected) {
            this.value = "0";
        }

        if (statusEnum == SubmitWorkStatusEnum.Submitted) {
            this.value = "-1";
        }

       
    }
}
