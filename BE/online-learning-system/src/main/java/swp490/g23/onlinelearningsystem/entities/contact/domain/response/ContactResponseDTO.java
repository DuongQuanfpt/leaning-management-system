package swp490.g23.onlinelearningsystem.entities.contact.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponseDTO {
    private Long contactId;

    private String staffName;

    private String categoryName;

    private String fullName;

    private String email;

    private String mobile;

    private String message;

    private String response;

    private String status;
}
