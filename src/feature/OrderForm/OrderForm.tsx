import * as React from "react";

import { orderFormModel } from './model'
import {reflect} from "@effector/reflect";
import {Input} from "../../shared/ui/Input/Input";
import {Button} from "../../shared/ui/Button/Button";
import {Checkbox, Link} from "../../shared/ui";
import {providers} from "../../shared/utils";

export type OrderFormProps = {
    classes?: string
}

const rootClass = 'order-form'

export const OrderForm = React.memo<OrderFormProps>(({ classes }) => {
    const { open } = providers.modalProvider.useModal()

    orderFormModel.onValidate.set(() => open('success-order'))

    return <div className={`${rootClass} ${classes}`}>
        <InputEmailReflect />
        <InputFileReflect />
        <InputCommentReflect />
        <ButtonReflect>
            Оставить заявку
        </ButtonReflect>
        <CheckboxReflect>
            Согласен с <Link href={"#"}>политикой обработки персональных данных</Link>
        </CheckboxReflect>
    </div>
})

const InputEmailReflect = reflect({
    view: Input,
    bind: {
        value: orderFormModel.$email,
        onInput: orderFormModel.emailUpdated,
        isError: orderFormModel.$isError,
        type: 'email',
        placeholder: 'Ваш E-mail',
        classes: `${rootClass}__input`
    }
})

const InputFileReflect = reflect({
    view: Input,
    bind: {
        // @ts-ignore
        value: orderFormModel.$file,
        // @ts-ignore
        onInput: orderFormModel.fileUpdated,
        type: 'file',
        placeholder: 'Прикрепить файл',
        classes: `${rootClass}__input`
    }
})

const InputCommentReflect = reflect({
    view: Input,
    bind: {
        value: orderFormModel.$comment,
        onInput: orderFormModel.commentUpdated,
        isTextarea: true,
        placeholder: 'Комментарий',
        classes: `${rootClass}__input`
    }
})

const CheckboxReflect = reflect({
    view: Checkbox,
    bind: {
        value: orderFormModel.$isPrivacy,
        onChange: orderFormModel.privacyRead,
        classes: `${rootClass}__checkbox`
    }
})

const ButtonReflect = reflect({
    view: Button,
    bind: {
        onPress: orderFormModel.eventSent,
        isLoading: orderFormModel.$isLoading,
        isDisabled: orderFormModel.$isDisabled,
        classes: `${rootClass}__button`
    }
})