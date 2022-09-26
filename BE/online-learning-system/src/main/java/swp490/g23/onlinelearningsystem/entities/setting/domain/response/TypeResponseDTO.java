package swp490.g23.onlinelearningsystem.entities.setting.domain.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class TypeResponseDTO {
    String title;
    String value;
    public TypeResponseDTO(String title, String value) {
        this.title = title;
        this.value = value;
    }

    
}
