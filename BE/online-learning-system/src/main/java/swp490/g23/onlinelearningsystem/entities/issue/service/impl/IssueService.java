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
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueAsigneeFilterDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueFilter;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueFilterValue;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueGroupFilterDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueMilestoneFilterDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueSettingFilterDto;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueBatchRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueFilterRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueUserDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueDetailDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueGroupDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueListDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueMilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueRequirementDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueResponseDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueSettingDTO;
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
    public ResponseEntity<IssueListDTO> getIssueList(int page, int limit, String keyword, String classCode,
            boolean isIssue, Long filterMilestoneId, IssueFilterRequestDTO filterRequestDTO) {
        Classes classes = classRepositories.findClassByCode(classCode);
        if (classes == null) {
            throw new CustomException("Class doesnt exist");
        }

        IssueQuery result = issueCriteria.searchFilterQuery(keyword, classCode, isIssue, filterMilestoneId,
                filterRequestDTO);
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

    public IssueGroupFilterDTO toGroupFilterDto(Group group) {
        IssueGroupFilterDTO groupDTO = new IssueGroupFilterDTO();
        groupDTO.setGroupId(group.getGroupId());
        groupDTO.setGroupName(group.getGroupCode());
        groupDTO.setGroupTopic(group.getTopicName());

        List<String> members = new ArrayList<>();
        for (GroupMember member : group.getGroupMembers()) {
            members.add(member.getMember().getAccountName());
        }
        groupDTO.setMemberId(members);
        return groupDTO;
    }

    public IssueSettingFilterDto toSettingFilterDTO(ClassSetting setting) {
        IssueSettingFilterDto dto = new IssueSettingFilterDto();
        dto.setId(setting.getClassSettingId());
        dto.setTitle(setting.getSettingValue());
        return dto;
    }

    public IssueMilestoneFilterDTO toMilestoneFilterDto(Milestone milestone) {
        IssueMilestoneFilterDTO dto = new IssueMilestoneFilterDTO();
        dto.setAssignmentTitle(milestone.getAssignment().getTitle());
        dto.setMilestoneId(milestone.getMilestoneId());
        dto.setMilestoneTitle(milestone.getTitle());
        dto.setTeamwork(milestone.getAssignment().isTeamWork());

        List<IssueGroupFilterDTO> groups = new ArrayList<>();
        IssueGroupFilterDTO noGroup = new IssueGroupFilterDTO();
        List<String> noGroupMember = new ArrayList<>();
        noGroup.setGroupName("Waiting List");
        for (Submit submit : milestone.getSubmits()) {
            if (submit.getGroup() != null) {
                boolean exist = false;
                for (IssueGroupFilterDTO groupFilterDTO : groups) {
                    if (groupFilterDTO.getGroupId() == submit.getGroup().getGroupId()) {
                        exist = true;
                        break;
                    }
                }

                if (exist == false) {
                    groups.add(toGroupFilterDto(submit.getGroup()));
                }
            } else {
                noGroupMember.add(submit.getClassUser().getUser().getAccountName());
            }
        }

        List<IssueFilterValue> requirements = new ArrayList<>();
        for (Issue issue : milestone.getIssues()) {
            if(issue.getType()== null){
                requirements.add(new IssueFilterValue(issue.getTitle(), issue.getIssueId()));
            }
        }
        dto.setRequirements(requirements);

        noGroup.setMemberId(noGroupMember);
        groups.add(noGroup);
        dto.setGroups(groups);
        return dto;
    }

    public IssueAsigneeFilterDTO toAsigneeFilterDTO(User user) {
        IssueAsigneeFilterDTO asigneeDTO = new IssueAsigneeFilterDTO();
        asigneeDTO.setTraineeId(user.getUserId());
        asigneeDTO.setUsername(user.getAccountName());
        return asigneeDTO;
    }

    public IssueGroupDTO toGroupDTO(Group group) {
        IssueGroupDTO groupDTO = new IssueGroupDTO();
        groupDTO.setGroupCode(group.getGroupCode());
        groupDTO.setGroupTopic(group.getTopicName());
        groupDTO.setGroupId(group.getGroupId());
        return groupDTO;
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
            dto.setAsignee(toUserDTO(issue.getAsignee()));
        }

        if (issue.getAuthor() != null) {
            dto.setAuthor(toUserDTO(issue.getAuthor()));
        }

        if (issue.getDeadline() != null) {
            dto.setDeadline(issue.getDeadline().toString());
        }

        if (issue.getGroup() != null) {
            dto.setGroup(toGroupDTO(issue.getGroup()));
        }

        if (issue.getMilestone() != null) {
            IssueMilestoneDTO milestoneViewDTO = new IssueMilestoneDTO();
            milestoneViewDTO.setDeadline(issue.getMilestone().getToDate().toString());
            milestoneViewDTO.setTitle(issue.getMilestone().getTitle());
            dto.setMilestone(milestoneViewDTO);
        }

        if (issue.getCreatedDate() != null) {
            dto.setCreatedDate(issue.getCreatedDate().toString());
        }

        if (issue.getModifiedDate() != null) {
            dto.setModifiedDate(issue.getModifiedDate().toString());
        }

        if (issue.getModifiedBy() != null) {
            User lastEditor = userRepository.findUserWithEmail(issue.getModifiedBy());
            if (lastEditor != null) {
                dto.setModifiedBy(toUserDTO(lastEditor));
            }

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

    public IssueUserDTO toUserDTO(User user) {
        IssueUserDTO asigneeDTO = new IssueUserDTO();

        asigneeDTO.setFullName(user.getFullName());
        asigneeDTO.setUsername(user.getAccountName());
        asigneeDTO.setEmail(user.getEmail());
        asigneeDTO.setMobile(user.getMobile());
        asigneeDTO.setNote(user.getNote());
        asigneeDTO.setStatus(user.getStatus().toString());
        asigneeDTO.setUserId(user.getUserId());
        asigneeDTO.setAvatar_url(user.getAvatar_url());

        return asigneeDTO;
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
        List<IssueGroupFilterDTO> groupDTOs = new ArrayList<>();
        for (Group group : groups) {
            groupDTOs.add(toGroupFilterDto(group));
        }

        List<Milestone> milestoneOfClass = milestoneRepository.getByIssueOfClassCode(classCode);
        List<IssueMilestoneFilterDTO> dtos = new ArrayList<>();
        for (Milestone milestone : milestoneOfClass) {
            dtos.add(toMilestoneFilterDto(milestone));
        }

        List<ClassSetting> typeAndStatusOfClass = classSettingRepository.getTypeAndStatusOfClass(classCode);
        List<IssueSettingFilterDto> typeFilter = new ArrayList<>();
        List<IssueSettingFilterDto> statusFilter = new ArrayList<>();
        for (ClassSetting setting : typeAndStatusOfClass) {
            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_STATUS")) {
                statusFilter.add(toSettingFilterDTO(setting));
            }

            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_TYPE")) {
                typeFilter.add(toSettingFilterDTO(setting));
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
        // .orElseThrow(() -> new CustomException("author doesnt exist"));

        List<Milestone> milestoneOfClass = milestoneRepository.getByClassCodeInProgress(classCode);
        List<IssueMilestoneFilterDTO> dtos = new ArrayList<>();
        for (Milestone milestone : milestoneOfClass) {
            dtos.add(toMilestoneFilterDto(milestone));
        }

        List<ClassUser> traineeOfClass = classUserRepositories.findByClasses(classes);
        List<String> asigneeDTOs = new ArrayList<>();
        for (ClassUser classUser : traineeOfClass) {
            asigneeDTOs.add(classUser.getUser().getAccountName());
        }

        List<Group> groups = groupRepository.getGroupOfClass(classCode);
        List<IssueGroupFilterDTO> groupDTOs = new ArrayList<>();
        for (Group group : groups) {
            groupDTOs.add(toGroupFilterDto(group));
        }

        List<ClassSetting> typeAndStatusOfClass = classSettingRepository.getTypeAndStatusOfClass(classCode);
        List<IssueSettingFilterDto> typeFilter = new ArrayList<>();
        List<IssueSettingFilterDto> statusFilter = new ArrayList<>();
        for (ClassSetting setting : typeAndStatusOfClass) {
            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_STATUS")) {
                statusFilter.add(toSettingFilterDTO(setting));
            }

            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_TYPE")) {
                typeFilter.add(toSettingFilterDTO(setting));
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
    public ResponseEntity<IssueDetailDTO> issueDetail(Long issueId) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(() -> new CustomException("Issue doesnt exist"));

        return ResponseEntity.ok(toIssueDetail(issue));
    }

    public IssueRequirementDTO toRequirementDTO(Issue requirement) {
        IssueRequirementDTO requirementDTO = new IssueRequirementDTO();
        requirementDTO.setId(requirement.getIssueId());
        requirementDTO.setTitle(requirement.getTitle());
        return requirementDTO;
    }

    public IssueDetailDTO toIssueDetail(Issue issue) {
        IssueDetailDTO detailDTO = new IssueDetailDTO();
        detailDTO.setIssueId(issue.getIssueId());
        detailDTO.setTitle(issue.getTitle());
        detailDTO.setClassCode(issue.getClasses().getCode());

        if (issue.getType() != null) {
            detailDTO.setType(toSettingDTO(issue.getType()));
        }

        if (issue.getRequirement() != null) {
            detailDTO.setRequirement(toRequirementDTO(issue.getRequirement()));
        }

        if (issue.getDescription() != null) {
            detailDTO.setDescription(issue.getDescription());
        }

        if (issue.getAsignee() != null) {
            detailDTO.setAsignee(toUserDTO(issue.getAsignee()));
        }

        if (issue.getDeadline() != null) {
            detailDTO.setDeadline(issue.getDeadline().toString());
        }

        if (issue.getGroup() != null) {
            detailDTO.setGroup(toGroupDTO(issue.getGroup()));
        }

        if (issue.getMilestone() != null) {
            IssueMilestoneDTO milestoneViewDTO = new IssueMilestoneDTO();
            milestoneViewDTO.setMilestoneId(issue.getMilestone().getMilestoneId());
            milestoneViewDTO.setTeamwork(issue.getMilestone().getAssignment().isTeamWork());
            milestoneViewDTO.setDeadline(issue.getMilestone().getToDate().toString());
            milestoneViewDTO.setTitle(issue.getMilestone().getTitle());
            detailDTO.setMilestone(milestoneViewDTO);
        }

        if (issue.isClosed() != true) {
            if (issue.getStatus() != null) {
                detailDTO.setStatus(toSettingDTO(issue.getStatus()));
            } else {
                detailDTO.setStatus(new IssueSettingDTO((long) 1, "Open"));
            }

        } else {
            detailDTO.setStatus(new IssueSettingDTO((long) 0, "Close"));
        }
        return detailDTO;
    }

    public IssueSettingDTO toSettingDTO(ClassSetting setting) {
        IssueSettingDTO dto = new IssueSettingDTO();
        dto.setTitle(setting.getSettingValue());
        dto.setId(setting.getClassSettingId());
        return dto;
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

        if (requestDTO.getAsigneeName() != null) {
            User aisgnee = userRepository.findByAccountName(requestDTO.getAsigneeName());
            issue.setAsignee(aisgnee);
        }

        if (requestDTO.getDescription() != null) {
            issue.setDescription(requestDTO.getDescription());
        }

        if (requestDTO.getDeadline() != null) {
            issue.setDeadline(LocalDate.parse(requestDTO.getDeadline()));
        }

        if (requestDTO.getTypeId() != null) {
            ClassSetting typeSeting = classSettingRepository.findById(requestDTO.getTypeId())
                    .orElseThrow(() -> new CustomException("Type doesnt exist"));
            issue.setType(typeSeting);

            if (requestDTO.getStatusId() != null) {
                ClassSetting statusSetting = classSettingRepository.findById(requestDTO.getStatusId())
                        .orElseThrow(() -> new CustomException("Status doesnt exist"));
                issue.setStatus(statusSetting);
            }

            if (requestDTO.getRequirementId() != null) {
                Issue requirement = issueRepository.findById(requestDTO.getRequirementId())
                        .orElseThrow(() -> new CustomException("Issue doesnt exist"));
                issue.setRequirement(requirement);
            }
        }

        issueRepository.save(issue);
        return ResponseEntity.ok("New issue added");
    }

    @Override
    public ResponseEntity<String> issueEdit(Long issueId, IssueRequestDTO requestDTO, User user) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(() -> new CustomException("Issue doesnt exist"));

        issue.setTitle(requestDTO.getTitle());

        if (requestDTO.getDeadline() != null && requestDTO.getDeadline() != issue.getDeadline().toString()) {
            issue.setDeadline(LocalDate.parse(requestDTO.getDeadline()));
        }
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

        if (requestDTO.getAsigneeName() != null) {
            User aisgnee = userRepository.findByAccountName(requestDTO.getAsigneeName());
            issue.setAsignee(aisgnee);
        }

        if (requestDTO.getDescription() != null) {
            issue.setDescription(requestDTO.getDescription());
        }

        if (requestDTO.getTypeId() != null) {
            ClassSetting typeSeting = classSettingRepository.findById(requestDTO.getTypeId())
                    .orElseThrow(() -> new CustomException("Type doesnt exist"));
            issue.setType(typeSeting);

            if (requestDTO.getStatusId() != null) {
                if (requestDTO.getStatusId() == 0) {
                    issue.setStatus(null);
                    issue.setClosed(true);
                } else if (requestDTO.getStatusId() == 1) {
                    issue.setStatus(null);
                    issue.setClosed(false);
                } else {

                    ClassSetting statusSetting = classSettingRepository.findById(requestDTO.getStatusId())
                            .orElseThrow(() -> new CustomException("Status doesnt exist"));
                    issue.setStatus(statusSetting);
                    issue.setClosed(false);
                }

            }

            if (requestDTO.getRequirementId() != null) {
                Issue requirement = issueRepository.findById(requestDTO.getRequirementId())
                        .orElseThrow(() -> new CustomException("Issue doesnt exist"));
                issue.setRequirement(requirement);
            }
        } else {
            issue.setAsignee(null);
            issue.setGroup(null);
            issue.setMilestone(null);
            issue.setType(null);
            issue.setStatus(null);
            issue.setRequirement(null);
        }

        issueRepository.save(issue);
        return ResponseEntity.ok("issue updated ");
    }

    @Override
    public ResponseEntity<String> updateBatchIssue(IssueBatchRequestDTO requestDTO, User user) {
        List<Long> issueIds = requestDTO.getIssueToUpdate();
        List<Issue> issueList = new ArrayList<>();
        IssueRequestDTO changes = requestDTO.getUpdateToApply();

        ClassSetting typeSetting = null;
        ClassSetting statusSetting = null;
        User assignee = null;
        Milestone milestone = null;
        Issue requirement = null;
        Group group = null;

        if (changes.getMilestoneId() != null) {
            milestone = milestoneRepository.findById(changes.getMilestoneId())
                    .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        }

        if (changes.getGroupId() != null && changes.getGroupId() != 0) {
            group = groupRepository.findById(changes.getGroupId())
                    .orElseThrow(() -> new CustomException("Group doesnt exist"));
        }

        if (changes.getRequirementId() != null && changes.getRequirementId() != 0) {
            milestone = milestoneRepository.findById(changes.getMilestoneId())
                    .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        }

        if (changes.getAsigneeName() != null && !changes.getAsigneeName().equalsIgnoreCase("None")) {
            assignee = userRepository.findByAccountName(changes.getAsigneeName());
            if (assignee == null) {
                throw new CustomException("assignee doesnt exist");
            }
        }

        if (changes.getTypeId() != null) {
            typeSetting = classSettingRepository.findById(changes.getTypeId())
                    .orElseThrow(() -> new CustomException("Type doesnt exist"));
        }

        if (changes.getStatusId() != null && changes.getStatusId() != 1 && changes.getStatusId() != 0) {
            statusSetting = classSettingRepository.findById(changes.getStatusId())
                    .orElseThrow(() -> new CustomException("Status doesnt exist"));
        }

        for (Long id : issueIds) {
            Issue issue = issueRepository.findById(id).get();

            if (milestone != null) {
                issue.setMilestone(milestone);
            }

            if (changes.getRequirementId() == 0) {
                issue.setRequirement(null);
            } else if (requirement != null) {
                issue.setRequirement(requirement);
            }

            if (typeSetting != null) {
                issue.setType(typeSetting);
            }

            if (changes.getStatusId() == 1) {
                issue.setStatus(null);
                issue.setClosed(false);
            } else if (changes.getStatusId() == 0) {
                issue.setStatus(null);
                issue.setClosed(true);
            } else {
                if (statusSetting != null) {
                    issue.setStatus(statusSetting);
                    issue.setClosed(false);
                }
            }

            if (changes.getGroupId() == 0) {
                issue.setGroup(null);
            } else if (group != null) {
                issue.setGroup(group);
            }

            if (changes.getAsigneeName().equalsIgnoreCase("None")) {
                issue.setAsignee(null);
            } else if (assignee != null) {
                issue.setAsignee(assignee);
            }

            issueList.add(issue);
        }
        issueRepository.saveAll(issueList);
        return ResponseEntity.ok("all issue updated ");
    }

}
