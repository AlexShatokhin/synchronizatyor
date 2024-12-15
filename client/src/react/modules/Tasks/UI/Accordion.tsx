import React, { FC, useState } from 'react';

import "./accordion.scss";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
type AccordionPropsType = {
    disabled?: boolean;
    children: React.ReactNode;
    label: string;
    isOpen?: boolean;
}

const Accordion: FC<AccordionPropsType> = ({ disabled = false, children, label, isOpen = false }) => {
    const [isContentVisible, setIsContentVisible] = useState(isOpen);

    const toggleContentVisibility = () => {
        if (!disabled) {
            setIsContentVisible(!isContentVisible);
        }
    };

    return (
        <div className={`accordion ${disabled ? 'accordion-disabled' : ''}`}>
            <div className="accordion__header" onClick={toggleContentVisibility}>
                <span>{label}</span>
                <button>{isContentVisible ? <FaChevronUp /> : <FaChevronDown />}</button>
            </div>
            {isContentVisible && <div className="accordion__content show">{children}</div>}
        </div>
    );
};

export default Accordion;