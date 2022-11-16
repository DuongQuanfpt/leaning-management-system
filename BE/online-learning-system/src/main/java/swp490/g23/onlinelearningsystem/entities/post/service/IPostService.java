package swp490.g23.onlinelearningsystem.entities.post.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostResponseDTO;

public interface IPostService {
    ResponseEntity<PostPaginateDTO> getPostList(int limit, int page, String keyword, Long categoryId, boolean isNotice , Long topViews);
    ResponseEntity<PostResponseDTO> viewPost( Long postId);
}
