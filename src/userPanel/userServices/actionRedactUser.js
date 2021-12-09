import {shopGQL} from "../../services/getQuery";
export const actionReg=(jwt)=>({type:'REGISTRATION',jwt})
export const processRedact=(id,loginName,nickName)=>{
    return(dispatch)=>{
        shopGQL(`mutation reg($id:String,$login:String,$nick:String){
        UserUpsert(user:{
          _id:$id,login:$login,  nick:$nick
        }){
          _id
          login
          nick
        }
      }`, {id,loginName,nickName})
    }
}
