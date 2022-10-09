package swp490.g23.onlinelearningsystem.entities.contact.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequestDTO {
    private Long contactId;

    private String staffEmail;

    private String categoryValue;

    private String firstName;

    private String lastName;

    private String email;

    private String mobile;

    private String message;

    private String response;

    private String status;
}
