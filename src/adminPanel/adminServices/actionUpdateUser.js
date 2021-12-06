import {shopGQL} from "../../services/getQuery";

import {actionPromise} from "../../services/promiseReduser";
export const actionUserUpdate = (data) => {

    return async dispatch => {
        const queryJson = JSON.stringify(
            {
                user: data
            }
        )
        await dispatch(actionPromise('newUser', shopGQL(
            `mutation updateMe($user:UserInput){
                UserUpsert(user: $user){
                  _id
                  nick
                  login
                  avatar{
                  url
                  }
                }
              }`, queryJson
        )))
    }

}

export default actionUserUpdate;