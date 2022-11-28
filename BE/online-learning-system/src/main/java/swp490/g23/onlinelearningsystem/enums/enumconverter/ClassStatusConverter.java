package swp490.g23.onlinelearningsystem.util.enumutil.enumconverter;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.util.enumutil.ClassStatus;

@Converter(autoApply = true)
public class ClassStatusConverter implements AttributeConverter<ClassStatus,String>{

    @Override
    public String convertToDatabaseColumn(ClassStatus attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public ClassStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        
        return Stream.of(ClassStatus.values())
          .filter(u -> u.getValue().equals(dbData))
          .findFirst()
          .orElseThrow(IllegalArgumentException::new);
    }
    
}
