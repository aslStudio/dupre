import * as React from "react";
import { loginFormModel } from './model'
import {reflect} from "@effector/reflect";
import {Input} from "../../shared/ui/Input/Input";
import {Button} from "../../shared/ui/Button/Button";
import {providers} from "../../shared/utils";

export type LoginFormProps = {
    classes?: string
}

const rootClass = 'login-form'

export const LoginForm = React.memo<LoginFormProps>(({ classes }) => {
    const { open } = providers.modalProvider.useModal()

    loginFormModel.onValidate.set(() => open('login-form'))

    return <div className={`${rootClass} ${classes}`}>
        <EmailInputReflect />
        <PasswordInputReflect />
        <ButtonSubmitReflect>Войти</ButtonSubmitReflect>
    </div>
})

const EmailInputReflect = reflect({
    view: Input,
    bind: {
        value: loginFormModel.$email,
        onInput: loginFormModel.emailUpdated,
        isError: loginFormModel.$isEmailError,
        type: 'email',
        placeholder: 'E-mail',
        classes: `${rootClass}__input`
    }
})

const PasswordInputReflect = reflect({
    view: Input,
    bind: {
        value: loginFormModel.$password,
        onInput: loginFormModel.passwordUpdated,
        isError: loginFormModel.$isPasswordError,
        type: 'password',
        placeholder: 'Пароль',
        classes: `${rootClass}__input`
    }
})

const ButtonSubmitReflect = reflect({
    view: Button,
    bind: {
        onPress: loginFormModel.dataSubmit,
        classes: `${rootClass}__button`
    }
})