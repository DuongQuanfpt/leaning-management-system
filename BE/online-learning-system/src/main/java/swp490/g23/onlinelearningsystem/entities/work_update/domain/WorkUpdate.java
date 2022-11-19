package swp490.g23.onlinelearningsystem.entities.work_update.domain;

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

@Entity
@Table(name = "work_update_tbl")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workUpdateId;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String submitFileUrl;
}
