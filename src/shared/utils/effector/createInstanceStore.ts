import { attach, createEvent, createStore } from 'effector'

/**
 * @component createInstanceStore
 * @description функция возвращает стор, trigger-effect и update-event для работы с инстансом фукнции
 *
 * @param {(params: P) => void} defaultValue - значние стора по умолчанию
 * @return set - Event обновления значения, trigger - Effect вызова функции, $instance - Store функции
 * */
export const createInstanceStore = <T extends (params: P) => void, P = any>(
    defaultValue: T,
) => {
    const $instance = createStore<T>(defaultValue)

    const set = createEvent<T>()
    $instance.on(set, (_, payload) => payload)

    const trigger = attach({
        source: {
            instance: $instance,
        },
        async effect({ instance }, params: P) {
            instance(params)
        },
    })

    return {
        set,
        trigger,
        $instance,
    }
}
