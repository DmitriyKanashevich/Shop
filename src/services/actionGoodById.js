import {shopGQL} from "./getQuery";
import {actionPromise} from "./promiseReduser";

export const actionGoodById = (_id) =>
    actionPromise('goodById', shopGQL(`query goodById($query:String){
      GoodFindOne(query:$query){
        _id name price description images{
          url
        }
        }
    }`, {query: JSON.stringify([{_id}])}));
