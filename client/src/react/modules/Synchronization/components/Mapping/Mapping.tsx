import React from 'react';
import { useTypedDispatch, useTypedSelector } from "../../../../hooks/useRedux";
import { setMappingType, setMapping } from "../../slice/synchronizationSlice";
import Input from "../../../../UI/Input/Input";
import Button from "../../../../UI/Button/Button";
import "./mapping.scss";

const Mapping: React.FC = () => {
    const dispatch = useTypedDispatch();
    const mappingType = useTypedSelector(state => state.synchronizationSlice.mappingType);
    const mapping = useTypedSelector(state => state.synchronizationSlice.mapping);

    const handleMappingTypeChange = (value: string) => {
        dispatch(setMappingType(value));
    };

    const handleMappingChange = (index: number, key: "old" | "new", value: string) => {
        const newMapping = mapping.map((item, i) => 
            i === index ? { ...item, [key]: value } : item
        );
        dispatch(setMapping(newMapping));
    };

    const addMappingField = () => {
        if (mapping.length < 5) {
            const newMapping = [...mapping, { old: "", new: "" }];
            dispatch(setMapping(newMapping));
        }
    };

    const removeMappingField = (index: number) => {
        if (mapping.length > 1) {
            const newMapping = mapping.filter((_, i) => i !== index);
            dispatch(setMapping(newMapping));
        }
    };

    return (
        <div className="mapping">
            <div className="mapping__header">
                <div className="mapping__type">
                    <div className="mapping__item">
                        <input
                            type="radio"
                            name="mappingType"
                            value="rename"
                            checked={mappingType === "rename"}
                            onChange={() => handleMappingTypeChange("rename")}/>
                        <label> Переименование</label>
                    </div>
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
                        <Button onClick={() => removeMappingField(index)} disabled={mapping.length <= 1} title={"Удалить"}/>
                    </div>
                ))}
                <Button onClick={addMappingField} disabled={mapping.length >= 5} title={"добавить"}/>
            </div>
        </div>
    );
};

export default Mapping;