import {actionPromise} from "../services/promiseReduser";
import {shopGQL} from "../services/getQuery";
import {store} from "../services/promiseReduser";
import React, { useState, useEffect  } from 'react';
import {useParams} from "react-router-dom";
import {connect,Provider} from "react-redux";



export const actionRootCategories = () =>
    actionPromise('categories', shopGQL(`
            query categories($query:String){
              CategoryFind(query:$query){
                _id name 
              }
            }
        `, {CategoryFind:'', query: JSON.stringify([{parent:null}])}))



export const DrawMenu = () =>{

    const [cats, setCats] = useState([])

    store.subscribe(() => setCats(store.getState().promise.categories.payload?.data?.CategoryFind || []))
    let listCats = cats.map((e) => <li  key={e.name}>{e.name}</li>)
    return(
        <div>
            <ul className={"list-menu"}>
                {listCats}
            </ul>
        </div>
    )
}
