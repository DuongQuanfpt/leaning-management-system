package swp490.g23.onlinelearningsystem.entities.class_user.domain.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClassEvalWrapper {

    private List<ClassEvalRequestDTO> dto;
}
