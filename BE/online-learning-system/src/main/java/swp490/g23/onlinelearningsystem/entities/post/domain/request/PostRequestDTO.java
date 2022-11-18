package swp490.g23.onlinelearningsystem.entities.post.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostRequestDTO {
    private String postTitle;

    private Long categoryId;

    private String thumbnailBase64;

    private String excerpt;

    private String content;

}
