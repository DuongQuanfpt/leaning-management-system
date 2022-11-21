package swp490.g23.onlinelearningsystem.entities.work_update.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.repositories.SubmitWorkRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.WorkUpdate;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.request.WorkUpdateRequestDTo;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.response.WorkUpdateMilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.response.WorkUpdateResponseDTO;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.response.WorkUpdateWorkDTO;
import swp490.g23.onlinelearningsystem.entities.work_update.repositories.WorkUpdateRepository;
import swp490.g23.onlinelearningsystem.entities.work_update.service.IWorkUpdateService;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class WorkUpdateService implements IWorkUpdateService {

    @Autowired
    private SubmitWorkRepository submitWorkRepository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private WorkUpdateRepository updateRepository;

    @Override
    public ResponseEntity<WorkUpdateWorkDTO> getWorkUpdate(Long submitId, Long workId, User user) {
        SubmitWork submitWork = submitWorkRepository.getBySubmitAndWork(submitId, workId);
        if (submitWork == null) {
            throw new CustomException("submit work doesnt exist");
        }

        WorkUpdateWorkDTO workDTO = new WorkUpdateWorkDTO();
        workDTO.setWorkId(workId);
        workDTO.setWorkTitle(submitWork.getWork().getTitle());

        if (submitWork.getWorkEvals().isEmpty()) {
            throw new CustomException("requirement not evaluated");
        }
        WorkEval latestEval = new WorkEval();
        for (WorkEval eval : submitWork.getWorkEvals()) {
            if (latestEval.getCreatedDate() == null) {
                latestEval = eval;
            }

            if (latestEval.getCreatedDate().before(eval.getCreatedDate())) {
                latestEval = eval;
            }
        }
        workDTO.setMilestoneId(latestEval.getMilestone().getMilestoneId());
        workDTO.setMilestoneName(latestEval.getMilestone().getTitle());
        workDTO.setComments(latestEval.getComment());

        List<WorkUpdateResponseDTO> updateDTOs = new ArrayList<>();
        if (!submitWork.getSubmit().getUpdates().isEmpty()) {
            for (WorkUpdate update : submitWork.getSubmit().getUpdates()) {
                updateDTOs.add(toUpdateDTO(update));
            }
        }
        workDTO.setUpdateOfWork(updateDTOs);

        List<WorkUpdateMilestoneDTO> milestoneDTOs = new ArrayList<>();
        List<Milestone> milestones = new ArrayList<>();
        if (submitWork.getSubmit().getGroup() != null) {
            milestones = milestoneRepository.getByGroupInProgress(submitWork.getSubmit().getGroup().getGroupId());
        } else {
            milestones = milestoneRepository
                    .getByNoGroupAndClassCodeInProgress(submitWork.getSubmit().getClassUser().getClasses().getCode());
        }

        for (Milestone milestone : milestones) {
            milestoneDTOs.add(toMilestoneDTO(milestone));
        }
        workDTO.setMilestoneOfSubmit(milestoneDTOs);
        return ResponseEntity.ok(workDTO);
    }

    private WorkUpdateMilestoneDTO toMilestoneDTO(Milestone milestone) {
        WorkUpdateMilestoneDTO dto = new WorkUpdateMilestoneDTO();
        dto.setMilestoneId(milestone.getMilestoneId());
        dto.setMilestoneName(milestone.getTitle());
        return dto;
    }

    private WorkUpdateResponseDTO toUpdateDTO(WorkUpdate update) {
        WorkUpdateResponseDTO dto = new WorkUpdateResponseDTO();
        dto.setId(update.getWorkUpdateId());
        dto.setMilestoneId(update.getMilestone().getMilestoneId());
        dto.setMilestoneName(update.getMilestone().getTitle());
        dto.setTitle(update.getTitle());
        dto.setDescription(update.getDescription());
        dto.setUpdateDate(update.getUpdateDate().toString());
        return dto;
    }

    @Override
    public ResponseEntity<String> addWorkUpdate(Long submitId, Long workId, User user,
            WorkUpdateRequestDTo requestDTo) {
        SubmitWork submitWork = submitWorkRepository.getBySubmitAndWork(submitId, workId);
        if (submitWork == null) {
            throw new CustomException("submit work doesnt exist");
        }

        WorkUpdate update = new WorkUpdate();
        update.setRequirement(submitWork.getWork());
        update.setSubmit(submitWork.getSubmit());
        update.setTitle(requestDTo.getTitle());
        update.setDescription(requestDTo.getDescription());
        update.setUpdateDate(LocalDate.parse(requestDTo.getUpdateDate()));

        Milestone milestone = milestoneRepository.findById(requestDTo.getMilestoneId())
                .orElseThrow(() -> new CustomException("submit doesnt exist"));
        update.setMilestone(milestone);

        updateRepository.save(update);
        return ResponseEntity.ok("update added");
    }

    @Override
    public ResponseEntity<String> editWorkUpdate(Long updateId, User user,
            WorkUpdateRequestDTo requestDTo) {
        WorkUpdate update = updateRepository.findById(updateId)
                .orElseThrow(() -> new CustomException("submit doesnt exist"));
        if (requestDTo.getTitle() != null) {
            update.setTitle(requestDTo.getTitle());
        }

        if (requestDTo.getDescription() != null) {
            update.setDescription(requestDTo.getDescription());
        }

        if (requestDTo.getUpdateDate() != null) {
            update.setUpdateDate(LocalDate.parse(requestDTo.getUpdateDate()));
        }

        if (requestDTo.getMilestoneId() != null) {
            Milestone milestone = milestoneRepository.findById(requestDTo.getMilestoneId())
                    .orElseThrow(() -> new CustomException("submit doesnt exist"));
            update.setMilestone(milestone);
        }
        updateRepository.save(update);
        return ResponseEntity.ok("update added");
    }

}
