import * as React from "react";
import {Loader} from "../Loader";

export type ButtonProps = React.PropsWithChildren<{
    classes?: string
    onPress?: () => void
    isLoading?: boolean
    isDisabled?: boolean
    tag?: 'button' | 'a'
    href?: string
    download?: boolean
}>

const rootClass = 'button'

export const Button = React.memo<ButtonProps>(({ children, isDisabled, onPress, isLoading = false, ...props }) => {
    return <Wrapper {...props} isLoading={isLoading} isDisabled={isDisabled} onPress={(isLoading || isDisabled) ? () => 0 : onPress}>
        <div className={`${rootClass}__content`}>{children}</div>
        <Loader classes={`${rootClass}__loader`} />
    </Wrapper>
})

const Wrapper = React.memo<ButtonProps>(({ tag = 'button', children, href = '', download = false, onPress, classes, isLoading = false, isDisabled = false }) => {
    if (tag === 'a') {
        return (
            <a
                className={`${rootClass} ${isLoading ? 'is-loading' : ''} ${isDisabled ? 'is-disabled' : ''} ${classes ?? ''}`}
                href={href}
                download={download}>
                {children}
            </a>
        )
    }

    return (
        <button
            className={`${rootClass} ${isLoading ? 'is-loading' : ''} ${isDisabled ? 'is-disabled' : ''} ${classes ?? ''}`}
            onClick={onPress}>
            {children}
        </button>
    )
})