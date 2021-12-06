import {shopGQL} from "./getQuery";
import {actionLogin} from "./login";

export const actionReg=(jwt)=>({type:'REGISTRATION',jwt})
export const processRegistration=(login,password,nick)=>{
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
