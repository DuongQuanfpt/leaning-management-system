package swp490.g23.onlinelearningsystem.entities.classes.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassFilterDTO {
    List <String> trainerFilter;
    List <String> statusFilter;
}
