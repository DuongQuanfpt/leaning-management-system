package swp490.g23.onlinelearningsystem.entities.subject.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;

public interface SubjecRepository extends JpaRepository<Subject, Long>{
    Subject findBySubjectCode(String subjectCode);

    @Query(value = "SELECT s FROM Subject s WHERE s.subjectCode IN :subjects")
    List<Subject> getSubjectsBySubjects (List<String> subjects);
}
