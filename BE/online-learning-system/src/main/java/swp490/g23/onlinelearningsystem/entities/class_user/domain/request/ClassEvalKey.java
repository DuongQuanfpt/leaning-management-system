package swp490.g23.onlinelearningsystem.entities.class_user.domain.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClassEvalKey {
    private Long assignmentId;

    private String accountName;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((assignmentId == null) ? 0 : assignmentId.hashCode());
        result = prime * result + ((accountName == null) ? 0 : accountName.hashCode());
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
        ClassEvalKey other = (ClassEvalKey) obj;
        if (assignmentId == null) {
            if (other.assignmentId != null)
                return false;
        } else if (!assignmentId.equals(other.assignmentId))
            return false;
        if (accountName == null) {
            if (other.accountName != null)
                return false;
        } else if (!accountName.equals(other.accountName))
            return false;
        return true;
    }

}
