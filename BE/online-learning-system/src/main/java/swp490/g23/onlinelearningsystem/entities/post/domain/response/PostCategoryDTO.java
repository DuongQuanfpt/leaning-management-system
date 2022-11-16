package swp490.g23.onlinelearningsystem.entities.post.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostCategoryDTO {
    private Long categoryId;

    private String categoryName;
}
