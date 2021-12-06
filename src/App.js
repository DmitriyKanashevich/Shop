import './App.css';
import React from 'react';
import {connect, Provider} from 'react-redux';
import {Route, Redirect, Switch, BrowserRouter as Router} from 'react-router-dom';
import Home from "./pages/Home";
import {store} from "./services/store";
import {actionRootCategories} from "./services/actionCategories";
import Cart from "./pages/Cart";
import {CLoginPage} from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import {useState} from "react";
import {processRegistration} from "./services/actionRegistration";
import {UserPanel} from "./userPanel/UserPanel";
import {AdminPanel} from "./adminPanel/AdminPanel";
import {actionAllOrder} from "./adminPanel/adminServices/actionAllOrder";
import {useDropzone} from "react-dropzone";
import {useCallback} from "react";
import {actionPromise} from "./services/promiseReduser";
import {useEffect} from "react";
import {shopGQL} from "./services/getQuery";

const ProtectedRoute =({isAdmin, auth, component:C, fallback, ...props}) =>{
    const Wrapper = (componentProps)=> {
        isAdmin =JSON.parse(atob(localStorage.authToken.split('.')[1])).sub.acl[2] === 'admin';
        return isAdmin ? <C {...componentProps}/> : <Redirect to={fallback} />
    }
    return <Route {...props} component={Wrapper}/>
}

const saveState = (state) => {
    try {

        const serialisedState = JSON.stringify(state);

        window.localStorage.setItem('app_state', serialisedState);
    } catch (err) {

    }
};
store.subscribe(() => {
    saveState(store.getState());
});

store.subscribe(() => console.log(store.getState()))
store.dispatch(actionAllOrder())
store.dispatch(actionRootCategories())







function MyDropzone({onDrop:drp}) {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        drp(acceptedFiles[0])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

const uploadFile = file => {
    let fd = new FormData()
    fd.append('photo', file)
    return fetch('http://shop-roles.asmer.fs.a-level.com.ua/upload', {
        method: 'POST',
        headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
        body: fd
    }).then(res => res.json()) /// сходить в корень бэка и посмотреть исходный код
}

const actionUploadFile = file =>
    actionPromise('upload', uploadFile(file))

const actionUserById = (_id, promiseName) =>
    actionPromise(promiseName || `user_${_id}`, shopGQL(`
        query UserById($query: String){
            UserFindOne(query: $query){
                _id login avatar {
                    _id url
                }
            }
        }
        `, {query: JSON.stringify([{_id}])}))

const actionMe = () =>
    async (dispatch, getState) => {
        let myId = getState().auth?.payload?.sub?.id
        if (myId){
            await dispatch(actionUserById(myId, 'me'))
        }
    }

const actionChangeAvatar = avatarId =>
    async (dispatch, getState) => {
        let myId
        if(localStorage.authToken) {
            myId = JSON.parse(atob(localStorage.authToken.split('.')[1])).sub.id;
            console.log(myId)
        }
        else {
            myId=""
        }
        if (myId){
            await dispatch(actionPromise('setAvatar'), shopGQL(`
            mutation setAvatar($myId: String, $avatarId: ID){
                UserUpsert(user:{_id: $myId, avatar: {_id: $avatarId}}){
                    _id, avatar{
                        _id
                        
                    }
                }
            }`, {myId, avatarId}))
        }
    }

const actionSetAvatar = file =>
    async dispatch => {
        let result = await dispatch(actionUploadFile(file))
        console.log("id: "+result._id)
        //pending + resolved/rejected
        if (result?._id){
            await dispatch(actionChangeAvatar(result._id)) //pending + resolved но уже в graphql
            await dispatch(actionMe()) //pending + resolved по перечитке нашего юзера
        }
    }


const CMyDropzone = connect(null, {onDrop: actionSetAvatar})(MyDropzone)



const testDefaultJustForCheckLoozer ={
    "_id": "5de56b335ee358137c393889",
    "login": "tst",
    "avatar": {
        "_id": "5e348322ff46c6326de8c2f1",
        "url": "images/8ba00060c8ceae2f4d213986df1b7158"
    }
}

let myId
if(localStorage.authToken) {
    myId = JSON.parse(atob(localStorage.authToken.split('.')[1])).sub.id;
    console.log(myId)
}
else {
    myId=""
}
const UserProfile = ({user:{login, avatar: {url}}}) =>
    <div className='UserProfile'>
        <h1>{login}</h1>
        <img src={`http://shop-roles.asmer.fs.a-level.com.ua/${url}`} />
    </div>

const CUserProfile = connect((state, {myId}) => ({user: state.promise?.[`user_${myId}`]?.payload}))(UserProfile)

const PageUser = ({match:{params: {myId}}, getData}) => {
    useEffect(() => {
        getData(myId)
    },[myId])

    return (
        <div className='PageUser'>
            <CUserProfile _id={myId}/>
        </div>
    )
}

const CPageUser = connect(null, {getData: actionUserById})(PageUser)















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

















function App() {

        return (
        <Provider store={store}>
            <div className="App">





                   <Switch>
                       <Route path="/goods/:_id_good" exact  component={Product}/>
                       <ProtectedRoute  fallback="/auth" path="/vsd" component={ProductList}/>

                       <Route path="/user/:_id" component={CPageUser} />

                       <Route path="/drop" exact  component={CMyDropzone}/>
                       <Route path="/Cart" exact  component={Cart}/>
                       <Route path="/usercabinet" exact  component={UserPanel}/>
                        <Route path="/categories/:_id_cat" component={ProductList} />
                        <Route path="/" exact  component={Home}/>
                        <Route path="/Home"  exact component={Home}  />
                       <Route path="/admin"  exact component={AdminPanel}  />
                       <Route path="/Register" exact   component={CRegPage} />
                        <Route path="/login" exact   component={CLoginPage} />



                   </Switch>





            </div>
        </Provider>);
}

export default App;
