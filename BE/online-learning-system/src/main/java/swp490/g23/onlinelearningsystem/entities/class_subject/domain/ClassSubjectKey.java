package swp490.g23.onlinelearningsystem.entities.class_subject.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassSubjectKey implements Serializable{
    
    @Column(name = "class_id")
    private Long classId;

    @Column(name = "subject_id")
    private Long subjectId;
}
