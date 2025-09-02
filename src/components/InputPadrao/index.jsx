import styles from './styles.module.css';
import { useState, useRef, useMemo } from "react";
import Select from '../../assets/select-ui';
import DatePicker from '../../assets/date-ui';
import Tooltip from '../TooltipPadrao';

const applyMask = (value, pattern) => {
    const patterns = pattern.split("|").map(p => p.trim());
    const numericValue = value.replace(/\D/g, "");
    const selectedPattern = patterns.find(p => {
        const countDigits = (p.match(/9/g) || []).length;
        return numericValue.length <= countDigits;
    }) || patterns[patterns.length - 1];
    let maskedValue = "";
    let valueIndex = 0;
    for (let i = 0; i < selectedPattern.length; i++) {
        if (valueIndex >= numericValue.length) break;
        const patternChar = selectedPattern[i];
        const currentChar = numericValue[valueIndex];
        if (patternChar === "9" && /\d/.test(currentChar)) {
            maskedValue += currentChar;
            valueIndex++;
        } else if (patternChar === "A" && /[a-zA-Z]/.test(currentChar)) {
            maskedValue += currentChar;
            valueIndex++;
        } else if (patternChar !== "9" && patternChar !== "A") {
            maskedValue += patternChar;
        }
    }
    return maskedValue;
};

const UseInputMask = (pattern = null, type = "text", initialValue = "") => {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef(null);

    const handleChange = (e) => {
        const input = e.target.value;
        if (type === "both") {
            const hasLetter = /[a-zA-Z]/.test(input);
            if (hasLetter || !pattern) {
                setValue(input);
            } else {
                const rawValue = input.replace(/\D/g, "");
                setValue(applyMask(rawValue, pattern));
            }
        } else if (type === "number") {
            const rawValue = input.replace(/\D/g, "");
            setValue(pattern ? applyMask(rawValue, pattern) : rawValue);
        } else {
            setValue(input);
        }
    };
    return [value, handleChange, inputRef];
};

const InputField = ({ width, gap, label, required, children, fieldStyle = {} }) => {
    const fieldStyles = useMemo(() => ({
        ...(width && { maxWidth: `calc(${width}% - ${gap !== undefined ? gap : 0.5}rem)` }),
        ...fieldStyle
    }), [width, gap, fieldStyle]);

    return (
        <div className={styles.inputField} style={fieldStyles}>
            {label !== false && (
                <label className={styles.inputLabel}>
                    {label} {required && <span className={styles.required}>*</span>}
                </label>
            )}
            {children}
        </div>
    );
};

const InputButton = ({ item, buttonStyle, className }) => {
    const button = (
        <button className={`${styles.inputButton} ${className}`} style={buttonStyle} onClick={item.onClick}>
            {item.text && <span>{item.text}</span>}
            {item.icon && <i className={item.icon} />}
        </button>
    );
    return item.tooltip ? <Tooltip text={item.tooltip}>{button}</Tooltip> : button;
};

