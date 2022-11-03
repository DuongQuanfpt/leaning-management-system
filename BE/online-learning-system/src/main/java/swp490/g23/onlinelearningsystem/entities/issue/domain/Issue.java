package swp490.g23.onlinelearningsystem.entities.issue.domain;

import java.time.LocalDate;
import java.util.ArrayList;
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
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Entity
@Table(name = "issue_tbl")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Issue extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long issueId;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Classes classes;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne
    @JoinColumn(name = "milestone_id")
    private Milestone milestone;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private ClassSetting type;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private ClassSetting status;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "asignee_id")
    private User asignee;

    @ManyToOne
    @JoinColumn(name = "requirement_id")
    private Issue requirement;

    @OneToMany(mappedBy = "requirement")
    private List<Issue> issueOfRequirement = new ArrayList<>();


    @Column
    private String title;

    @Column
    private String description;

    @Column
    private boolean isClosed;

    @Column
    private LocalDate deadline;
}
