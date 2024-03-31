import * as React from "react";
import {ImageSvg} from "../ImageSvg";
import {useState} from "react";

export type InputProps = {
    value: string | File
    onInput: (newValue: string | File) => void
    placeholder: string
    type?: 'file' | 'email' | 'text' | 'password'
    isError?: boolean
    isTextarea?: boolean
    icon?: string
    classes?: string
}

const rootClass = 'input'

export const Input = React.memo<InputProps>(({ classes, value, onInput, icon, isTextarea, placeholder, type, isError }) => {
    const [ fileName, setFileName ] = useState('')

    return <div className={`${rootClass} ${isError ? 'is-error' : ''} ${classes ?? ''}`}>
        {!isTextarea && (
            <>
                {type === 'file'
                    ? (
                        <>
                            <input className={`${rootClass}__file`} type={'file'} onChange={e => {
                                if (e.target.files && e.target.files[0]) {
                                    onInput(e.target.files[0])
                                    setFileName(e.target.files[0].name)
                                }
                            }}/>
                            <p className={`${rootClass}__value ${rootClass}__file-field`}>{fileName || placeholder}</p>
                        </>
                    )
                    : (
                        <input
                            className={`${rootClass}__value`}
                            type={type}
                            value={`${value}`}
                            placeholder={placeholder}
                            onChange={e => onInput(e.target.value)}
                        />
                    )
                }
            </>
        )}
        {isTextarea && (
            <textarea
                className={`${rootClass}__value`}
                value={`${value}`}
                rows={3}
                placeholder={placeholder}
                onChange={e => onInput(e.target.value)}
            />
        )}
        {icon && (
            <ImageSvg className={`${rootClass}__icon`} src={`icons/${icon}`} alt={'icon'} />
        )}
    </div>
})