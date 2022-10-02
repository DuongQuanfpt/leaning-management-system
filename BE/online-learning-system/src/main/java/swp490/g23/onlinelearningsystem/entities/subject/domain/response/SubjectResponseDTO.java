package swp490.g23.onlinelearningsystem.entities.subject.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.EnumEntity.StatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectResponseDTO {
  
    private Long subjectId;

   
    private String subjectCode;

    
    private String subjectName;

    
    private StatusEnum subjectStatus;

    
    private String body;

    
	private String managerEmail;

   
	private String expertEmail;
}
