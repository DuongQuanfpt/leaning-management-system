package swp490.g23.onlinelearningsystem.entities.class_subject.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.class_subject.domain.ClassSubject;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;

public interface ClassSubjectRepositories extends JpaRepository<ClassSubject, Long>{
    
    List<ClassSubject> findByClasses(Classes classes);
}
