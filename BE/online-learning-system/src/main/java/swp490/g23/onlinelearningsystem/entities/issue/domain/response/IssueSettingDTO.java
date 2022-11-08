package swp490.g23.onlinelearningsystem.entities.issue.domain.response;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class IssueSettingDTO {
    Long id;
    String title;
    
    public IssueSettingDTO(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    
}
