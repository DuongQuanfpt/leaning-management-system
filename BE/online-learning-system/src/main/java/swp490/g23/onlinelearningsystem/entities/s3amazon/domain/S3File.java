package swp490.g23.onlinelearningsystem.entities.s3amazon.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class S3File {
    String name;
    String content;
}
