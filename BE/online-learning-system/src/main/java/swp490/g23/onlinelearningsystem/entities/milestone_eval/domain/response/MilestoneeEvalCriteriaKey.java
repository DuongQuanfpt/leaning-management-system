package swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneeEvalCriteriaKey {
       private Long submitId;
       private Long criteriaId;
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((submitId == null) ? 0 : submitId.hashCode());
        result = prime * result + ((criteriaId == null) ? 0 : criteriaId.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        MilestoneeEvalCriteriaKey other = (MilestoneeEvalCriteriaKey) obj;
        if (submitId == null) {
            if (other.submitId != null)
                return false;
        } else if (!submitId.equals(other.submitId))
            return false;
        if (criteriaId == null) {
            if (other.criteriaId != null)
                return false;
        } else if (!criteriaId.equals(other.criteriaId))
            return false;
        return true;
    }
       
    


}
