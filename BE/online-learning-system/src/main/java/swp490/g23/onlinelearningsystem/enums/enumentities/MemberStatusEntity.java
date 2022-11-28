package swp490.g23.onlinelearningsystem.enums.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.MemberStatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberStatusEntity {
    String name;
    String value;

    public MemberStatusEntity (MemberStatusEnum status){
        this.name = status.toString();
        this.value = status.getValue().toString();
    }
}
