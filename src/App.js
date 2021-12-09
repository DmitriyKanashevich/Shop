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
import {UserOrder} from "./userPanel/userOrder";
import {shopGQL} from "./services/getQuery";
import {CPageGoodsRedact} from "./adminPanel/adminComponents/redactGood";
import {CRegPage} from "./pages/Register";
import redactGood from "./adminPanel/adminComponents/redactGood";
import {CUserRedactDrow} from "./userPanel/userComponents/userRedactProfile";
import {CPageUser} from "./userPanel/userComponents/userRedactProfile";
import {AddGood, CAddGood} from "./adminPanel/adminComponents/addGood";
import {CMyDropzone} from "./userPanel/userComponents/userRedactProfile";
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


































function App() {

        return (
        <Provider store={store}>
            <div className="App">





                   <Switch>
                       <Route path="/goods/:_id_good" exact  component={Product}/>
                       <ProtectedRoute  fallback="/" path="/addgood" component={CAddGood}/>
                       <Route path="/Cart" component={Cart} />
                       <Route path="/goodredact/:_id_good" exact  component={redactGood}/>
                       <Route path="/user/:_id" component={CPageUser} />
                       <Route path="/drop" exact  component={CMyDropzone}/>
                       <Route path="/userorder" exact  component={UserOrder}/>
                       <Route path="/usercabinet" exact  component={UserPanel}/>
                       <Route path="/userredact" exact  component={CUserRedactDrow}/>
                        <Route path="/categories/:_id_cat" component={ProductList} />
                        <Route path="/" exact  component={Home}/>
                       <Route path="/Home" exact  component={Home}/>
                       <Route path="/Register" exact   component={CRegPage} />
                        <Route path="/login" exact   component={CLoginPage} />



                   </Switch>





            </div>
        </Provider>);
}

export default App;
