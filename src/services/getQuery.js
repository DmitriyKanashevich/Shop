export const getGQL = url => {
    return (query, variables={}) => fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...(localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {})
        },
        body: JSON.stringify({query, variables})
    }).then(res => res.json()).then(data => {
        if (!data) {
            let error = new Error('Error data loading')
            throw error
        }
        else {
            return data
        }
    })
}
export const urlUpload = "http://shop-roles.asmer.fs.a-level.com.ua";

export const  shopGQL = getGQL('http://shop-roles.asmer.fs.a-level.com.ua/graphql')
