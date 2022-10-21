package swp490.g23.onlinelearningsystem.entities.subject_setting.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.filter.SubjectSettingFilter;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.request.SubjectSettingRequest;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response.SubjectSettingPaginate;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response.SubjectSettingResponse;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface ISubjectSettingService {
    ResponseEntity<SubjectSettingPaginate> getSubjectSetting(int limit, int page,String keyword, String filterStatus,
            String filterSubject, String filterType ,User user);
    ResponseEntity<SubjectSettingResponse> viewSubjectSetting(Long id);
    ResponseEntity<String> activateSubjectSetting(Long id);
    ResponseEntity<String> updateSubjectSetting(Long id , SubjectSettingRequest request);
    ResponseEntity<String> addSubjectSetting( SubjectSettingRequest request);
    ResponseEntity<SubjectSettingFilter> subjectSettingFilter();
}
