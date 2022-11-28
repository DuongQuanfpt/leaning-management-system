package swp490.g23.onlinelearningsystem.util.enumutil.enumconverter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum;

@Converter(autoApply = true)
public class SubmitStatusConverter implements AttributeConverter<SubmitStatusEnum, Boolean> {

    @Override
    public Boolean convertToDatabaseColumn(SubmitStatusEnum attribute) {
        if (attribute.getValue() == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public SubmitStatusEnum convertToEntityAttribute(Boolean dbData) {
        // TODO Auto-generated method stub
        return SubmitStatusEnum.fromValue(dbData);
    }

}
