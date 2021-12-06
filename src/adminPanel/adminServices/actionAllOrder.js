import {shopGQL} from "../../services/getQuery";
import {actionPromise} from "../../services/promiseReduser";

export const actionAllOrder = () =>
    actionPromise('AllOrder', shopGQL(` 
    query AllOrder($query:String){
        OrderFind(query:$query){
    total,
    orderGoods {
      total,
      price
      count
      total,
      good {
        name
        price
        images {
          url
        }
      }
    },
    createdAt,
     owner {
      _id
      createdAt
      login
      nick
    }
        }
    }`,
        {query: JSON.stringify([{}])}));
