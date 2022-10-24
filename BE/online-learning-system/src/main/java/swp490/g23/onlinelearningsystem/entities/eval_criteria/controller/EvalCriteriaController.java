package swp490.g23.onlinelearningsystem.entities.eval_criteria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.filter.CriteriaFilterDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.request.CriteriaRequestDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response.CriteriaPaginateResponseDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response.CriteriaResponseDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.service.impl.EvalCriteriaService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class EvalCriteriaController {

    @Autowired
    private EvalCriteriaService criteriaService;

    @GetMapping(value = "/criteria")
    public ResponseEntity<CriteriaPaginateResponseDTO> getAssignment(
            @RequestParam(name = "page", required = false) String currentPage,
            @RequestParam(name = "limit", required = false) String requestLimit,
            @RequestParam(name = "q", required = false) String keyword,
            @RequestParam(name = "filterStatus", required = false) String statusFilter,
            @RequestParam(name = "filterAssignment", required = false) String assignmentFilter) {

        int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
        int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);

        return criteriaService.getCriteria(limit, page, keyword, statusFilter, assignmentFilter);
    }

    @GetMapping(value = "/criteria-detail/{id}")
    public ResponseEntity<CriteriaResponseDTO> viewCriteria(@PathVariable("id") Long id) {
        return criteriaService.viewCriteria(id);
    }

    @PostMapping(value = "/criteria-add")
    public ResponseEntity<String> addAssignment(@RequestBody CriteriaRequestDTO dto) {
        return criteriaService.addCriteria(dto);
    }

    @PutMapping(value = "/criteria-status/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable("id") Long id) {
        return criteriaService.updateStatus(id);
    }

    @PutMapping(value = "/criteria-detail/{id}")
    public ResponseEntity<String> updateAssignment(@PathVariable("id") Long id, @RequestBody CriteriaRequestDTO dto) {
        return criteriaService.updateCriteria(id, dto);
    }

    @GetMapping(value = "/criteria-filter")
    public ResponseEntity<CriteriaFilterDTO> getCriteriaFilter() {

        return criteriaService.getFilter();
    }
}
