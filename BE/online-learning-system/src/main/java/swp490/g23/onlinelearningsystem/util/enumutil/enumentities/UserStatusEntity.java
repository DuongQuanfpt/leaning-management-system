package swp490.g23.onlinelearningsystem.util.enumutil.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserStatusEntity {
    String name;
    String value;

    public UserStatusEntity (UserStatus status){
        this.name = status.toString();
        this.value = status.getValue();
   }
}
