package swp490.g23.onlinelearningsystem.entities.post.domain.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostPaginateDTO {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<PostResponseDTO> listResult = new ArrayList<>();
    private List<PostResponseDTO> topView = new ArrayList<>();
    private List<PostCategoryDTO> categoryFilter = new ArrayList<>();
}
