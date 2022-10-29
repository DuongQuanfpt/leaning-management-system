package swp490.g23.onlinelearningsystem.entities.class_setting.domain;

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
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Entity
@Table(name = "class_setting")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassSetting extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classSettingId;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Classes classes;

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

    @OneToMany(mappedBy = "classSetting")
    private List<Schedule> schedules;
}
