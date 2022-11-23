package swp490.g23.onlinelearningsystem.entities.work_eval.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvalUpdateDTO {

    private Long id;

    private String title;

    private String description;

    private String updateDate;

    private Long milestoneId;

    private String milestoneName;
}
