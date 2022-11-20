package swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum;

@Repository
@RequiredArgsConstructor
public class SubmitDetailCriteria {
    private final EntityManager em;

    public TypedQuery<SubmitWork> getSubmitWorks(String keyword, String filterAssignee, Long statusValue,
            String classCode, Long groupId, Long milestoneId) {

        StringBuilder query = new StringBuilder(
                "SELECT s FROM SubmitWork s WHERE s.submit.classUser.classes.code = '"
                        + classCode + "' AND s.submit.group.groupId = '" + groupId + "' AND s.milestone.milestoneId = '"
                        + milestoneId + "' AND s.submit.classUser.classes IS NOT NULL");

        if (keyword != null) {
            query.append(" AND (s.work.title LIKE '%" + keyword + "%')");
        }

        if (statusValue != null) {
            SubmitWorkStatusEnum status = SubmitWorkStatusEnum.fromInt(statusValue.intValue());
            if (status == SubmitWorkStatusEnum.Evaluated) {
                query.append(
                        " AND s.status = swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum.Evaluated ");
            }

            if (status == SubmitWorkStatusEnum.Rejected) {
                query.append(
                        " AND s.status = swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum.Rejected ");
            }

            if (status == SubmitWorkStatusEnum.Submitted) {
                query.append(" AND s.status IS NULL");
            }
        }

        if (filterAssignee != null) {
            query.append(" AND s.submit.classUser.user.accountName = '" + filterAssignee + "'");

        }

        query.append(" ORDER BY s.submit.submitId ASC");
        TypedQuery<SubmitWork> typedQuery = em.createQuery(query.toString(), SubmitWork.class);
        System.out.println(query.toString());
        return typedQuery;
    }
}
