package swp490.g23.onlinelearningsystem.entities.post.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.post.domain.Post;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostCategoryDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.post.domain.response.PostResponseDTO;
import swp490.g23.onlinelearningsystem.entities.post.repositories.PostRepository;
import swp490.g23.onlinelearningsystem.entities.post.repositories.criteria.PostCriteria;
import swp490.g23.onlinelearningsystem.entities.post.repositories.criteria_entity.PostQuery;
import swp490.g23.onlinelearningsystem.entities.post.service.IPostService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class PostService implements IPostService {

    @Autowired
    private PostCriteria postCriteria;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<PostPaginateDTO> getPostList(int limit, int page, String keyword, Long categoryId,
            boolean isNotice, Long topViews) {

        PostQuery result = postCriteria.searchFilterPost(keyword, categoryId ,isNotice);
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
        if(topViews != null){
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
        dto.setContent(post.getContent());

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

}
