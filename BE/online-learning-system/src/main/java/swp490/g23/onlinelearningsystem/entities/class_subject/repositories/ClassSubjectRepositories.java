package swp490.g23.onlinelearningsystem.entities.class_subject.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import swp490.g23.onlinelearningsystem.entities.class_subject.domain.ClassSubject;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;

public interface ClassSubjectRepositories extends JpaRepository<ClassSubject, Long>{
    
    List<ClassSubject> findByClasses(Classes classes);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM ClassSubject c WHERE c.classes = :clazz")
    void deleteByClass (Classes clazz);
}
