package swp490.g23.onlinelearningsystem.entities.subject.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface SubjecRepository extends JpaRepository<Subject, Long> {
    Subject findBySubjectCode(String subjectCode);

    @Query(value = "SELECT s FROM Subject s WHERE s.subjectCode IN :subjects")
    List<Subject> getSubjectsBySubjects(List<String> subjects);

    @Query(value = "SELECT s FROM Subject s WHERE s.manager IS NOT NULL AND s.expert IS NOT NULL")
    List<Subject> getSubjectManagerExpert();

    @Query(value = "SELECT s FROM Subject s WHERE s.subjectStatus = '1'")
    List<Subject> findSubjectActive();

    @Query(value = "SELECT DISTINCT s FROM Subject s JOIN s.classes as c WHERE (c.userTrainer = :user OR c.userSupporter = :user OR s.manager = :user) AND s.subjectStatus = '1' ")
    List<Subject> findSubjectOfUser(User user);

    @Query(value = "SELECT  s FROM Subject s WHERE s.manager = :user AND s.subjectStatus = '1' ")
    List<Subject> findSubjectOfManager(User user);

}
