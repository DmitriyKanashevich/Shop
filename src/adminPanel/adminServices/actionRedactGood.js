import {shopGQL} from "../../services/getQuery";



export const processRedactGood=(id, names, descriptions,prices)=>{
console.log(prices)
    return(dispatch)=>{
        shopGQL(`mutation addGood($id:ID,$name:String,$description:String, $price:Float){
        GoodUpsert(good:{
        _id:$id
            name:$name,
            price:$price
            description:$description,
     
    }) {
        _id
      

    }
      }`, {id, names, descriptions,prices})
    }
}


