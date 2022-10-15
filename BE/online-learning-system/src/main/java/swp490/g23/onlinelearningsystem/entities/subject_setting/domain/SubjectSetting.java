package swp490.g23.onlinelearningsystem.entities.subject_setting.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;

@Entity
@Table(name = "subject_setting")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectSettingId;

    @ManyToOne()
    @MapsId("screenId")
    @JoinColumn(name = "screen_id")
    private Subject screen;

    @ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    private Setting role;

}
