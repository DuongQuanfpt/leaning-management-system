package swp490.g23.onlinelearningsystem.entities.classes.domain;

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
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.enums.ClassStatus;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Class")
public class Classes extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classId;

    @Column(name = "code", unique = true, nullable = false)
    private String code;

    @Column
    private ClassStatus status;

    @Column(columnDefinition="TEXT")
    private String description;

    @ManyToOne
    private Setting settingTerm;

    @ManyToOne
    private Setting settingBranch;

    @ManyToOne
    private User userTrainer;

    @ManyToOne
    private User userSupporter;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @OneToMany(mappedBy = "classes")
    private List<ClassSetting> types;

    @OneToMany(mappedBy = "classes")
    private List<ClassUser> classUsers;

    @OneToMany(mappedBy = "classes")
    private List<Milestone> milestones;

    @OneToMany(mappedBy = "classes")
    private List<Group> groups;

    @OneToMany(mappedBy = "classes")
    private List<Schedule> schedules;

    @OneToMany(mappedBy = "classes")
    private List<Issue> issues;

}
