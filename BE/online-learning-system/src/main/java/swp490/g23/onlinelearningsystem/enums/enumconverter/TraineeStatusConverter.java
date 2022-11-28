package swp490.g23.onlinelearningsystem.enums.enumconverter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.enums.TraineeStatus;

@Converter(autoApply = true)
public class TraineeStatusConverter implements AttributeConverter<TraineeStatus, Boolean> {

    @Override
    public Boolean convertToDatabaseColumn(TraineeStatus attribute) {

        return attribute.getValue();
    }

    @Override
    public TraineeStatus convertToEntityAttribute(Boolean dbData) {

        return TraineeStatus.fromValue(dbData);
    }

}
