import {connect} from "react-redux";
import {Link, useParams} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {actionUserById} from "../userServices/actionUserById";
import {useDropzone} from "react-dropzone";
import {actionPromise} from "../../services/promiseReduser";
import {shopGQL} from "../../services/getQuery";
import {store} from "../../services/store";
import Navbar from "../../components/Navbar";
import Button from "@mui/material/Button";
import {processRegistration} from "../../services/actionRegistration";
import {processRedact} from "../userServices/actionRedactUser";
const Image = styled.img`
  height: 150px;
  width: 150px;
  z-index: 2;
`;









export const imegesHref = 'http://shop-roles.asmer.fs.a-level.com.ua/';


export const PageUserRedact = ({user: {_id, login, nick, avatar = []}},onRedactUser,redact) => {
    if (avatar) {
        let mapAvatar = Object.values(avatar)
        try {
            var urlImage = mapAvatar[3];
        } catch (e) {
            console.log("no image")
        }
    }
    const [loginName, setLogin] = useState(`${login}`)
    const [myId, setId] = useState(`${_id}`)
    const [nickName, setNickName] = useState(`${nick}`)


        const userPage =
            <div style={{  display: 'flex',  justifyContent:'center', alignItems:'center',flexDirection:"column"}}>


                <h1>Личные данные</h1>
                <h2>Аватар</h2>
                {urlImage ?
                    <>
                    <Image src={imegesHref + urlImage}/>
                    <Button style={{ color: "black", textDecoration:'none' }}><Link  style={{ color: "black", textDecoration:'none' }} to={"/drop"}  >Редактировать изображение</Link></Button>
</>
                    : <><p>Аватар не добавлен</p>
                    <Button style={{ color: "black", textDecoration:'none' }}><Link  style={{ color: "black", textDecoration:'none' }} to={"/drop"}  >Добавить изображение</Link></Button>
</>
                }

                <h2>Ваш ID</h2>
                <p>{_id}</p>

                <input type='text' value={myId} onChange={(e) => setId(e.target.value)}/>

                <h2>Ваш логин</h2>
                <p>{login}</p>
                <input type='text'  value={loginName} onChange={(e) => setLogin(e.target.value)}/>

                <h2>Ваш никнейм</h2>
                <p>{nick}</p>
            <input type='string'  value={nickName} onChange={(e) => setNickName(e.target.value)}/>
                <button onClick={() => orderPush(myId,loginName,nickName)}>CREATE</button>
            </div>

        return (
            <>
                {userPage}
            </>)
    }
export const orderPush = (myId,loginName,nickName) => {
    console.log(myId)
    console.log(loginName)
    shopGQL(`
            mutation regi($myId:String,$loginName:String,$nickName:String){
        UserUpsert(user:{
          _id:$myId,login:$loginName,  nick:$nickName
        }){
          _id
          login
          nick
        }
      }`
        ,  {myId,loginName,nickName}
    )
}


export const CPageUserRedact = connect(state => ({user: state.promise?.userById?.payload?.data?.UserFindOne || {}}))(PageUserRedact)

export const UserDrow = ({userById}) => {

    let {_id_user} = useParams()
    useEffect(() => {
        userById(_id_user)
    }, [_id_user])
    return (
        <>
        <Navbar/>
        <CPageUserRedact/>

</>

    )
}

export const CUserRedactDrow = connect(state => ({redact: state.redact}), {onRedactUser:processRedact,userById: actionUserById})(UserDrow)





export function MyDropzone({onDrop:drp}) {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        drp(acceptedFiles[0])

    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <>
<Navbar/>
            <h1>Перетащите или добавьте изображение</h1>
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Нажмите для выбора изображения или </p> :
                    <p>Нажмите для выбора изображения или перетащите его</p>
            }
        </div>
            </>
    )
}

export const uploadFile = file => {
    let fd = new FormData()
    fd.append('photo', file)
    return fetch('http://shop-roles.asmer.fs.a-level.com.ua/upload', {
        method: 'POST',
        headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
        body: fd
    }).then(res => res.json()) /// сходить в корень бэка и посмотреть исходный код
}

export const actionUploadFile = file =>
    actionPromise('upload', uploadFile(file))

export const actionUserByIdRedact = (_id, promiseName) =>
    actionPromise(promiseName || `user_${_id}`, shopGQL(`
        query UserById($query: String){
            UserFindOne(query: $query){
                _id login avatar {
                    _id url
                }
            }
        }
        `, {query: JSON.stringify([{_id}])}))

export const actionMe = () =>
    async (dispatch, getState) => {
        let myId = getState().auth?.payload?.sub?.id
        if (myId){
            await dispatch(actionUserByIdRedact(myId, 'me'))
        }
    }

export const actionChangeAvatar = avatarId =>
    async (dispatch, getState) => {
        let myId
        if(localStorage.authToken) {
            myId = JSON.parse(atob(localStorage.authToken.split('.')[1])).sub.id;
            console.log(myId)
        }
        else {
            myId=""
        }

        if (myId){
            await dispatch(actionPromise('setAvatar'), shopGQL(`
            mutation setAvatar($myId: String, $avatarId: ID){
                UserUpsert(user:{_id: $myId, avatar: {_id: $avatarId}}){
                    _id,
                 
                     avatar{
                        _id
                    }
                }
            }`, {myId, avatarId}))
        }
    }

export const actionSetAvatar = file =>
    async dispatch => {
        let result = await dispatch(actionUploadFile(file))
        console.log("id: "+result._id)
        //pending + resolved/rejected
        if (result?._id){
            await dispatch(actionChangeAvatar(result._id)) //pending + resolved но уже в graphql
            await dispatch(actionMe()) //pending + resolved по перечитке нашего юзера
            window.location.href = "/usercabinet"


        }
    }


export const CMyDropzone = connect(null, {onDrop: actionSetAvatar})(MyDropzone)




let myId
if(localStorage.authToken) {
    myId = JSON.parse(atob(localStorage.authToken.split('.')[1])).sub.id;
    console.log(myId)
}
else {
    myId=""
}
export const UserProfile = ({user:{login, avatar: {url}}}) =>
    <div className='UserProfile'>
        <h1>{login}</h1>
        <img src={`http://shop-roles.asmer.fs.a-level.com.ua/${url}`} />
    </div>

export const CUserProfile = connect((state, {myId}) => ({user: state.promise?.[`user_${myId}`]?.payload}))(UserProfile)

export const PageUser = ({match:{params: {myId}}, getData}) => {
    useEffect(() => {
        getData(myId)
    },[myId])

    return (
        <div className='PageUser'>
            <CUserProfile _id={myId}/>
        </div>
    )
}

export const CPageUser = connect(null, {getData: actionUserById})(PageUser)




