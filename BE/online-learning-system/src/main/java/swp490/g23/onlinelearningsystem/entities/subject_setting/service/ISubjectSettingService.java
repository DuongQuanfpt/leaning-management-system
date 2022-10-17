package swp490.g23.onlinelearningsystem.entities.subject_setting.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response.SubjectSettingPaginate;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface ISubjectSettingService {
    ResponseEntity<SubjectSettingPaginate> getSubjectSetting(int limit, int page,String keyword, String filterStatus,
            String filterSubject, String filterType ,User user);

}
