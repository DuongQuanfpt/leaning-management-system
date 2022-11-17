package swp490.g23.onlinelearningsystem.entities.post.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.post.domain.Post;

public interface PostRepository extends JpaRepository<Post,Long> {
    @Query("SELECT p FROM Post p ORDER BY p.viewCount DESC")
    List<Post> getTopViewPost(Pageable pageable);
}
