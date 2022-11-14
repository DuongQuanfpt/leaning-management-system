package swp490.g23.onlinelearningsystem.util.enumutil.enumconverter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum;

@Converter(autoApply = true)
public class SubmitWorkStatusConverter implements AttributeConverter<SubmitWorkStatusEnum, Boolean>{

    @Override
    public Boolean convertToDatabaseColumn(SubmitWorkStatusEnum attribute) {
        if (attribute.getValue() == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public SubmitWorkStatusEnum convertToEntityAttribute(Boolean dbData) {
        // TODO Auto-generated method stub
        return SubmitWorkStatusEnum.fromValue(dbData);
    }
}
