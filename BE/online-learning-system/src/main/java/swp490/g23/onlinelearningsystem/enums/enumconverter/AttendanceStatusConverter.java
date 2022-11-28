package swp490.g23.onlinelearningsystem.enums.enumconverter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.enums.AttendanceStatus;

@Converter(autoApply = true)
public class AttendanceStatusConverter implements AttributeConverter<AttendanceStatus, Boolean> {

    @Override
    public Boolean convertToDatabaseColumn(AttendanceStatus attribute) {
        if (attribute.getValue() == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public AttendanceStatus convertToEntityAttribute(Boolean dbData) {
        return AttendanceStatus.fromValue(dbData);
    }

}
