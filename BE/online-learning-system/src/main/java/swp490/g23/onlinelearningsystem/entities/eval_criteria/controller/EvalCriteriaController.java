package swp490.g23.onlinelearningsystem.entities.eval_criteria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.eval_criteria.service.impl.EvalCriteriaService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class EvalCriteriaController {

    @Autowired
    private EvalCriteriaService criteriaService;

    @PutMapping(value = "/criteria-status/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable("id") Long id) {
        return criteriaService.updateStatus(id);
    }

}
