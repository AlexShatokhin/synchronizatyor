import { FC } from 'react';
import FilterLabel from '../../UI/FilterLabel/FilterLabel';

import "./dropdown_filter.scss";
type DropdownFilterPropsType = {
    value: string;
    options: { value: string, label: string }[];
    onChange: (value: string) => void;
    label: string;
    icon?: JSX.Element;
}

const DropdownFilter: FC<DropdownFilterPropsType> = ({ options, onChange, value, label, icon }) => {
    return (
        <div className='dropdown-filter'>
                <FilterLabel 
                    label={label}
                    icon={icon}/>
                <select value={value} onChange={(e) => onChange(e.target.value)}>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
        </div>
    );
};

export default DropdownFilter;