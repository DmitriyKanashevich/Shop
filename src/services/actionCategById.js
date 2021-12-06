import {shopGQL} from "./getQuery";
import {actionPromise} from "./promiseReduser";
export const actionCategoryById = (_id) =>
    actionPromise('catById', shopGQL(` 
    query catById($query:String){
      CategoryFindOne(query:$query){
      _id name goods{
      _id name price description images{
      url}}}}`,
        {query: JSON.stringify([{_id}])}));
