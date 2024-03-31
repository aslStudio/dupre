import {effector} from "../../shared/utils";
import {combine, createEvent, createStore, sample} from "effector";
import {and, condition, not} from "patronum";

const onValidate = effector.createInstanceStore(() => {})

const emailUpdated = createEvent<string>()
const passwordUpdated = createEvent<string>()

const $email = createStore<string>('')
    .on(emailUpdated, (_, payload) => payload)
const $password = createStore<string>('')
    .on(passwordUpdated, (_, payload) => payload)

const dataSubmit = createEvent()
const $isEmailValidated = createStore(false)
    .on(dataSubmit, () => true)
const $isPasswordValidated = createStore(false)
    .on(dataSubmit, () => true)

const $isEmailEmpty = $email.map(state => !state)
const $isPasswordEmpty = $password.map(state => !state)

const $isEmailError = and($isEmailEmpty, $isEmailValidated)
const $isPasswordError = and($isPasswordEmpty, $isPasswordValidated)
const $isValid = and(not($isEmailError), not($isPasswordError))

condition({
    source: dataSubmit,
    if: $isValid,
    then: onValidate.trigger
})

export const loginFormModel = {
    $email,
    $password,

    passwordUpdated,
    emailUpdated,
    dataSubmit,

    $isEmailError,
    $isPasswordError,

    onValidate,
}