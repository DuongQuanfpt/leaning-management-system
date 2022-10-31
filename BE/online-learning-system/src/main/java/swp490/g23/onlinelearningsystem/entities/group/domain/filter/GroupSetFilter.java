package swp490.g23.onlinelearningsystem.entities.group.domain.filter;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupClassDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupMilestoneDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupSetFilter {
    private GroupClassDTO userId;

    private GroupMilestoneDTO milestoneCanReuse;
}
