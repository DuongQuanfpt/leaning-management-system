package swp490.g23.onlinelearningsystem.util.enumutil.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.ClassStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassStatusEntity {
    String name;
    String value;

    public ClassStatusEntity (ClassStatus status){
        this.name = status.toString();
        this.value = status.getValue();
    }
}
