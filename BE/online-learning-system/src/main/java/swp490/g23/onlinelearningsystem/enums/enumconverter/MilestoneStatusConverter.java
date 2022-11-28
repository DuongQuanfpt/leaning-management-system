package swp490.g23.onlinelearningsystem.enums.enumconverter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;

@Converter(autoApply = true)
public class MilestoneStatusConverter implements AttributeConverter<MilestoneStatusEnum,Boolean> {

    @Override
    public Boolean convertToDatabaseColumn(MilestoneStatusEnum attribute) {
       
        if(attribute.getValue() == null){
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public MilestoneStatusEnum convertToEntityAttribute(Boolean dbData) {
        
        return MilestoneStatusEnum.fromValue(dbData);
    }
    
}
