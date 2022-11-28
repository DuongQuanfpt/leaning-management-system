package swp490.g23.onlinelearningsystem.enums.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.Status;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatusEntity {
     String name;
     String value;

     public  StatusEntity (Status status){
          this.name = status.toString();
          this.value = status.getValue();
     }
}
