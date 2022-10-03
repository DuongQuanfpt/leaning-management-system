package swp490.g23.onlinelearningsystem.entities.subject.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.subject.domain.request.SubjectRequestDTO;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.SubjecRepository;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponseDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.subject.service.ISubjectService;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoSubjectException;
import swp490.g23.onlinelearningsystem.util.EnumEntity.StatusEnum;

@Service
public class SubjectService implements ISubjectService {

    @Autowired
    private SubjecRepository subjecRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<SubjectResponsePaginateDTO> getSubject(int limit, int page) {
        List<Subject> subjects = new ArrayList<>();
        if (limit == 0) {
            subjects = subjecRepository.findAll();
        } else {
            Pageable pageable = PageRequest.of(page - 1, limit);
            subjects = subjecRepository.findAll(pageable).getContent();
        }

        List<SubjectResponseDTO> result = new ArrayList<>();

        for (Subject setting : subjects) {
            result.add(toDTO(setting));
        }

        SubjectResponsePaginateDTO responseDTO = new SubjectResponsePaginateDTO();
        responseDTO.setPage(page);
        responseDTO.setListResult(result);
        if (limit == 0) {
            responseDTO.setTotalPage(0);
        } else {
            responseDTO.setTotalPage((int) Math.ceil((double) subjecRepository.count() / limit));
        }

        responseDTO.setTotalItem(subjecRepository.count());
        return ResponseEntity.ok(responseDTO);

    }

    @Override
    public ResponseEntity<SubjectResponseDTO> getSubjectDetail(Long id) {
        Subject subject = subjecRepository.findById(id).get();
        if (subject == null) {
            throw new NoSubjectException();
        }
        return ResponseEntity.ok(toDTO(subject));
    }

    @Override
    public ResponseEntity<String> editSubject(Long id, SubjectRequestDTO dto) {
        Subject subject = subjecRepository.findById(id).get();
        if (subject == null) {
            throw new NoSubjectException();
        }
        subject.setSubjectCode(dto.getSubjectCode());
        subject.setSubjectName(dto.getSubjectName());

        if (dto.getSubjectStatus().equalsIgnoreCase("ACTIVE")) {
            subject.setSubjectStatus(StatusEnum.ACTIVE);
        } else {
            subject.setSubjectStatus(StatusEnum.INACTIVE);
        }

        if (userRepository.findActiveUserByEmail(dto.getManagerEmail()) == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There are no manager with that email");
        }
        subject.setManager(userRepository.findActiveUserByEmail(dto.getManagerEmail()));

        if (userRepository.findActiveUserByEmail(dto.getExpertEmail()) == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There are no expert with that email");
        }
        subject.setExpert(userRepository.findActiveUserByEmail(dto.getExpertEmail()));
        subjecRepository.save(subject);
        return ResponseEntity.ok("Update Success");
    }

    public SubjectResponseDTO toDTO(Subject entity) {
        SubjectResponseDTO responseDTO = new SubjectResponseDTO();

        responseDTO.setSubjectId(entity.getSubjectId());
        responseDTO.setSubjectCode(entity.getSubjectCode());
        responseDTO.setSubjectName(entity.getSubjectName());
        if (entity.getExpert() != null) {
            responseDTO.setExpertEmail(entity.getExpert().getEmail());
        }

        if (entity.getManager() != null) {
            responseDTO.setManagerEmail(entity.getManager().getEmail());
        }

        responseDTO.setSubjectStatus(entity.getSubjectStatus());
        responseDTO.setBody(entity.getBody());

        return responseDTO;
    }

    @Override
    public ResponseEntity<String> editSubjectStatus(Long id) {
        Subject subject = subjecRepository.findById(id).get();
        if (subject.getSubjectStatus() == StatusEnum.ACTIVE) {
            subject.setSubjectStatus(StatusEnum.INACTIVE);
        } else {
            subject.setSubjectStatus(StatusEnum.ACTIVE);
        }
        subjecRepository.save(subject);
        return ResponseEntity.ok(" Status update success");
    }

}
