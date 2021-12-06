import React, {useState} from "react";
import {connect} from "react-redux";
import {jwtDecoder} from "./jwtDecoder";

import {shopGQL} from "./getQuery";
export const actionLogin = (jwt) => ({type: 'LOGIN', jwt})

export function authReducer(state = {}, action) {
    if (state === undefined) {
        if (localStorage.authToken) {
            action.jwt = localStorage.authToken
            return {
                token: action.jwt, payload: jwtDecoder(action.jwt)
            }
        }
    }
    if (action.type === 'LOGIN') {
        if(localStorage.authToken){
            console.log('You already login')
            window.location.href = "/"
        }
        else{
            return {token: action.jwt, payload: jwtDecoder(action.jwt)}}
    }
    if (action.type === 'LOGOUT') {
        return {}
    }
    return state

}


export const processLogin = (login, password) => {

    return (dispatch) => {
        shopGQL(`query login($login:String, $password: String) {login(login:$login, password:$password)}`, { login, password })
            .then(jwt => {
                if (jwt) {
                    localStorage.authToken = jwt.data.login
                    console.log(jwt.data.login);

                    dispatch(actionLogin(jwt.data.login))





                } else {
                    throw new Error('wrong')
                }
            })
    }
}


export const actionLogout = () => ({type: 'LOGOUT'})
export const thunkLogout = () => {
    return (dispatch) => {
        localStorage.authToken = ''
        dispatch(actionLogout())
    }
}
