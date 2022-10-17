package swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.criteriaEntity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectSettingQuery {
    TypedQuery<SubjectSetting> resultQuery;
    TypedQuery<Long> countQuery;
}
