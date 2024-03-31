import { orderFormApi } from './api'
import {attach, createEffect, createEvent, createStore, sample} from "effector";
import {condition} from "patronum";
import {effector} from "../../shared/utils";

const onSuccess = effector.createInstanceStore(() => {})
const onValidate = effector.createInstanceStore(() => {})

const sendFx = createEffect(orderFormApi.send)

const emailUpdated = createEvent<string>()
const commentUpdated = createEvent<string>()
const fileUpdated = createEvent<File>()
const privacyRead = createEvent<boolean>()

const $isPrivacy = createStore(false)
    .on(privacyRead, (_, payload) => payload)
const $email = createStore<string>('')
    .on(emailUpdated, (_, payload) => payload)
const $comment = createStore<string>('')
    .on(commentUpdated, (_, payload) => payload)
const $file = createStore<File | null>(null)
    .on(fileUpdated, (_, payload) => payload)

const $isDisabled = $isPrivacy.map(state => !state)
const $isLoading = sendFx.pending
const $isValid = $email.map(state => !!state)
const $isError = createStore(false)
    .reset(emailUpdated)

const eventSent = createEvent()
const validated = createEvent()
const unvalidated = createEvent()
const capchaSubmitted = createEvent<unknown>()

condition({
    source: eventSent,
    if: $isValid,
    then: validated,
    else: unvalidated
})

sample({
    clock: validated,
    target: onValidate.trigger,
})

sample({
    clock: capchaSubmitted,
    source: {
        email: $email,
        comment: $comment,
        file: $file,
    },
    target: sendFx,
})

sample({
    clock: unvalidated,
    fn: () => true,
    target: $isError
})

sample({
    clock: sendFx.doneData,
    target: onSuccess.trigger,
})

export const orderFormModel = {
    $email,
    $comment,
    $file,
    $isPrivacy,

    emailUpdated,
    commentUpdated,
    fileUpdated,
    eventSent,
    privacyRead,
    capchaSubmitted,

    $isError,
    $isLoading,
    $isDisabled,
    onSuccess,
    onValidate,
}