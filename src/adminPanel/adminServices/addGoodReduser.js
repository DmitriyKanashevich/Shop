import {jwtDecoder} from "./jwtDecoder";
import {store} from "./store";
import {actionRootCategories} from "./actionCategories";
import {processRegistration} from "./actionRegistration";

export function addGoodReducer(state={},action){

    if (action.type==='ADDGOOD'){
        if(!localStorage.authToken){
            return {token: action.jwt, payload: jwtDecoder(action.jwt)}
        }
    }
    return state
}
