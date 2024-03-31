import * as React from "react";
import {ButtonIcon} from "../ButtonIcon";
import {providers} from "../../utils";
import {useEffect, useState} from "react";

export type ModalProps = React.PropsWithChildren<{
    classes?: string
}>

const rootClass = 'modal'

export const Modal = React.memo<ModalProps>(({ children, classes }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { close } = providers.modalProvider.useModal()

    const onClose = () => {
        setIsOpen(false)
        document.body.style.overflow = 'unset'
        setTimeout(() => {
            close()
        }, 300)
    }

    useEffect(() => {
        setIsOpen(true)
        document.body.style.overflow = 'hidden'
    }, []);

    return <div className={`${rootClass} ${classes} ${isOpen ? 'is-open' : ''}`}>
        <div className={`${rootClass}__overlay`} />
        <div className={`${rootClass}__wrapper`}>
            <ButtonIcon className={`${rootClass}__close`} size={'s'} icon={'cross'} onClick={onClose} />
            <div className={`${rootClass}__main`}>
                {children}
            </div>
        </div>
    </div>
})