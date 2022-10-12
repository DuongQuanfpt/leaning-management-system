package swp490.g23.onlinelearningsystem.util.enumutil.enumconverter;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;

public class UserStatusConverter implements AttributeConverter<UserStatus,String> {

    @Override
    public String convertToDatabaseColumn(UserStatus attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public UserStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        
        return Stream.of(UserStatus.values())
          .filter(u -> u.getValue().equals(dbData))
          .findFirst()
          .orElseThrow(IllegalArgumentException::new);
    }
    
}
