package swp490.g23.onlinelearningsystem.entities.class_user.domain;

import java.sql.Date;

import javax.persistence.Column;
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
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassUser {
    
    @EmbeddedId
    private ClassUserKey id;

    @Column
    private Status status;

    @Column
    private String note;

    @Column
    private Date dropoutDate;

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
}
