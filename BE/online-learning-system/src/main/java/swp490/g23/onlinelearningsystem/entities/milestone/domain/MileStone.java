package swp490.g23.onlinelearningsystem.entities.milestone.domain;

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
@Table(name = "milestone")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Milestone  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

}
