package swp490.g23.onlinelearningsystem.enums;

import java.util.Arrays;
import java.util.Optional;

public enum ContactStatus {
   OPEN(1) , CLOSE(0);

    ContactStatus(int value) {
       this.value = value;
   }

   private int value;

   public String getValue() {
       return Integer.toString(value);
   }

   public static Optional<ContactStatus> getFromValue(int value) {
       return Arrays.stream(values())
               .filter(s -> s.value == value)
               .findFirst();
   }
}
