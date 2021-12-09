import {shopGQL} from "./getQuery";


export const orderPush = (basketGoods) => {
    const refactArray = (arr) =>
        arr.map(item=>Object.assign({},{good:{_id:item._id},count:Number(item.qty)}))

    shopGQL(`
            mutation newOrder($order:OrderInput){
                OrderUpsert(order:$order){
                    _id
   			            }
   			}`
        , {order: {orderGoods:refactArray(basketGoods)}}
    )
}