const InputPadrao = ({
    type = "text",
    icon,
    value,
    onChange,
    inputRef,
    placeholder,
    required,
    identifier,
    className,
    contentStyle = {},
    fieldStyle = {},
    inputStyle = {},
    iconStyle = {},
    options = [],
    upperCase,
    lowerCase,
    readOnly,
    disabled,
    defaultSelect = true,
    searchable,
    onBlur,
    multiple,
    inputButtonLeft,
    inputButtonRight,
    passwordIcon = true,
    ...props
}) => {
    const [inputVisible, setInputVisible] = useState(false);

    const defaultIcons = useMemo(() => ({
        text: "",
        email: "fas fa-envelope",
        password: "fas fa-lock",
        number: "fas fa-hashtag",
        tel: "fas fa-phone",
        date: "fas fa-calendar-days",
        'datetime-local': "fas fa-calendar-days",
        time: "fas fa-clock",
        select: "fas fa-chevron-down",
        search: "fas fa-search",
        file: "fas fa-file"
    }), []);

    const getIcon = () => icon || defaultIcons[type] || defaultIcons.text;

    const inputStyles = useMemo(() => ({
        ...(upperCase && { textTransform: 'uppercase' }),
        ...(lowerCase && { textTransform: 'lowercase' }),
        ...(['text', 'date', 'number'].includes(type) && { width: '100%' }),
        ...(inputButtonRight && { borderTopRightRadius: 0, borderBottomRightRadius: 0 }),
        ...(inputButtonLeft && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
        ...inputStyle
    }), [upperCase, lowerCase, type, icon, inputStyle]);

    const commonProps = {
        value,
        onChange,
        placeholder,
        required,
        id: identifier,
        ref: inputRef,
        readOnly,
        disabled,
        style: inputStyles,
        onBlur,
        ...props,
    };

    const renderInput = () => {
        switch (type) {
            case "select":
                return <Select {...commonProps} identifier={identifier} options={options} defaultSelect={defaultSelect} icon={getIcon()} iconStyle={iconStyle} searchable={searchable} multiple={multiple} inputButtonLeft={inputButtonLeft} inputButtonRight={inputButtonRight}/>;
            case "date":
            case "data completa":
            case "mes e dia":
            case "apenas dia":
            case "competencia":
            case "data e hora":
            case "apenas hora":
            case "apenas ano":
                return <DatePicker {...commonProps} type={type === 'date' ? 'data completa' : type} />;
            case "password":
                return (
                    <>
                        <input {...commonProps} className={className || styles.inputPadrao} type={inputVisible ? "text" : "password"} />
                        <div className={styles.iconsContainer}>
                            {passwordIcon && <i className={`fas fa-${inputVisible ? "eye-slash" : "eye"} ${styles.eyeIcon}`} onClick={() => setInputVisible(!inputVisible)} />}
                            {icon !== false && <i className={getIcon()} style={iconStyle} />}
                        </div>
                    </>
                );
            case 'textarea':
                const textareaStyle = {
                    lineBreak: "anywhere",
                    padding: '0.5rem 1rem',
                    height: 'auto',
                    minHeight: '100px',
                    overflow: 'hidden',
                    lineHeight: '1rem',
                };
                return <textarea {...commonProps} className={className || styles.inputPadrao} style={{ ...commonProps.style, ...textareaStyle }} />;
            case 'file':
                return (
                    <>
                        <input {...commonProps} className={className || styles.inputPadrao} type="file" />
                        {icon !== false && <i className={getIcon()} style={iconStyle} />}
                    </>
                );
            default:
                return (
                    <>
                        <input {...commonProps} className={className || styles.inputPadrao} type={type} />
                        {icon !== false && <i className={getIcon()} style={iconStyle} />}
                    </>
                );
        }
    };

    return (
        <div className={styles.inputPadraoContent} style={contentStyle}>
            {inputButtonLeft?.map((item, index) => <InputButton key={index} item={item} buttonStyle={item.style} className={`${index === 0 ? styles.firstButton : ''} ${styles.inputButtonLeft} ${item.className}`} />)}
            <div className={styles.inputPadraoField} style={fieldStyle}>
                {renderInput()}
            </div>
            {inputButtonRight?.map((item, index) => <InputButton key={index} item={item} buttonStyle={item.style} className={`${index === inputButtonRight.length - 1 ? styles.lastButton : ''} ${styles.inputButtonRight} ${item.className}`} />)}
        </div>
    );
};

const UseInputPadrao = ({ label, identifier, required, width, gap, type = "text", value, onChange, inputRef, fieldStyle = {}, ...props }) => (
    <InputField {...{ label, identifier, required, width, gap, fieldStyle }}>
        <InputPadrao {...{ type, value, onChange, identifier, inputRef, ...props }} />
    </InputField>
);

export { UseInputPadrao, InputField, InputPadrao, UseInputMask };