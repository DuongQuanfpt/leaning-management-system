package swp490.g23.onlinelearningsystem.entities.groupMember.domain;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Entity
@Table(name = "group_member")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupMember extends BaseEntity{
    @EmbeddedId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private GroupMemberKey permissionId = new GroupMemberKey();

    @ManyToOne()
    @MapsId("groupId")
    @JoinColumn
    private Group group;

    @ManyToOne
    @MapsId("memberId")
    @JoinColumn
    private User member;

    @Column
    private Boolean isLeader;

    @Column
    private Boolean isActive;
}
