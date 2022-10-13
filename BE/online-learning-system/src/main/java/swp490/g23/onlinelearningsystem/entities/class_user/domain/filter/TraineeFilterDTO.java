package swp490.g23.onlinelearningsystem.entities.class_user.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.TraineeStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TraineeFilterDTO {
    
    List<String> classFilter;
    List<TraineeStatusEntity> statusFilter;
}
