import * as React from "react";
import {useContext, useState} from "react";

export type ModalName = 'login-form' | 'presentation' | 'success-order'

type Context = {
    open: (modalName: ModalName) => void
    close: () => void
}

const ModalContext = React.createContext<Context>({
    open: () => 0,
    close: () => 0
})

export const ModalProvider = React.memo<React.PropsWithChildren<{
    modals: {
        name: ModalName,
        component: React.ReactNode
    }[]
}>>(({ children, modals }) => {
    const [ activeModal, setActiveModal ] = useState<ModalName | null>(null)

    const open = (modalName: ModalName) => {
        setActiveModal(modalName)
    }

    const close = () => {
        setActiveModal(null)
    }

    return <ModalContext.Provider value={{
        open,
        close,
    }}>
        {children}
        {modals.map(({ name, component }) => {
            if (name === activeModal) {
                return component
            }
        })}
    </ModalContext.Provider>
})

export const useModal = () => useContext(ModalContext)