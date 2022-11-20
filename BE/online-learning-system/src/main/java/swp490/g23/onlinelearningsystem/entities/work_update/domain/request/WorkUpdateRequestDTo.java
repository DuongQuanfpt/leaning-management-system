package swp490.g23.onlinelearningsystem.entities.work_update.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkUpdateRequestDTo {
    String title;

    String description;

    String updateDate;

    Long milestoneId;

}
