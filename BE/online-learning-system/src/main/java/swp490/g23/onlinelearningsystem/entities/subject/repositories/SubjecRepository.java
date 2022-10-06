package swp490.g23.onlinelearningsystem.entities.subject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;

public interface SubjecRepository extends JpaRepository<Subject, Long>{
    Subject findBySubjectCode(String subjectCode);
}
