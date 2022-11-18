package swp490.g23.onlinelearningsystem.entities.work_eval.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.repositories.SubmitWorkRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.EvalResponseDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.EvalSettingDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.service.IWorkEvalService;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class WorkEvalService implements IWorkEvalService {
    @Autowired
    private SubmitWorkRepository workRepository;

    @Override
    public ResponseEntity<EvalResponseDTO> getWorkEval(User user, Long submitId, Long workId) {

        // Submit submit = submitRepository.findById(submitId)
        //         .orElseThrow(() -> new CustomException("submit doesnt exist"));

        // Issue requirement = issueRepository.findById(workId)
        //         .orElseThrow(() -> new CustomException("requirement doesnt exist"));

        SubmitWork submitWork = workRepository.getBySubmitAndWork(submitId, workId);
        if(submitWork == null) {
            throw new CustomException("submit work doesnt exist");
        }

        EvalResponseDTO responseDTO = new EvalResponseDTO();

        if(submitWork.getSubmit().getGroup() != null) {
            responseDTO.setGroupName(submitWork.getSubmit().getGroup().getGroupCode());
        }

        if(submitWork.getWork().getDescription() != null) {
            responseDTO.setFunctionDescription(submitWork.getWork().getDescription());
        }

        List<EvalSettingDTO> complexityDtos = new ArrayList<>();
        List<EvalSettingDTO> qualityDtos = new ArrayList<>();
        for (SubjectSetting setting  : submitWork.getSubmit().getMilestone().getAssignment().getForSubject().getSettings()) {
            if(setting.getType().getSettingValue().equals("TYPE_COMPLEXITY")){
                complexityDtos.add(null);
            }

            if(setting.getType().getSettingValue().equals("TYPE_QUALITY")){
                qualityDtos.add(null);
            }
        }
       
        if(!submitWork.getWorkEvals().isEmpty()){
            WorkEval workEval = submitWork.getWorkEvals().get(0);
            responseDTO.setCurrentComplexity(toSettingDTO(workEval.getComplexity()));
            responseDTO.setCurrentComplexity(toSettingDTO(workEval.getQuality()));
            responseDTO.setWorkPoint(workEval.getWorkEval());
        }

        responseDTO.setTraineeName(submitWork.getSubmit().getClassUser().getUser().getAccountName());
        responseDTO.setMilestoneName(submitWork.getSubmit().getMilestone().getTitle());
        responseDTO.setFunctionName(submitWork.getWork().getTitle());
        responseDTO.setComplexityFilter(complexityDtos);
        responseDTO.setQualityFilter(qualityDtos);

        return ResponseEntity.ok(responseDTO);
    }

    private EvalSettingDTO toSettingDTO(SubjectSetting subjectSetting){
        EvalSettingDTO evalSettingDTO = new EvalSettingDTO();
        evalSettingDTO.setTitle(subjectSetting.getSettingTitle());
        evalSettingDTO.setId(subjectSetting.getSubjectSettingId());
        return evalSettingDTO;
    }

}
