package swp490.g23.onlinelearningsystem.util.enumutil.enumconverter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum;

@Converter(autoApply = true)
public class MilestoneStatusConverter implements AttributeConverter<MilestoneStatusEnum,Boolean> {

    @Override
    public Boolean convertToDatabaseColumn(MilestoneStatusEnum attribute) {
       
        return attribute.getValue();
    }

    @Override
    public MilestoneStatusEnum convertToEntityAttribute(Boolean dbData) {
        
        return MilestoneStatusEnum.fromValue(dbData);
    }
    
}
