package swp490.g23.onlinelearningsystem.entities.subject.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectRequestDTO {
    private Long subjectId;

   
    private String subjectCode;

    
    private String subjectName;

    
    private String subjectStatus;

    
    private String body;

    
	private String managerEmail;

   
	private String expertEmail;
}
