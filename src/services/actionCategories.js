import {shopGQL} from "./getQuery";

import {actionPromise} from "./promiseReduser";

export const actionRootCategories = () =>
    actionPromise('rootCategories', shopGQL(`
          query cats($query:String){
            CategoryFind(query:$query){
              _id name 
            }
          }`,
        {query: JSON.stringify([{parent:null}])}))
