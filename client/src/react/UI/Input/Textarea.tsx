import {FC} from "react";
import "./input.scss"

type TextareaPropsType = {
    className?: string,
    placeholder?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}


const Textarea : FC<TextareaPropsType> = ({className, placeholder, value, onChange}) => {
    return (
        <div className={`input-wrapper textarea-wrapper ${className}`}>
            <textarea 
                onChange={onChange}
                value={value}
                className={`input textarea`}
                placeholder={placeholder} />
        </div>

                
    )
}

export default Textarea;