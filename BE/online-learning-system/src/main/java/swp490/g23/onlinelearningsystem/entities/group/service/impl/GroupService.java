package swp490.g23.onlinelearningsystem.entities.group.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.service.impl.ClassUserService;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupResponseDTO;
import swp490.g23.onlinelearningsystem.entities.group.repositories.criteria.GroupCriteria;
import swp490.g23.onlinelearningsystem.entities.group.repositories.criteria_entity.GroupQuery;
import swp490.g23.onlinelearningsystem.entities.group.service.IGroupService;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.response.GroupMemberResponseDTO;
import swp490.g23.onlinelearningsystem.entities.groupMember.service.impl.GroupMemberService;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.service.impl.MilestoneService;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Service
public class GroupService implements IGroupService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupCriteria groupCriteria;

    @Autowired
    private GroupMemberService groupMemberService;

    @Autowired
    private SubmitRepository submitRepository;

    @Autowired
    private MilestoneService milestoneService;

    @Autowired
    private ClassUserService classUserService;

    @Override
    public ResponseEntity<GroupPaginateDTO> getGroup(int limit, int page, String keyword, String filterActive,
            String filterMilestone, User user) {
        User currentUser = userRepository.findById(user.getUserId()).get();

        GroupQuery result = groupCriteria.searchFilterGroup(keyword, filterActive, filterMilestone, currentUser);
        TypedQuery<Group> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();
    
        List<Group> groupsFilter = queryResult.getResultList();
        List<MilestoneResponseDTO> milestoneFilter = new ArrayList<>();
        for (Group group : groupsFilter) {
            for (Submit submit : group.getSubmits()) {
               
                milestoneFilter.add(milestoneService.toDTO(submit.getMilestone()));
            }
         
        } 

        List<StatusEntity> statusFilter = new ArrayList<>();
        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statusFilter.add(new StatusEntity(status));
        }

        Long totalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage =  (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }
        
        List<GroupResponseDTO> responseDTOs = new ArrayList<>();
        for (Group group : queryResult.getResultList()) {
            responseDTOs.add(toDTO(group));
        }

        List<TraineeResponseDTO> noGroupMembers = new ArrayList<>();
        if (filterMilestone != null) {
            List<Submit> submits = submitRepository.getNoGroupMember(Long.parseLong(filterMilestone));
            for (Submit submit : submits) {
                noGroupMembers.add(classUserService.toTraineeDTO(submit.getClassUser()));
            }

        }

        GroupPaginateDTO paginateDTO = new GroupPaginateDTO();
        paginateDTO.setPage(page);
        paginateDTO.setTotalItem(totalItem);
        paginateDTO.setTotalPage(totalPage);
        paginateDTO.setListResult(responseDTOs);
        paginateDTO.setNoGroup(noGroupMembers);
        paginateDTO.setStatusFilter(statusFilter);
        paginateDTO.setMilstoneFilter(milestoneFilter);
        return ResponseEntity.ok(paginateDTO);
    }

    public GroupResponseDTO toDTO(Group entity) {
        GroupResponseDTO dto = new GroupResponseDTO();

        dto.setGroupId(entity.getGroupId());
        if (entity.getDescription() != null) {
            dto.setDescription(entity.getDescription());
        }

        if (entity.getGroupCode() != null) {
            dto.setGroupCode(entity.getGroupCode());
        }

        if (entity.getStatus() != null) {
            dto.setStatus(entity.getStatus().toString());
        }

        if (entity.getTopicName() != null) {
            dto.setTopicName(entity.getTopicName());
        }

        if (entity.getClasses() != null) {
            dto.setClassCode(entity.getClasses().getCode());
        }

        List<MilestoneResponseDTO> milestoneResponseDTOs = new ArrayList<>();
        if (entity.getSubmits() != null) {
            for (Submit submit : entity.getSubmits()) {
                boolean canAdd = true;
                for (MilestoneResponseDTO responseDTO : milestoneResponseDTOs) {
                    if (responseDTO.getMilestoneId() == submit.getMilestone().getMilestoneId()) {
                        canAdd = false;
                        break;
                    }
                }

                if (canAdd == true) {
                    milestoneResponseDTOs.add(milestoneService.toDTO(submit.getMilestone()));
                }
            }
            dto.setMilestone(milestoneResponseDTOs);
        }

        List<GroupMemberResponseDTO> memberResponseDTOs = new ArrayList<>();
        if (!entity.getGroupMembers().isEmpty()) {
            for (GroupMember member : entity.getGroupMembers()) {
                memberResponseDTOs.add(groupMemberService.toDTO(member));
            }
            dto.setGroupMembers(memberResponseDTOs);
        }

        return dto;
    }

}
