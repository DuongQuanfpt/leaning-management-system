package swp490.g23.onlinelearningsystem.entities.classes.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.classes.domain.response.ClassTypeResponseDTO;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ClassStatusEntity;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassFilterDTO {
    List <String> trainerFilter;
    List <String> supporterFilter;
    List <ClassStatusEntity> statusFilter;
    List <String> subjectFilter;
    List <ClassTypeResponseDTO> terms;
    List <ClassTypeResponseDTO> branches;
}
