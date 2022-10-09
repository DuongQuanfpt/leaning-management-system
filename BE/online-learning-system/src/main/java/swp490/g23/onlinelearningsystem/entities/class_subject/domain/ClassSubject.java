package swp490.g23.onlinelearningsystem.entities.class_subject.domain;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
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
    private ClassSubjectKey id;

    @ManyToOne
    @MapsId("subjectId")
    @JoinColumn(name = "user_Id")
    private Subject subject;

    @ManyToOne
    @MapsId("classId")
    @JoinColumn(name = "class_Id")
    private Classes classes;
}
