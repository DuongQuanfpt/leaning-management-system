package swp490.g23.onlinelearningsystem.entities.class_user.domain;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.Attendance;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassUser {

    @EmbeddedId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private ClassUserKey id = new ClassUserKey();

    @Column
    private TraineeStatus status;

    @Column
    private String note;

    @Column
    private LocalDate dropoutDate;

    @Column
    private String ongoingEval;

    @Column
    private String finalEval;

    @Column
    private String topicEval;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_Id")
    private User user;

    @ManyToOne
    @MapsId("classId")
    @JoinColumn(name = "class_Id")
    private Classes classes;

    @OneToMany(mappedBy = "classUser")
    private List<Submit> submits;

    @OneToMany(mappedBy = "classUser")
    private List<Attendance> attendances;
}
