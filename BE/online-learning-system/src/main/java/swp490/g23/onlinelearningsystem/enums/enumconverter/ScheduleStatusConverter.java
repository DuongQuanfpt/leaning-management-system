package swp490.g23.onlinelearningsystem.util.enumutil.enumconverter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.util.enumutil.ScheduleStatus;

@Converter(autoApply = true)
public class ScheduleStatusConverter implements AttributeConverter<ScheduleStatus, Boolean> {

    @Override
    public Boolean convertToDatabaseColumn(ScheduleStatus attribute) {
        if (attribute.getValue() == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public ScheduleStatus convertToEntityAttribute(Boolean dbData) {

        return ScheduleStatus.fromValue(dbData);
    }
}
