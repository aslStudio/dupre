import * as React from "react";
import ReCAPTCHA  from "react-google-recaptcha";
import {Modal} from "../../shared/ui";
import {useState} from "react";
import {reflect} from "@effector/reflect";
import {orderFormModel} from "./model";

const rootClass = 'modal-success-order'

export const ModalSubmitOrder = () => {
    const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false)

    orderFormModel.onSuccess.set(() => setIsCaptchaSuccess(true))

    return <Modal classes={rootClass}>
        {isCaptchaSuccessful ? (
            <h4>Ваша заявка принята</h4>
        ) : (
            <CaptchaReflect />
        )}
    </Modal>
}

const CaptchaReflect = reflect({
    view: ReCAPTCHA,
    bind: {
        sitekey: '6LeOjqopAAAAAO8vmw5i4s2KePWlsobGixigUaWE',
        onChange: orderFormModel.capchaSubmitted,
    }
})