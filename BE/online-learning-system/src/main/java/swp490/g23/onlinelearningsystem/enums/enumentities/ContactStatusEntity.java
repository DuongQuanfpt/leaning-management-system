package swp490.g23.onlinelearningsystem.enums.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.ContactStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactStatusEntity {
    String name;
    String value;

    public ContactStatusEntity (ContactStatus status){
        this.name = status.toString();
        this.value = status.getValue();
    }
}
