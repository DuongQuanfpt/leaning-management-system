package swp490.g23.onlinelearningsystem.entities.groupMember.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Transactional
public interface GroupMemberRepositories extends JpaRepository<GroupMember,Long> {
    @Modifying
    @Query(value = "DELETE FROM GroupMember gm WHERE gm.member = :user AND gm.group = :group ")
    int removeMemberByGroup(User user, Group group);

    @Modifying
    @Query(value = "DELETE FROM GroupMember gm WHERE gm.member = :user ")
    int removeMember(User user);

    @Query(value = "SELECT gm FROM GroupMember gm WHERE gm.member.accountName = :userName AND gm.group.groupCode = :groupCode ")
    GroupMember getMember(String userName, String groupCode);

    @Query(value = "SELECT gm FROM GroupMember gm WHERE gm.member.accountName = :userName AND gm.group.groupId = :groupId ")
    GroupMember getMemberByGroup(String userName, Long groupId);
}
