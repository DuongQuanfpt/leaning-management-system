package swp490.g23.onlinelearningsystem.entities.class_setting.repositories.criteriaEntity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassSettingQuery {
    TypedQuery<ClassSetting> resultQuery;
    TypedQuery<Long> countQuery;
}
