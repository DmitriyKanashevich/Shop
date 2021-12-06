import {jwtDecoder} from "./jwtDecoder";
import {store} from "./store";
import {actionRootCategories} from "./actionCategories";
import {processRegistration} from "./actionRegistration";

export function registrReducer(state={},action){

    if (action.type==='REGISTRATION'){
        if(!localStorage.authToken){
            return {token: action.jwt, payload: jwtDecoder(action.jwt)}

        }

    }
    return state
}
