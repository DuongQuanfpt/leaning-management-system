package swp490.g23.onlinelearningsystem.entities.eval_criteria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.eval_criteria.service.impl.EvalCriteriaService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class ClassCriteriaController {

    @Autowired
    private EvalCriteriaService criteriaService;

}
