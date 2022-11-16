package swp490.g23.onlinelearningsystem.entities.post.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.post.domain.Post;
import swp490.g23.onlinelearningsystem.entities.post.repositories.criteria_entity.PostQuery;

@Repository
@RequiredArgsConstructor
public class PostCriteria {
    private final EntityManager em;

    public PostQuery searchFilterPost(String keyword, Long categoryId,  boolean isNotice) {

        StringBuilder query = new StringBuilder(
                "SELECT p FROM Post p WHERE 1=1");

        if (keyword != null) {
            query.append(" AND (p.postTitle LIKE '%" + keyword + "%' OR p.excerpt LIKE '%" + keyword + "%')");
        }

        if (categoryId != null) {
            query.append(" AND p.category.settingId = '" + categoryId + "'");
        }

        if (isNotice == false) {
            query.append(" AND p.category IS NOT NULL");
        } else {
            query.append(" AND p.category IS NULL");
        }

        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT p", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Post> typedQuery = em.createQuery(query.toString(), Post.class);
        System.out.println(query.toString());
        PostQuery result = new PostQuery(typedQuery, countQuery);
        return result;
    }
}
