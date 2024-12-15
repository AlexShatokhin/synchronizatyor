import React from 'react';
import { useTypedDispatch, useTypedSelector } from "../../../../hooks/useRedux";
import { setMappingType, setMapping } from "../../slice/tasksSlice";
import Input from "../../../../UI/Input/Input";
import "./mapping.scss";

const Mapping: React.FC = () => {
    const dispatch = useTypedDispatch();
    const mappingType = useTypedSelector(state => state.tasksSlice.mappingType);
    const mapping = useTypedSelector(state => state.tasksSlice.mapping);

    const handleMappingTypeChange = (value: string) => {
        dispatch(setMappingType(value));
    };

    const handleMappingChange = (index: number, key: "old" | "new", value: string) => {
        const newMapping = mapping.map((item, itemIndex) => {
            if (itemIndex === index) {
                return {
                    ...item,
                    [key]: value
                };
            }
            return item;
        });
        dispatch(setMapping(newMapping));
    };

    return (
        <div className="mapping">
            <div className="mapping__header">
                <h3>Mapping</h3>
                <div className="mapping__type">
                    <label>
                        <input
                            type="radio"
                            name="mappingType"
                            value="rename"
                            checked={mappingType === "rename"}
                            onChange={() => handleMappingTypeChange("rename")}
                        />
                        Переименование
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="mappingType"
                            value="modification"
                            checked={mappingType === "modification"}
                            onChange={() => handleMappingTypeChange("modification")}
                        />
                        Модификация
                    </label>
                </div>
            </div>
            <div className="mapping__content">
                {mapping.map((map, index) => (
                    <div key={index} className="mapping__content-item">
                        <Input
                            placeholder="Старое значение"
                            value={map.old}
                            onChange={(e) => handleMappingChange(index, "old", e.target.value)}
                        />
                        <Input
                            placeholder="Новое значение"
                            value={map.new}
                            onChange={(e) => handleMappingChange(index, "new", e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mapping;