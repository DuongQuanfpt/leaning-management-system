package swp490.g23.onlinelearningsystem.entities.post.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostResponseDTO;
import swp490.g23.onlinelearningsystem.entities.post.service.impl.PostService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

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
            @RequestParam(name = "topView", required = false) Long topView
            ) {

        int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
        int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
        return postService.getPostList(limit, page, keyword, categoryFilter , isNotice , topView);
    }

    @GetMapping(value = "/post-view/{postId}")
	public ResponseEntity<PostResponseDTO> viewPost(@PathVariable("postId") Long postId) {
		return postService.viewPost(postId);
	}

    @PostMapping(value = "/post-view/{postId}")
	public ResponseEntity<PostResponseDTO> addPost(@PathVariable("postId") Long postId) {
		return postService.viewPost(postId);
	}
}
