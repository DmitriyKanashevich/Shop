import {actionPromise} from "../../services/promiseReduser";
import {shopGQL} from "../../services/getQuery";

let id
if(localStorage.authToken) {
    id = JSON.parse(atob(localStorage.authToken.split('.')[1])).sub.id;
}
else {
    id=""
}
export const actionUserById = () =>
    actionPromise('userById', shopGQL(`query userById{
        UserFindOne(query:"[{\\"_id\\":\\"${id}\\"}]"){
          _id,
        createdAt,
        avatar {
          _id
          createdAt
          text
          url
          originalFileName
        },
        login,
        acl,
        nick
        
        }
    }`, {query: JSON.stringify([])}));
