import * as React from "react";
import {Modal} from "../../shared/ui";
import {Button} from "../../shared/ui/Button/Button";

const rootClass = 'login-form-modal'

export const LoginFormModal = () => {
    return <Modal classes={rootClass}>
        <h4>Ваш проект не найден. Обратитесь к вашему менеджеру</h4>
    </Modal>
}