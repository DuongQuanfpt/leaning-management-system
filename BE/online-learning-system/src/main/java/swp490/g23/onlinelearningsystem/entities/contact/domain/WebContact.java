package swp490.g23.onlinelearningsystem.entities.contact.domain;

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
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.ContactStatus;

@Entity
@Table(name = "web_contact")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WebContact extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contactId;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private User staff;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Setting category;

    @Column
    private String fullName;

    @Column(name = "email", length = 40)
    private String email;

    @Column
    private String mobile;

    @Column(columnDefinition="TEXT")
    private String message;

    @Column
    private String response;

    @Column
    private ContactStatus status;
}
