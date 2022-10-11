package swp490.g23.onlinelearningsystem.entities.classes.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.classes.domain.filter.ClassFilterDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.request.ClassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.response.ClassResponseDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.response.ClassResponsePaginateDTO;

public interface IClassService {
    ResponseEntity<ClassResponsePaginateDTO> displayClasses(int limit, int currentPage,  String keyword, String filterTerm, String filterTrainer,
                                                            String filterSupporter, String filterBranch, String filterStatus);
    ResponseEntity<ClassResponseDTO> viewClass(long id);
    ResponseEntity<String> updateClass(ClassRequestDTO dto , Long id);
    ResponseEntity<String> updateStatus(Long id);
    ResponseEntity<ClassFilterDTO> getFilter();
    ResponseEntity<String> addClass(ClassRequestDTO requestDTO);
}
