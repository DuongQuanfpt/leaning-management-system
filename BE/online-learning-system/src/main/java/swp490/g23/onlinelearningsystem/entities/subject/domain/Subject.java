package swp490.g23.onlinelearningsystem.entities.subject.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.class_subject.domain.ClassSubject;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Entity
@Table(name = "subject")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Subject extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectId;

    @Column(name="subject_code",unique = true)
    private String subjectCode;

    @Column
    private String subjectName;

    @Column
    private Status subjectStatus;

    @Column
    private String body;

    @ManyToOne
	@JoinColumn(name = "manager_id")
	private User manager;

    @ManyToOne
	@JoinColumn(name = "expert_id")
	private User expert;

    @OneToMany(mappedBy = "classes")
    private List<ClassSubject> classSubjects;

    public Subject(String subjectCode, String subjectName, Status subjectStatus, User manager) {
        this.subjectCode = subjectCode;
        this.subjectName = subjectName;
        this.subjectStatus = subjectStatus;
        this.manager = manager;
    }



  
}
