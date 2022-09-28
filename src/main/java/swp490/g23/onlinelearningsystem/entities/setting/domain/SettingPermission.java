// package swp490.g23.onlinelearningsystem.entities.setting.domain;

// import javax.persistence.EmbeddedId;
// import javax.persistence.Entity;
// import javax.persistence.ManyToOne;
// import javax.persistence.MapsId;
// import javax.persistence.Table;

// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;

// @Entity
// @Table(name = "permission")
// @Getter @Setter @NoArgsConstructor @AllArgsConstructor
// public class SettingPermission {
//     @EmbeddedId
//     private long permissionId ;

//     @ManyToOne
//     @MapsId("settingId")
//     private Setting screen_id;

//     @ManyToOne
//     @MapsId("settingId")
//     private Setting role_id;

// }
