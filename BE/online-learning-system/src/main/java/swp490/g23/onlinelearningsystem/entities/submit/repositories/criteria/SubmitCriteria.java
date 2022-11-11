package swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria_entity.SubmitQuery;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Repository
@RequiredArgsConstructor
public class SubmitCriteria {
    private final EntityManager em;

    @Autowired
    private MilestoneRepository milestoneRepository;

    public SubmitQuery searchFilterSubmit(String keyword, String statusValue, Long milestoneId,
            Long groupId, Long assignmentId, User user, String classCode) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder(
                "SELECT s FROM Submit s LEFT JOIN s.group.groupMembers as m WHERE s.classUser.classes.code = '"
                        + classCode + "' AND (m.member = s.classUser.user OR s.group IS NULL)");

        // StringBuilder query = new StringBuilder(
        //         "SELECT s FROM Submit s  WHERE s.classUser.classes.code = '"+ classCode + "'");

        // if (roles.contains("ROLE_ADMIN")) {

        // } else if (roles.contains("ROLE_MANAGER")) {
        // query.append(" AND s.manager.accountName = '" + user.getAccountName() + "'
        // ");
        // }

        // if (keyword != null) {
        // query.append(" AND (s.subjectName LIKE '%" + keyword + "%' OR s.subjectCode
        // LIKE '%" + keyword + "%')");
        // }

        if (milestoneId != null) {
            Milestone milestone = milestoneRepository.findById(milestoneId)
                    .orElseThrow(() -> new CustomException("current user setting doesnt exist"));
            if (milestone.getAssignment().isTeamWork() == false) {
                query.append(" AND s.milestone.milestoneId = '" + milestoneId + "'");
            } else {
                query.append(" AND s.milestone.milestoneId = '" + milestoneId + "' AND m.isLeader = 1");
            }

        }

     
        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT s", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Submit> typedQuery = em.createQuery(query.toString(), Submit.class);
        System.out.println(query.toString());
        SubmitQuery result = new SubmitQuery(typedQuery, countQuery);
        return result;
    }
}
