export const orderFormApi = {
    send: async (data: {
        email: string
        comment: string
        file: File | null
    }) => {
        const body = new FormData()
        body.append('email', data.email)
        body.append('comment', data.comment)
        if (data.file) {
            body.append('file', data.file)
        }

        await fetch('/order', {
            method: 'POST',
            body,
        })
    }
}