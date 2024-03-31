import * as React from "react";
import {ImageSvg} from "../ImageSvg";

export type ButtonIconProps = {
    className?: string
    icon: string
    size?: 's' | 'm'
    onClick: () => void
}

const rootClass = 'button-icon'

export const ButtonIcon = React.memo<ButtonIconProps>(({ icon, size = 'm', className, onClick }) => (
    <button className={`${rootClass} ${rootClass}--size-${size} ${className}`} onClick={onClick}>
        <ImageSvg className={`${rootClass}__image`} src={`icons/${icon}`} alt={'icon'}/>
    </button>
))