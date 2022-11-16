package swp490.g23.onlinelearningsystem.entities.submit.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitDetailDTO {

    private Long id;

    private String requirement;

    private String assignee;

    private String complexity;

    private String quality;

    private long grade;

    private SubmitWorkStatusEnum status;
}