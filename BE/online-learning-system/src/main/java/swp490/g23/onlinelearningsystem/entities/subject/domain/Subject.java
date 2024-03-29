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
import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.enums.Status;

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

    @Column(name="subject_code",unique = true,nullable = false)
    private String subjectCode;

    @Column
    private String subjectName;

    @Column
    private Status subjectStatus;

    @Column(columnDefinition="TEXT")
    private String body;

    @ManyToOne
	@JoinColumn(name = "manager_id")
	private User manager;

    @ManyToOne
	@JoinColumn(name = "expert_id")
	private User expert;

    @OneToMany(mappedBy = "forSubject")
    private List<Assignment> assignments;

    @OneToMany(mappedBy = "subject")
	private List<Classes> classes;

    @OneToMany(mappedBy = "subject")
    private List<SubjectSetting> settings ;


    public Subject(String subjectCode, String subjectName, Status subjectStatus, User manager) {
        this.subjectCode = subjectCode;
        this.subjectName = subjectName;
        this.subjectStatus = subjectStatus;
        this.manager = manager;
    }



  
}
