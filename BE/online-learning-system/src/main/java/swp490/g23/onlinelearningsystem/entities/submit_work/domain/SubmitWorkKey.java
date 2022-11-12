package swp490.g23.onlinelearningsystem.entities.submit_work.domain;
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;


@Embeddable
public class SubmitWorkKey implements Serializable {
    @Column(name = "work_id")
    Long issueId;

    @Column(name = "submit_id")
    Long submitId;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((issueId == null) ? 0 : issueId.hashCode());
        result = prime * result + ((submitId == null) ? 0 : submitId.hashCode());
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
        SubmitWorkKey other = (SubmitWorkKey) obj;
        if (issueId == null) {
            if (other.issueId != null)
                return false;
        } else if (!issueId.equals(other.issueId))
            return false;
        if (submitId == null) {
            if (other.submitId != null)
                return false;
        } else if (!submitId.equals(other.submitId))
            return false;
        return true;
    }

    public Long getIssueId() {
        return issueId;
    }

    public void setIssueId(Long issueId) {
        this.issueId = issueId;
    }

    public Long getSubmitId() {
        return submitId;
    }

    public void setSubmitId(Long submitId) {
        this.submitId = submitId;
    }

    
    
}
