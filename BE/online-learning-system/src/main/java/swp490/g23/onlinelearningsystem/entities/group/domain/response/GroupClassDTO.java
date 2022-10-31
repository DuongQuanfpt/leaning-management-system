package swp490.g23.onlinelearningsystem.entities.group.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupClassDTO {
    private Long classId;

    private String code;

    private String subjectCode;

    private List<GroupClassMemberDTO> traineeList;

    private int classSize;
}
