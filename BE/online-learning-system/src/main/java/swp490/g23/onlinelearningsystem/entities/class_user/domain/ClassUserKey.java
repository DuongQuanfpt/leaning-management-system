package swp490.g23.onlinelearningsystem.entities.class_user.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassUserKey implements Serializable{
    
    @Column(name = "class_id")
    private Long classId;

    @Column(name = "user_id")
    private Long userId;


}
