package swp490.g23.onlinelearningsystem.entities.post.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostResponseDTO {
    Long postId;

    private String postTitle;

    private Long authorId;

    private String authorName;

    private String authorFullName;

    private String authorMobile;

    private Long categoryId;

    private String categoryName;

    private String thumbnail_Url;

    private String excerpt;

    private String content;

    private String status;

    private Long viewCount;

    private String lastUpdate;
}
