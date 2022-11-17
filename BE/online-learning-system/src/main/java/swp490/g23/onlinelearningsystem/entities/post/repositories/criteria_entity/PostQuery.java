package swp490.g23.onlinelearningsystem.entities.post.repositories.criteria_entity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.post.domain.Post;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostQuery {
    TypedQuery<Post> resultQuery;
    TypedQuery<Long> countQuery;
}
