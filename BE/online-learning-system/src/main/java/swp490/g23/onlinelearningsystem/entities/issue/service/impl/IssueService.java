package swp490.g23.onlinelearningsystem.entities.issue.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;
import swp490.g23.onlinelearningsystem.entities.class_setting.repositories.ClassSettingRepository;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.ClassUserRepositories;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueFilter;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueFilterValue;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueAsigneeDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueGroupDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueListDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueMilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueResponseDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueSettingDto;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.IssueRepository;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.Criteria.IssueCriteria;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.CriteriaEntity.IssueQuery;
import swp490.g23.onlinelearningsystem.entities.issue.service.IIssueService;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class IssueService implements IIssueService {

    @Autowired
    private IssueCriteria issueCriteria;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private ClassSettingRepository classSettingRepository;

    @Autowired
    private ClassUserRepositories classUserRepositories;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private ClassRepositories classRepositories;

    @Override
    public ResponseEntity<IssueListDTO> getIssueList(int page, int limit, String keyword, Long filterStatus,
            Long filterMilestoneId, Long filterGroupId, String filterAsigneeName,
            Long filterTypeValue, String classCode, Long filterRequirementId) {
        Classes classes = classRepositories.findClassByCode(classCode);
        if (classes == null) {
            throw new CustomException("Class doesnt exist");
        }

        IssueQuery result = issueCriteria.searchFilterQuery(keyword, filterStatus, filterMilestoneId, filterGroupId,
                filterAsigneeName, filterTypeValue, filterRequirementId, classCode);
        TypedQuery<Issue> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        Long totalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        List<Issue> issues = queryResult.getResultList();
        List<IssueResponseDTO> issueResponseDTOs = new ArrayList<>();
        for (Issue issue : issues) {
            issueResponseDTOs.add(toDto(issue));
        }

        IssueListDTO dto = new IssueListDTO();
        dto.setPage(page);
        dto.setTotalItem(totalItem);
        dto.setTotalPage(totalPage);
        dto.setIssueList(issueResponseDTOs);
        return ResponseEntity.ok(dto);
    }

    public IssueGroupDTO toGroupDto(Group group) {
        IssueGroupDTO groupDTO = new IssueGroupDTO();
        groupDTO.setGroupId(group.getGroupId());
        groupDTO.setGroupName(group.getGroupCode());
        groupDTO.setGroupTopic(group.getTopicName());

        List<Long> groupIds = new ArrayList<>();
        for (GroupMember member : group.getGroupMembers()) {
            groupIds.add(member.getMember().getUserId());
        }
        groupDTO.setMemberId(groupIds);
        return groupDTO;
    }

    public IssueSettingDto toSettingDTO(ClassSetting setting) {
        IssueSettingDto dto = new IssueSettingDto();
        dto.setId(setting.getClassSettingId());
        dto.setTitle(setting.getSettingValue());
        return dto;
    }

    public IssueMilestoneDTO toMilestoneDto(Milestone milestone) {
        IssueMilestoneDTO dto = new IssueMilestoneDTO();
        dto.setAssignmentTitle(milestone.getAssignment().getTitle());
        dto.setMilestoneId(milestone.getMilestoneId());
        dto.setMilestoneTitle(milestone.getTitle());
        dto.setTeamwork(milestone.getAssignment().isTeamWork());

        List<Long> groupIds = new ArrayList<>();
        for (Submit submit : milestone.getSubmits()) {
            if (submit.getGroup() != null && !groupIds.contains(submit.getGroup().getGroupId())) {
                groupIds.add(submit.getGroup().getGroupId());
            }
        }

        dto.setGroupId(groupIds);
        return dto;
    }

    public IssueAsigneeDTO toAsigneeDTO(User user) {
        IssueAsigneeDTO asigneeDTO = new IssueAsigneeDTO();
        asigneeDTO.setTraineeId(user.getUserId());
        asigneeDTO.setUsername(user.getAccountName());
        return asigneeDTO;
    }

    public IssueResponseDTO toDto(Issue issue) {
        IssueResponseDTO dto = new IssueResponseDTO();
        dto.setIssueId(issue.getIssueId());
        dto.setTitle(issue.getTitle());
        dto.setClassCode(issue.getClasses().getCode());

        if (issue.getType() != null) {
            dto.setType(issue.getType().getSettingTitle());
        }

        if (issue.getRequirement() != null) {
            dto.setRequirement(issue.getRequirement().getTitle());
        }

        if (issue.getDescription() != null) {
            dto.setDescription(issue.getDescription());
        }

        if (issue.getAsignee() != null) {
            dto.setAsigneeName(issue.getAsignee().getAccountName());
        }

        if (issue.getDeadline() != null) {
            dto.setDeadline(issue.getDeadline().toString());
        }

        if (issue.getMilestone() != null) {
            dto.setMilestoneTitle(issue.getMilestone().getTitle());
        } else {
            dto.setMilestoneTitle("General");
        }

        if (issue.isClosed() != true) {
            if (issue.getStatus() != null) {
                dto.setStatus(issue.getStatus().getSettingTitle());
            } else {
                dto.setStatus("Open");
            }

        } else {
            dto.setStatus("Closed");
        }

        return dto;
    }

    @Override
    public ResponseEntity<IssueFilter> issueListFilter(String classCode) {
        IssueFilter filter = new IssueFilter();

        List<User> asignees = userRepository.getIssueAsigneeOfClass(classCode);
        List<String> asigneeFilter = new ArrayList<>();
        for (User user : asignees) {
            asigneeFilter.add(user.getAccountName());
        }

        List<Group> groups = groupRepository.getGroupOfIssueByClass(classCode);
        List<IssueGroupDTO> groupDTOs = new ArrayList<>();
        for (Group group : groups) {
            groupDTOs.add(toGroupDto(group));
        }

        List<Milestone> milestoneOfClass = milestoneRepository.getByIssueOfClassCode(classCode);
        List<IssueMilestoneDTO> dtos = new ArrayList<>();
        for (Milestone milestone : milestoneOfClass) {
            dtos.add(toMilestoneDto(milestone));
        }

        List<ClassSetting> typeAndStatusOfClass = classSettingRepository.getTypeAndStatusOfClass(classCode);
        List<IssueSettingDto> typeFilter = new ArrayList<>();
        List<IssueSettingDto> statusFilter = new ArrayList<>();
        for (ClassSetting setting : typeAndStatusOfClass) {
            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_STATUS")) {
                statusFilter.add(toSettingDTO(setting));
            }

            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_TYPE")) {
                typeFilter.add(toSettingDTO(setting));
            }
        }

        List<IssueFilterValue> requirementFilter = new ArrayList<>();
        List<Issue> requirementOfClass = issueRepository.getRequirementOfClass(classCode);
        for (Issue issue : requirementOfClass) {
            requirementFilter.add(new IssueFilterValue(issue.getTitle(), issue.getIssueId()));
        }

        filter.setAsigneeFilter(asigneeFilter);
        filter.setGroupFilter(groupDTOs);
        filter.setMilestoneFilter(dtos);
        filter.setStatusFilter(statusFilter);
        filter.setTypeFilter(typeFilter);
        filter.setRequirement(requirementFilter);
        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<IssueFilter> issueAddFilter(String classCode, User user) {

        Classes classes = classRepositories.findClassByCode(classCode);
        if (classes == null) {
            throw new CustomException("Class doesnt exist");
        }

        // User author = userRepository.findById(user.getUserId())
        //         .orElseThrow(() -> new CustomException("author doesnt exist"));

        List<Milestone> milestoneOfClass = milestoneRepository.getByClassCodeInProgress(classCode);
        List<IssueMilestoneDTO> dtos = new ArrayList<>();
        for (Milestone milestone : milestoneOfClass) {
            dtos.add(toMilestoneDto(milestone));
        }

        List<ClassUser> traineeOfClass = classUserRepositories.findByClasses(classes);
        List<IssueAsigneeDTO> asigneeDTOs = new ArrayList<>();
        for (ClassUser classUser : traineeOfClass) {
            asigneeDTOs.add(toAsigneeDTO(classUser.getUser()));
        }

        List<Group> groups = groupRepository.getGroupOfClass(classCode);
        List<IssueGroupDTO> groupDTOs = new ArrayList<>();
        for (Group group : groups) {
            groupDTOs.add(toGroupDto(group));
        }

        List<ClassSetting> typeAndStatusOfClass = classSettingRepository.getTypeAndStatusOfClass(classCode);
        List<IssueSettingDto> typeFilter = new ArrayList<>();
        List<IssueSettingDto> statusFilter = new ArrayList<>();
        for (ClassSetting setting : typeAndStatusOfClass) {
            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_STATUS")) {
                statusFilter.add(toSettingDTO(setting));
            }

            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_TYPE")) {
                typeFilter.add(toSettingDTO(setting));
            }
        }

        List<IssueFilterValue> requirementFilter = new ArrayList<>();
        List<Issue> requirementOfClass = issueRepository.getRequirementOfClass(classCode);
        for (Issue issue : requirementOfClass) {
            requirementFilter.add(new IssueFilterValue(issue.getTitle(), issue.getIssueId()));
        }

        // filter.setAsigneeFilter(asigneeFilter);
        IssueFilter filter = new IssueFilter();
        filter.setGroupFilter(groupDTOs);
        filter.setMilestoneFilter(dtos);
        filter.setStatusFilter(statusFilter);
        filter.setTypeFilter(typeFilter);
        filter.setRequirement(requirementFilter);
        filter.setTraineesToAsign(asigneeDTOs);
        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<IssueResponseDTO> issueDetail(Long issueId) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(() -> new CustomException("Issue doesnt exist"));

        return ResponseEntity.ok(toDto(issue));
    }

    @Override
    public ResponseEntity<String> issueAdd(String classCode, IssueRequestDTO requestDTO, User user) {
        Classes classes = classRepositories.findClassByCode(classCode);
        if (classes == null) {
            throw new CustomException("Class doesnt exist");
        }
        User author = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new CustomException("author doesnt exist"));
        Issue issue = new Issue();
        issue.setClasses(classes);
        issue.setTitle(requestDTO.getTitle());
        issue.setAuthor(author);
        issue.setClosed(false);

        if (requestDTO.getMilestoneId() != null) {
            Milestone milestone = milestoneRepository.findById(requestDTO.getMilestoneId())
                    .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
            issue.setMilestone(milestone);
        }

        if (requestDTO.getGroupId() != null) {
            Group group = groupRepository.findById(requestDTO.getGroupId())
                    .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
            issue.setGroup(group);
        }

        if (requestDTO.getTypeId() != null) {
            ClassSetting typeSeting = classSettingRepository.findById(requestDTO.getTypeId())
                    .orElseThrow(() -> new CustomException("Type doesnt exist"));
            issue.setType(typeSeting);
        }

        if (requestDTO.getStatusId() != null) {
            ClassSetting statusSetting = classSettingRepository.findById(requestDTO.getStatusId())
                    .orElseThrow(() -> new CustomException("Status doesnt exist"));
            issue.setStatus(statusSetting);
        }

        if (requestDTO.getAsigneeName() != null) {
            User aisgnee = userRepository.findActiveByAccountName(requestDTO.getAsigneeName());
            issue.setAsignee(aisgnee);
        }

        if (requestDTO.getDescription() != null) {
            issue.setDescription(requestDTO.getDescription());
        }

        if (requestDTO.getDeadline() != null) {
            issue.setDeadline(LocalDate.parse(requestDTO.getDeadline()));
        }

        issueRepository.save(issue);
        return ResponseEntity.ok("New issue added");
    }

}
