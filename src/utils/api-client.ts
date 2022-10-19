import { QueryCache } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'

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
    { data, token, headers: customHeaders, ...customConfig }: { data?: any, token?: string | null, headers?: any } & RequestInit = {},
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

    return fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${endpoint}`, config).then(async response => {
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

async function queryClient(endpoint: string,
    method: "GET" | "POST" | "PUT",
    { data, withToken, headers, ...customConfig }: Parameters<typeof client>['2'] & { withToken?: boolean }) {
    let token: null | string = null;
    if (withToken) {
        const session = await getSession();
        token = session?.accessToken as string
        console.log('toknee', session)
    }
    return await client(endpoint, method, {
        data: data,
        token,
        headers,
        ...customConfig
    })
}

export { client, queryClient }


