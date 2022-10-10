package swp490.g23.onlinelearningsystem.entities.class_subject.domain;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassSubject {

    @EmbeddedId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private ClassSubjectKey id = new ClassSubjectKey(); 

    @ManyToOne
    @MapsId("subjectId")
    @JoinColumn(name = "subject_Id")
    private Subject subject;

    @ManyToOne
    @MapsId("classId")
    @JoinColumn(name = "class_Id")
    private Classes classes;
}
