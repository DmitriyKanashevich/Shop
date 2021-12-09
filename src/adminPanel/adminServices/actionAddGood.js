import {shopGQL} from "../../services/getQuery";



export const processAddGood=(name,price,description,idCati,catNamei,img)=>{

    return(dispatch)=>{
        shopGQL(`mutation addGood($name:String, $price:Float,$description:String,$idCati:ID,$catNamei:String!,$img:ID){
        GoodUpsert(good:{
        
            name:$name,
            price:$price,
            images:{_id:$img},
            description:$description,
        categories:{name:$catNamei,_id:$idCati}
    }) {
        _id
        description,
            price,
            name,
            categories {
            _id
            createdAt
            name
        }

    }
      }`, {name,price,description,idCati,catNamei,img})
    }
}


