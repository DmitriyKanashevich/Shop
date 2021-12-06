import {actionPromise} from "../../services/promiseReduser";
import {shopGQL} from "../../services/getQuery";
const urlUpload = "http://shop-roles.asmer.fs.a-level.com.ua";


export const actionImgOne = (_id) => {
    const queryJson = JSON.stringify([{
        "_id": `${_id}`
    }]);
    return (actionPromise('image', shopGQL(
        `query findImg($query: String)  {
      ImageFindOne(query: $query) {
        _id
        createdAt
        url
      }
    }`, {query: queryJson}
    )))
}

export const updateImgAction = selectedFile => {
    const formData = new FormData();

    formData.append('photo', selectedFile);

    return actionPromise("photo", fetch(`${urlUpload}/upload`, {
        method: 'POST',
        headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
        body: formData,
    }).then((response) => response.json()))
};






