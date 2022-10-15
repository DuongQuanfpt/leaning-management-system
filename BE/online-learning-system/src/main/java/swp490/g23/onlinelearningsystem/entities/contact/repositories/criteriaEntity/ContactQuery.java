package swp490.g23.onlinelearningsystem.entities.contact.repositories.criteriaEntity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.contact.domain.WebContact;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactQuery {
    TypedQuery<WebContact> resultQuery;
    TypedQuery<Long> countQuery;

}
