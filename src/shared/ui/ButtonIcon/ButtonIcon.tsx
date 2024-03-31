import * as React from "react";
import {ImageSvg} from "../ImageSvg";

export type ButtonIconProps = {
    className?: string
    href?: string
    tag?: 'button' | 'a'
    icon: string
    size?: 's' | 'm'
    onClick?: () => void
}

const rootClass = 'button-icon'

export const ButtonIcon = React.memo<ButtonIconProps>(({ tag = 'button', href, icon, size = 'm', className, onClick }) => {
    if (tag === 'a') {
        return <a className={`${rootClass} ${rootClass}--size-${size} ${className}`} href={href}>
            <ImageSvg className={`${rootClass}__image`} src={`icons/${icon}`} alt={'icon'}/>
        </a>
    }

    return <button className={`${rootClass} ${rootClass}--size-${size} ${className}`} onClick={onClick}>
        <ImageSvg className={`${rootClass}__image`} src={`icons/${icon}`} alt={'icon'}/>
    </button>
})