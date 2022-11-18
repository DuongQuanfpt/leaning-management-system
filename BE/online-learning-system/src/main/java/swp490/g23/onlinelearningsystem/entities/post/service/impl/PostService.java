package swp490.g23.onlinelearningsystem.entities.post.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.post.domain.Post;
import swp490.g23.onlinelearningsystem.entities.post.domain.request.PostRequestDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostCategoryDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostResponseDTO;
import swp490.g23.onlinelearningsystem.entities.post.repositories.PostRepository;
import swp490.g23.onlinelearningsystem.entities.post.repositories.criteria.PostCriteria;
import swp490.g23.onlinelearningsystem.entities.post.repositories.criteria_entity.PostQuery;
import swp490.g23.onlinelearningsystem.entities.post.service.IPostService;
import swp490.g23.onlinelearningsystem.entities.s3amazon.service.impl.S3Service;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Service
public class PostService implements IPostService {

    @Autowired
    private PostCriteria postCriteria;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    private S3Service s3Service;

    @Override
    public ResponseEntity<PostPaginateDTO> getPostList(int limit, int page, String keyword, Long categoryId,
            boolean isNotice, Long topViews) {

        PostQuery result = postCriteria.searchFilterPost(keyword, categoryId, isNotice);
        TypedQuery<Post> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();
        // List<Post> posts = queryResult.getResultList();

        Long toltalItem = countQuery.getSingleResult();
        int totalPage;

        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) toltalItem / limit);
        } else {
            totalPage = 1;
        }

        List<PostResponseDTO> resultList = new ArrayList<>();
        for (Post post : queryResult.getResultList()) {
            resultList.add(toDTO(post));
        }

        List<PostCategoryDTO> categoryFilter = new ArrayList<>();
        List<Setting> list = settingRepositories.getPostCategory();
        for (Setting category : list) {
            categoryFilter.add(new PostCategoryDTO(category.getSettingId(), category.getSettingTitle()));
        }

        List<PostResponseDTO> topViewPosts = new ArrayList<>();
        if (topViews != null) {
            for (Post post : postRepository.getTopViewPost(PageRequest.of(0, topViews.intValue()))) {
                topViewPosts.add(toDTO(post));
            }
        }

        PostPaginateDTO paginateDTO = new PostPaginateDTO();
        paginateDTO.setPage(page);
        paginateDTO.setTotalItem(toltalItem);
        paginateDTO.setTotalPage(totalPage);
        paginateDTO.setListResult(resultList);
        paginateDTO.setTopView(topViewPosts);
        paginateDTO.setCategoryFilter(categoryFilter);

        return ResponseEntity.ok(paginateDTO);
    }

    private PostResponseDTO toDTO(Post post) {
        PostResponseDTO dto = new PostResponseDTO();
        dto.setPostId(post.getPostId());
        dto.setPostTitle(post.getPostTitle());
        dto.setAuthorId(post.getAuthor().getUserId());
        dto.setAuthorName(post.getAuthor().getAccountName());
        dto.setAuthorFullName(post.getAuthor().getFullName());
        dto.setAuthorMobile(post.getAuthor().getMobile());
        dto.setContent(post.getContent());
        dto.setLastUpdate(post.getModifiedDate().toString());
        if (post.getCategory() != null) {
            dto.setCategoryId(post.getCategory().getSettingId());
            dto.setCategoryName(post.getCategory().getSettingTitle());
        }
        // else {
        // dto.setCategoryId(0);
        // dto.setCategoryName("Notice");
        // }

        if (post.getExcerpt() != null) {
            dto.setExcerpt(post.getExcerpt());
        }

        if (post.getThumbnail_Url() != null) {
            dto.setThumbnail_Url(post.getThumbnail_Url());
        }

        dto.setStatus(post.getStatus().toString());
        dto.setViewCount(post.getViewCount());
        return dto;
    }

    @Override
    public ResponseEntity<PostResponseDTO> viewPost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new CustomException("post doesnt exist"));
        post.setViewCount(post.getViewCount() + 1);
        postRepository.save(post);
        return ResponseEntity.ok(toDTO(post));
    }

    @Override
    public ResponseEntity<String> uploadPost(PostRequestDTO requestDTO, User user) {
        User author = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new CustomException("user doesnt exist"));

        Post post = new Post();
        post.setAuthor(author);

        if (requestDTO.getCategoryId() != null) {
            Setting category = settingRepositories.findById(requestDTO.getCategoryId())
                    .orElseThrow(() -> new CustomException("category doesnt exist"));
            post.setCategory(category);
        }

        String thumbnailName = author.getAccountName() + "_" + UUID.randomUUID().toString();
        String thumbnailUrl = s3Service.saveThumbnail(requestDTO.getThumbnailBase64(), thumbnailName);
        post.setThumbnail_Url(thumbnailUrl);

        post.setPostTitle(requestDTO.getPostTitle());
        post.setExcerpt(requestDTO.getExcerpt());
        post.setContent(requestDTO.getContent());
        post.setViewCount((long) 0);
        post.setStatus(Status.Active);

        postRepository.save(post);
        return ResponseEntity.ok("Post uploaded");
    }

    @Override
    public ResponseEntity<String> editPost(PostRequestDTO requestDTO, User user, Long postId) {
        User author = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new CustomException("user doesnt exist"));

        Post post = postRepository.findById(postId).orElseThrow(() -> new CustomException("post doesnt exist"));

        if (requestDTO.getCategoryId() != null) {
            Setting category = settingRepositories.findById(requestDTO.getCategoryId())
                    .orElseThrow(() -> new CustomException("category doesnt exist"));
            post.setCategory(category);
        }

        if (post.getThumbnail_Url() != null && requestDTO.getThumbnailBase64() != null) {
            s3Service.deteleThumbnail(post.getThumbnail_Url());
            String thumbnailName = author.getAccountName() + "_" + UUID.randomUUID().toString();
            String thumbnailUrl = s3Service.saveThumbnail(requestDTO.getThumbnailBase64(), thumbnailName);
            post.setThumbnail_Url(thumbnailUrl);
        }

        post.setPostTitle(requestDTO.getPostTitle());
        post.setExcerpt(requestDTO.getExcerpt());
        post.setContent(requestDTO.getContent());

        postRepository.save(post);
        return ResponseEntity.ok("Post updated");
    }

    @Override
    public ResponseEntity< List<PostCategoryDTO>> uploadFilter() {
        List<PostCategoryDTO> categoryFilter = new ArrayList<>();
        List<Setting> list = settingRepositories.getPostCategory();
        for (Setting category : list) {
            categoryFilter.add(new PostCategoryDTO(category.getSettingId(), category.getSettingTitle()));
        }

        return ResponseEntity.ok(categoryFilter);
    }

}
