package swp490.g23.onlinelearningsystem.util.enumutil.enumconverter;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;

@Converter(autoApply = true)
public class TraineeStatusConverter implements AttributeConverter<TraineeStatus, String> {

    @Override
    public String convertToDatabaseColumn(TraineeStatus attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public TraineeStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        return Stream.of(TraineeStatus.values())
                .filter(u -> u.getValue().equals(dbData))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }

}
