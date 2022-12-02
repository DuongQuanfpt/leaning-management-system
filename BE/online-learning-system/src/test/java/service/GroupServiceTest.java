package service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.ClassUserRepositories;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.domain.request.GroupRequestDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupCreateDTO;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.group.service.impl.GroupService;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.groupMember.repositories.GroupMemberRepositories;
import swp490.g23.onlinelearningsystem.entities.groupMember.service.impl.GroupMemberService;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.service.impl.MilestoneService;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@ExtendWith(MockitoExtension.class)
public class GroupServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private MilestoneRepository milestoneRepository;

    @Mock
    private GroupRepository groupRepository;

    @Mock
    private GroupMemberRepositories memberRepositories;

    @Mock
    private ClassUserRepositories classUserRepositories;

    @Mock
    private SubmitRepository submitRepository;

    @InjectMocks
    private GroupMemberService memberService;

    @InjectMocks
    private MilestoneService milestoneService;

    @InjectMocks
    private GroupService groupService;

    private Group mockRepository;

    private ClassUser classUser;

    private Classes classes;

    private Milestone milestone;

    private GroupMember groupMember;

    @BeforeEach
    void init() {
        classes = new Classes();
        classes.setClassId((long) 1);
        classes.setCode("ABC123");

        User user = new User();
        user.setUserId((long) 1);
        user.setAccountName("quan");
        classUser = new ClassUser();
        classUser.setClasses(classes);
        classUser.setUser(user);
        classes.setClassUsers(List.of(classUser));

        milestone = new Milestone();
        milestone.setMilestoneId((long) 1);
        milestone.setStatus(MilestoneStatusEnum.Open);
        milestone.setClasses(classes);

        Submit submit = new Submit();
        submit.setClassUser(classUser);
        submit.setMilestone(milestone);
        milestone.setSubmits(List.of(submit));

        mockRepository = new Group();
        mockRepository.setGroupId((long) 1);
        mockRepository.setGroupCode("Group A");
        mockRepository.setDescription("description A");
        mockRepository.setClasses(classes);
        groupMember = new GroupMember();
        groupMember.setMember(user);
        groupMember.setGroup(mockRepository);
        groupMember.setIsLeader(false);
        mockRepository.setGroupMembers(List.of(groupMember));
    }

     /**
     * group create-  move member from waitling list  to newly created group
     */

    @Test
    void groupCreate_UTC001() {

        GroupCreateDTO expectedResult = new GroupCreateDTO();
        expectedResult.setGroupCode("Group A");
        expectedResult.setGroupId((long) 1);
        expectedResult.setMembers(List.of("quan"));

        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(milestone));
        Mockito.when(classUserRepositories.findByClassesAndUserName("quan", "ABC123")).thenReturn(classUser);
        Mockito.when(memberRepositories.save(Mockito.any(GroupMember.class))).thenReturn(groupMember);

        GroupRequestDTO groupCreateDTO = new GroupRequestDTO();
        groupCreateDTO.setGroupCode("Group A");
        GroupCreateDTO actual = groupService.groupCreate((long) 1, groupCreateDTO, "quan").getBody();

        assertEquals(expectedResult.getGroupCode(), actual.getGroupCode());
        assertEquals(expectedResult.getGroupId(), actual.getGroupId());
        assertEquals(expectedResult.getMembers(), actual.getMembers());
    }

     /**
     * group create- request sent a non existent milestone
     */

    @Test
    void groupCreate_UTC002() {

        GroupCreateDTO expectedResult = new GroupCreateDTO();
        expectedResult.setGroupCode("Group A");
        expectedResult.setGroupId((long) 1);
        expectedResult.setMembers(List.of("quan"));

        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.empty());

        GroupRequestDTO groupCreateDTO = new GroupRequestDTO();
        groupCreateDTO.setGroupCode("Group A");

        Exception expectedEx = assertThrows(CustomException.class, () -> groupService.groupCreate((long) 1, groupCreateDTO, "quan").getBody());
        
        assertEquals(expectedEx.getMessage(), "Milestone doesnt exist");
    }

     /**
     * group create- request sent member name not in milestone classes
     */

    @Test
    void groupCreate_UTC003() {

        GroupCreateDTO expectedResult = new GroupCreateDTO();
        expectedResult.setGroupCode("Group A");
        expectedResult.setGroupId((long) 1);
        expectedResult.setMembers(List.of("quan"));

        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(milestone));
        Mockito.when(classUserRepositories.findByClassesAndUserName(anyString(), anyString())).thenReturn(null);
        
        GroupRequestDTO groupCreateDTO = new GroupRequestDTO();
        groupCreateDTO.setGroupCode("Group A");
        Exception expectedEx = assertThrows(CustomException.class, () -> groupService.groupCreate((long) 1, groupCreateDTO, "quan").getBody());
        
        assertEquals(expectedEx.getMessage(), "trainee not found in this milestone");
    }

     /**
     * group create- request sent member name not in milestone classes
     */

    @Test
    void groupCreate_UTC004() {

        GroupCreateDTO expectedResult = new GroupCreateDTO();
        expectedResult.setGroupCode("Group A");
        expectedResult.setGroupId((long) 1);
        expectedResult.setMembers(List.of("quan"));

        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(milestone));
        Mockito.when(classUserRepositories.findByClassesAndUserName(anyString(), anyString())).thenReturn(null);
        
        GroupRequestDTO groupCreateDTO = new GroupRequestDTO();
        groupCreateDTO.setGroupCode("Group A");
        Exception expectedEx = assertThrows(CustomException.class, () -> groupService.groupCreate((long) 1, groupCreateDTO, "quan").getBody());
        
        assertEquals(expectedEx.getMessage(), "trainee not found in this milestone");
    }

    /**
     * group create- move member from old group  to newly created group
     */

    @Test
    void groupCreate_UTC005() {
        Group oldGroup = new Group();
        oldGroup.setGroupId((long) 2);
        oldGroup.setGroupCode("Group B");
        oldGroup.setDescription("description B");
        oldGroup.setClasses(classes);
        oldGroup.setGroupMembers(List.of(groupMember));

        Milestone milestoneOfOldGroup = new Milestone();
        milestoneOfOldGroup.setMilestoneId((long) 1);
        milestoneOfOldGroup.setStatus(MilestoneStatusEnum.Open);
        milestoneOfOldGroup.setClasses(classes);
      
        Submit submit = new Submit();
        submit.setClassUser(classUser);
        submit.setMilestone(milestoneOfOldGroup);
        oldGroup.setSubmits(List.of(submit));

        GroupCreateDTO expectedResult = new GroupCreateDTO();
        expectedResult.setGroupCode("Group A");
        expectedResult.setGroupId((long) 1);
        expectedResult.setMembers(List.of("quan"));

        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(milestone));
        Mockito.when(classUserRepositories.findByClassesAndUserName("quan", "ABC123")).thenReturn(classUser);
        Mockito.when(groupRepository.findGroupByMilestoneAndUser(milestone, classUser.getUser())).thenReturn(oldGroup);
        Mockito.when(memberRepositories.save(Mockito.any(GroupMember.class))).thenReturn(groupMember);

        GroupRequestDTO groupCreateDTO = new GroupRequestDTO();
        groupCreateDTO.setGroupCode("Group A");
        GroupCreateDTO actual = groupService.groupCreate((long) 1, groupCreateDTO, "quan").getBody();

        assertEquals(expectedResult.getGroupCode(), actual.getGroupCode());
        assertEquals(expectedResult.getGroupId(), actual.getGroupId());
        assertEquals(expectedResult.getMembers(), actual.getMembers());
    }

     /**
     * group create- move member from old group  to newly created group
     */

    @Test
    void groupCreate_UTC006() {
        Group oldGroup = new Group();
        oldGroup.setGroupId((long) 2);
        oldGroup.setGroupCode("Group B");
        oldGroup.setDescription("description B");
        oldGroup.setClasses(classes);
        oldGroup.setGroupMembers(List.of(groupMember));

        Milestone milestoneOfOldGroup = new Milestone();
        milestoneOfOldGroup.setMilestoneId((long) 1);
        milestoneOfOldGroup.setStatus(MilestoneStatusEnum.Open);
        milestoneOfOldGroup.setClasses(classes);
      
        Submit submit = new Submit();
        submit.setClassUser(classUser);
        submit.setMilestone(milestoneOfOldGroup);
        oldGroup.setSubmits(List.of(submit));

        GroupCreateDTO expectedResult = new GroupCreateDTO();
        expectedResult.setGroupCode("Group A");
        expectedResult.setGroupId((long) 1);
        expectedResult.setMembers(List.of("quan"));

        Mockito.when(milestoneRepository.findById((long) 1)).thenReturn(Optional.of(milestone));
        Mockito.when(classUserRepositories.findByClassesAndUserName("quan", "ABC123")).thenReturn(classUser);
        Mockito.when(groupRepository.findGroupByMilestoneAndUser(milestone, classUser.getUser())).thenReturn(oldGroup);
        Mockito.when(memberRepositories.save(Mockito.any(GroupMember.class))).thenReturn(groupMember);

        GroupRequestDTO groupCreateDTO = new GroupRequestDTO();
        groupCreateDTO.setGroupCode("Group A");
        GroupCreateDTO actual = groupService.groupCreate((long) 1, groupCreateDTO, "quan").getBody();

        assertEquals(expectedResult.getGroupCode(), actual.getGroupCode());
        assertEquals(expectedResult.getGroupId(), actual.getGroupId());
        assertEquals(expectedResult.getMembers(), actual.getMembers());
    }
}
