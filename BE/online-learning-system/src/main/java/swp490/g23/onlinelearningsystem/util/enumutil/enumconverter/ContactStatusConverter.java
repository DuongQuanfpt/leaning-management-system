package swp490.g23.onlinelearningsystem.util.enumutil.enumconverter;

import java.util.stream.Stream;


import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.util.enumutil.ContactStatus;

public class ContactStatusConverter implements AttributeConverter<ContactStatus,String>{

    @Override
    public String convertToDatabaseColumn(ContactStatus attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public ContactStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        
        return Stream.of(ContactStatus.values())
          .filter(u -> u.getValue().equals(dbData))
          .findFirst()
          .orElseThrow(IllegalArgumentException::new);
    }
    
}
