import * as React from "react";

import { providers } from "../shared/utils";
import {ModalPresentation, ModalSubmitOrder} from "../feature";
import {ModalName} from "../shared/utils/providers/ModalProvider";

const modals = [
    {
        name: 'presentation' as ModalName,
        component: <ModalPresentation />
    },
    {
        name: 'success-order' as ModalName,
        component: <ModalSubmitOrder />
    }
]

export const WithProviders = React.memo<React.PropsWithChildren>(({ children }) => (
    <providers.modalProvider.ModalProvider modals={modals}>
        {children}
    </providers.modalProvider.ModalProvider>
))