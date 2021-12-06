export const jwtDecoder=(jwt)=>{
    let reJwt=jwt.split('.')
    return JSON.parse(reJwt[1])
}

