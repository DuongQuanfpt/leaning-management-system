package swp490.g23.onlinelearningsystem.entities.packages.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Package {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long classId;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private Long listPrice;

    @Column
    private Long discountRate;

    @ManyToOne
    private Subject subject;

}
