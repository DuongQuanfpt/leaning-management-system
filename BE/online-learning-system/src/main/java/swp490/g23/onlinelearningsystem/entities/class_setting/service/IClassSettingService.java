package swp490.g23.onlinelearningsystem.entities.class_setting.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.class_setting.domain.filter.ClassSettingFilter;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.request.ClassSettingRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.response.ClassSettingPaginate;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.response.ClassSettingResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface IClassSettingService {
    ResponseEntity<ClassSettingPaginate> getClassSetting(int limit, int page,String keyword, String filterStatus,
    String filterClass, String filterType ,User user);

    ResponseEntity<ClassSettingResponseDTO> viewClassSetting(Long id);
    ResponseEntity<ClassSettingFilter> getClassSettingFilter();
    ResponseEntity<String> addClassSetting(ClassSettingRequestDTO requestDTO );
    ResponseEntity<String> editClassSetting(Long id , ClassSettingRequestDTO requestDTO );
    
}
