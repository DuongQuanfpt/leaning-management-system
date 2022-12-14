package swp490.g23.onlinelearningsystem.entities.classes.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.class_subject.domain.ClassSubject;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.ClassStatus;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Class")
public class Classes extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classId;

    @Column
    private String code;

    @Column
    private ClassStatus status;

    @Column
    private String description;

    @ManyToOne
    private Setting settingTerm;

    @ManyToOne
    private Setting settingBranch;

    @ManyToOne
    private User userTrainer;

    @ManyToOne
    private User userSupporter;

    @OneToMany(mappedBy = "classes")
    private List<ClassUser> classUsers;

    @OneToMany(mappedBy = "subject")
    private List<ClassSubject> classSubject;

    

}
