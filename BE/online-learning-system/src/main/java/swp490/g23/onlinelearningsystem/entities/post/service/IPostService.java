package swp490.g23.onlinelearningsystem.entities.post.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.post.domain.request.PostRequestDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostCategoryDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface IPostService {
    ResponseEntity<PostPaginateDTO> getPostList(int limit, int page, String keyword, Long categoryId, boolean isNotice , Long topViews);
    ResponseEntity<PostResponseDTO> viewPost( Long postId);
    ResponseEntity< List<PostCategoryDTO>> uploadFilter();
    ResponseEntity<String> uploadPost( PostRequestDTO requestDTO , User user);
    ResponseEntity<String> editPost( PostRequestDTO requestDTO , User user ,Long postId);
}
