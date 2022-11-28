package swp490.g23.onlinelearningsystem.entities.attendance.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.AttendanceStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDetailResponseDTO {
    private String accountName;

    private String fullName;

    private String classCode;

    private AttendanceStatus status;

    private String comment;

    private String image;

    public AttendanceDetailResponseDTO(String accountName, String fullName, String classCode, String image) {
        this.accountName = accountName;
        this.fullName = fullName;
        this.classCode = classCode;
        this.image = image;
    }

}
