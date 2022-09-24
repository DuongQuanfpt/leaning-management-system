package swp490.g23.onlinelearningsystem.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter @Setter @NoArgsConstructor
public class BaseEntity {
    @Column
	@CreatedBy
	private Long createdBy;
	
	@Column
	@LastModifiedBy
	private Long modifiedBy;
	
	@Column
	@CreatedDate
	private Date createdDate;
	
	@Column
	@LastModifiedDate
	private Date modifiedDate;

}
