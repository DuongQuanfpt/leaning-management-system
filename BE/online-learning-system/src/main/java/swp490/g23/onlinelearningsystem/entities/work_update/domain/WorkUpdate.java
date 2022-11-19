package swp490.g23.onlinelearningsystem.entities.work_update.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;

@Entity
@Table(name = "work_update_tbl")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkUpdate extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workUpdateId;

    @ManyToOne
    @JoinColumn(name = "milestone_id")
    private Milestone milestone;


    @Column
    private String title;

    @Column
    private String description;

    @Column
    private LocalDateTime updateDate;
}
