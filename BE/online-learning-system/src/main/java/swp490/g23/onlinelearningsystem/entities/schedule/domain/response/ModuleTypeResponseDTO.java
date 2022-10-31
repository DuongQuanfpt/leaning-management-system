package swp490.g23.onlinelearningsystem.entities.schedule.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModuleTypeResponseDTO {
    private String slot;
    private String topic;
    private String classCode;
}
