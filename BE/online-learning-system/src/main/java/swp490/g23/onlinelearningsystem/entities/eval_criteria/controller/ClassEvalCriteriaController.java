package swp490.g23.onlinelearningsystem.entities.eval_criteria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class ClassEvalCriteriaController {

    @Autowired
    private EvalCriteriaService criteriaService;

    @GetMapping(value = "/class-criteria")
    public ResponseEntity<CriteriaPaginateResponseDTO> getClassCriteria(
            @RequestParam(name = "page", required = false) String currentPage,
            @RequestParam(name = "limit", required = false) String requestLimit,
            @RequestParam(name = "q", required = false) String keyword,
            @RequestParam(name = "filterStatus", required = false) String statusFilter,
            @RequestParam(name = "filterMilestone", required = false) String milestoneFilter,
            @RequestParam(name = "filterClass", required = false) String classFilter,
            @AuthenticationPrincipal User user) {

        int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
        int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);

        return criteriaService.getClassCriteria(limit, page, keyword, statusFilter, milestoneFilter, classFilter,
                user.getUserId());
    }

    @GetMapping(value = "/class-criteria-detail/{id}")
    public ResponseEntity<CriteriaResponseDTO> viewClassCriteria(@PathVariable("id") Long id) {
        return criteriaService.viewClassCriteria(id);
    }

    @PostMapping(value = "/class-criteria-add")
    public ResponseEntity<String> addClassCriteria(@RequestBody CriteriaRequestDTO dto) {
        return criteriaService.addClassCriteria(dto);
    }

    @PutMapping(value = "/class-criteria-status/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable("id") Long id) {
        return criteriaService.updateClassCriteriaStatus(id);
    }

    @PutMapping(value = "/class-criteria-detail/{id}")
    public ResponseEntity<String> updateClassCriteria(@PathVariable("id") Long id,
            @RequestBody CriteriaRequestDTO dto) {
        return criteriaService.updateClassCriteria(id, dto);
    }

    @GetMapping(value = "/class-criteria-filter")
    public ResponseEntity<CriteriaFilterDTO> getCriteriaFilter() {

        return criteriaService.getFilter();
    }
}
