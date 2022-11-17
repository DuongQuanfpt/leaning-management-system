package swp490.g23.onlinelearningsystem.entities.post.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.post.domain.request.PostRequestDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostCategoryDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostResponseDTO;
import swp490.g23.onlinelearningsystem.entities.post.service.impl.PostService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping(value = "/post")
    public ResponseEntity<PostPaginateDTO> displayPost(
            @RequestParam(name = "page", required = false) String currentPage,
            @RequestParam(name = "limit", required = false) String requestLimit,
            @RequestParam(name = "q", required = false) String keyword,
            @RequestParam(name = "categoryId", required = false) Long categoryFilter,
            @RequestParam(name = "isNotice", required = false) boolean isNotice,
            @RequestParam(name = "topView", required = false) Long topView) {

        int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
        int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
        return postService.getPostList(limit, page, keyword, categoryFilter, isNotice, topView);
    }

    @GetMapping(value = "/post-upload-filter")
    public ResponseEntity< List<PostCategoryDTO>> viewPost() {
        return postService.uploadFilter();
    }

    @GetMapping(value = "/post-view/{postId}")
    public ResponseEntity<PostResponseDTO> viewPost(@PathVariable("postId") Long postId) {
        return postService.viewPost(postId);
    }

    @PutMapping(value = "/post-view/{postId}")
    public ResponseEntity<String> editPost(@PathVariable("postId") Long postId,
            @RequestBody PostRequestDTO requestDTO,
            @AuthenticationPrincipal User user) {
        return postService.editPost(requestDTO, user, postId);
    }

    @PostMapping(value = "/post-upload")
    public ResponseEntity<String> addPost(@RequestBody PostRequestDTO requestDTO,
            @AuthenticationPrincipal User user) {
        return postService.uploadPost(requestDTO, user);
    }
}
