package swp490.g23.onlinelearningsystem.entities.contact.domain.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.contact.domain.filter.ContactCategoryFilter;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ContactStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactPaginateDTO {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<ContactResponseDTO> listResult = new ArrayList<>();
    private List<ContactStatusEntity> statusFilter = new ArrayList<>();
    private List<ContactCategoryFilter> contactFilter = new ArrayList<>();
    private List<String> suppFilter = new ArrayList<>();
}
