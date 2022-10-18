package swp490.g23.onlinelearningsystem.entities.subject_setting.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Entity
@Table(name = "subject_setting")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectSetting extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectSettingId;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Setting type;

    @Column
    private String settingTitle;

    @Column
    private String settingValue;

    @Column
    private Status status;

    @Column
    private String description;

    @Column
    private String displayOrder;



}
