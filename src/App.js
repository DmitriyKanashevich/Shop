import './App.css';
import React, { useState } from 'react';
import {Provider, connect}   from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {BrowserRouter as Router, Route, Link, useParams} from 'react-router-dom';
import {DrawMenu} from "./components/Menu";




//promiseReducer
function promiseReducer(state={}, {type, status, payload, error, name}){
    if (type === 'PROMISE'){
        return {
            ...state,
            [name]:{status, payload, error}
        }
    }
    return state
}

const actionPending = name => ({type: 'PROMISE', status: 'PENDING', name})
const actionResolved = (name, payload) => ({type: 'PROMISE', status: 'RESOLVED', name, payload})
const actionRejected = (name, error) => ({type: 'PROMISE', status: 'REJECTED', name, error})
const actionPromise = (name, promise) =>
    async dispatch => {
        dispatch(actionPending(name))
        try{
            let payload = await promise
            dispatch(actionResolved(name, payload))
            return payload
        }
        catch(error){
            dispatch(actionRejected(name, error))
        }
    }

const reduce = combineReducers ({
    promise: promiseReducer,
    auth: authReducer,
    reg: registrReducer
})


const store = createStore(reduce, applyMiddleware(thunk))


//Запрос
const getGQL = url => {
    return (query, variables={}) => fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...(localStorage.authToken ? {Authorization: localStorage.authToken} : {})
        },
        body: JSON.stringify({query, variables})
    }).then(res => res.json()).then(data => {
        if ("errors" in data) {
            let error = new Error('Ошибка загрузки данных')
            throw error
        }
        else {
            return data
        }
    })
}

let shopGQL = getGQL('http://shop-roles.asmer.fs.a-level.com.ua/graphql')

const actionRootCategories = () =>
    actionPromise('rootCategories', shopGQL(`
            query cats($query:String){
              CategoryFind(query:$query){
                _id name 
              }
            }
        `, {CategoryFind:'', query: JSON.stringify([{parent:null}])}))
store.dispatch(actionRootCategories())






const jwtDecoder=(jwt)=>{
    let reJwt=jwt.split('.')
    return JSON.parse(reJwt[1])
}



function registrReducer(state={},action){

    if (action.type==='REGISTRATION'){
        if(!localStorage.authToken){
            return {token: action.jwt, payload: jwtDecoder(action.jwt)}
        }

    }
    return state
}
 function authReducer(state = {}, action) {
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
                console.log('fsdvsfv')
            }
            else{
            return {token: action.jwt, payload: jwtDecoder(action.jwt)}}
        }
        if (action.type === 'LOGOUT') {
            return {}
        }
        return state

    }


    const actionReg=(jwt)=>({type:'REGISTRATION',jwt})
const actionLogin = (jwt) => ({type: 'LOGIN', jwt})




const processRegistration=(login,password,nick)=>{
    return(dispatch)=>{
        shopGQL(`mutation reg($login:String, $password:String,$nick:String){
        UserUpsert(user:{
          login:$login, password:$password, nick:$nick
        }){
          _id
          login
          nick
        }
      }`, {login,password,nick})
    }
}

const RegPage = ({reg, onReg}) =>{
    console.log(reg);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [nick, setNick] = useState('')
    return (
        <div>
            <input type='text' value={login} onChange={(e) => setLogin(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type='text' value={nick} onChange={(e) => setNick(e.target.value)} />

            <button  onClick={() => onReg(login, password,nick)}>Reg</button>

        </div>
    )
}

const CRegPage = connect(state => ({reg: state.reg}), {onReg:processRegistration})(RegPage)


const processLogin = (login, password) => {
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

const actionLogout = () => ({type: 'LOGOUT'})
const thunkLogout = () => {
    return (dispatch) => {
        localStorage.authToken = ''
        dispatch(actionLogout())
    }
}

const LoginPage = ({auth, onLogin,onLogout}) =>{
    console.log(auth);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <input type='text' value={login} onChange={(e) => setLogin(e.target.value)} />
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={!login.length || !password.length} onClick={() => onLogin(login, password)}>Log in</button>
            <button  onClick={() => onLogout()}>Log out</button>

        </div>
    )
}

const CLoginPage = connect(state => ({auth: state.auth}), {onLogin:processLogin,onLogout:thunkLogout})(LoginPage)



store.subscribe(() => console.log(store.getState()))



function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <div className={"main-menu"}>

                    <Router>


                        <Route  component={CLoginPage} />
                        <Route  component={CRegPage} />
                        </Router>


                </div>
            </div>
        </Provider>);
}

export default App;
