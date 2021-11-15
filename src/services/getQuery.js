export const getGQL = url => {
    return function (query, variables = {}) {
        return fetch(url, {
            method: 'POST',
            headers:
                {
                    'Content-Type': 'application/json',
                    ...(localStorage.authToken ? {Authorization: localStorage.authToken} : {})
                },
            body: JSON.stringify({query, variables})
        }).then(resp => resp.json())
            .then(data => {
                if ('error' in data) {
                    throw new Error('ERROR')
                } else {
                    return data
                }
            })
    }
}
export const shopGQL = getGQL('http://shop-roles.asmer.fs.a-level.com.ua/graphql')