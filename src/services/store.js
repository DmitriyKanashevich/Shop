import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {promiseReducer} from "./promiseReduser";
import {authReducer} from "./login";
import {registrReducer} from "./registrationReducer";
import cartReducer from "./cartReducer";
import {actionUserById} from "../userPanel/userServices/actionUserById";
import {actionAllOrder} from "../adminPanel/adminServices/actionAllOrder";
import { processAddGood} from "../adminPanel/adminServices/actionAddGood";
import {getCategoriesCount} from "../adminPanel/adminServices/actionGetCategories";
import {processRedact} from "../userPanel/userServices/actionRedactUser";
import {processRedactGood} from "../adminPanel/adminServices/actionRedactGood";
export const reduce = combineReducers ({
    promise: promiseReducer,
    auth: authReducer,
    reg: registrReducer,
    cart:  cartReducer,
    userById: actionUserById,
    AllOrder: actionAllOrder,
    getCat: getCategoriesCount,
    onRedactUser:processRedact,
    addGood:processAddGood,
    redactGood:processRedactGood
})


export const store = createStore(reduce, applyMiddleware(thunk))