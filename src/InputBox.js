

const InputBox = ({
    helperText,
    inputClass,
    inputProps,
    mainclass,
    onChangeText,
    title,
    value,
    warningText,
    type,
    disable,
    titleClass,
    noBorders,
    isTextArea, isValidated
}) => {


    const whatInput = (data) => {
        if (onChangeText) { onChangeText(data.target.value); }
    };

    return (
        <div className={` col-sm  d-flex flex-column  mb-4 ${mainclass}`}>
            <div className="d-flex ">

                {title && <div className={`text-nowrap poppins-semibold fs-6 mb-3 ${titleClass}`}>{title}</div>}

            </div>
            <div className={`mainInput d-flex ${noBorders ? '' : 'form-control form-control-lg '} align-item-center ${inputClass}`}>


                {isTextArea ?
                    <textarea
                        autoComplete="off"
                        className="w-100 border-0 mainInput"
                        type={type}
                        name={title}
                        placeholder={title}
                        value={value?.toString()}
                        onChange={whatInput}
                        {...inputProps}
                        disabled={disable}
                        rows={5}
                    />
                    : <input
                        autoComplete="off"
                        className="w-100 h-100 border-0 mainInput"
                        type={type}
                        name={title}
                        placeholder={title}
                        value={value?.toString()}
                        onChange={whatInput}
                        {...inputProps}
                        disabled={disable}

                    />
                }
            </div>

            {warningText && isValidated && value.length > 0 && <span className="warning-text fs-7">{warningText}</span>}
            {helperText && <span className="helper-text fs-6 mt-1">{helperText}</span>}
        </div>
    );
};

export default InputBox;
