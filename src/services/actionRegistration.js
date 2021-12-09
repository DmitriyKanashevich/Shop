import {shopGQL} from "./getQuery";
import {actionPromise} from "./promiseReduser";

export const actionReg=(jwt)=>({type:'REGISTRATION',jwt})
export const processRegistration=(login,password,nick)=>{
    return(dispatch)=>{

        dispatch(actionPromise('setAvatar'),shopGQL(`mutation reg($login:String, $password:String,$nick:String){
        UserUpsert(user:{
          login:$login, password:$password, nick:$nick
        }){
          _id
          login
          nick
        }
      }`, {login,password,nick}))
alert("Вы зарегестрированы")
    }
}
