import * as React from "react";
import {ImageSvg} from "../ImageSvg";

export type CheckboxProps = React.PropsWithChildren<{
    classes?: string
    value: boolean
    onChange: (value: boolean) => void
}>

const rootClass = 'checkbox'

export const Checkbox = React.memo<CheckboxProps>(({ classes, value, onChange, children }) => {
    return <div className={`${rootClass} ${classes ?? ''} ${value ? 'is-active' : ''}`} onClick={() => onChange(!value)}>
        <span className={`${rootClass}__value`}>
            <ImageSvg className={`${rootClass}__icon`} src={'./icons/check'} alt={'icon'} />
        </span>
        <p className={`${rootClass}__text`}>{children}</p>
    </div>
})