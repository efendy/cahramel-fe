import { QueryCache } from '@tanstack/react-query'

const queryCache = new QueryCache({
    onError: error => {
        console.log(error)
    },
    onSuccess: data => {
        console.log(data)
    }
})

async function client(
    endpoint: string,
    method: "GET" | "POST" | "PUT",
    { data, token, headers: customHeaders, ...customConfig }: { data?: any, token?: string, headers?: any } & RequestInit = {},
) {
    const config: RequestInit = {
        method,
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders,
        },
        ...customConfig,
    }

    return fetch(`${process.env.STRAPI_URL}/api/${endpoint}`, config).then(async response => {
        if (response.status === 401) {
            queryCache.clear()
            //   await auth.logout() //TODO: logout
            // refresh the page for them
            window.location.assign(window.location as unknown as string)
            return Promise.reject({ message: 'Please re-authenticate.' })
        }
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export { client }
