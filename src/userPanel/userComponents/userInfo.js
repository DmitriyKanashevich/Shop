import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import React, {useCallback, useEffect} from "react";
import styled from "styled-components";
import {actionUserById} from "../userServices/actionUserById";
import {useDropzone} from "react-dropzone";
import {actionPromise} from "../../services/promiseReduser";
import {shopGQL} from "../../services/getQuery";

const Image = styled.img`
  height: 150px;
  width: 150px;
  z-index: 2;
`;
export const imegesHref = 'http://shop-roles.asmer.fs.a-level.com.ua/';

export const PageUser = ({user: {_id, login, nick, avatar = []}}) => {
if(avatar){
    let mapAvatar = Object.values(avatar)
    try {
        var urlImage = mapAvatar[3];
    } catch (e) {
        console.log("no image")
    }}
    const userPage =
        <div>
            <h1>Личные данные</h1>
            <h2>Аватар</h2>
            {urlImage ?
                <Image src={imegesHref + urlImage}/>
                : <p>Аватар не добавлен</p>}
            <h2>Ваш ID</h2>
            <p>{_id}</p>
            <h2>Ваш логин</h2>
            <p>{login}</p>
            <h2>Ваш никнейм</h2>
            <p>{nick}</p>
        </div>

    return (
        <>
            {userPage}
        </>)
}

export const CPageUser = connect(state => ({user: state.promise?.userById?.payload?.data?.UserFindOne || {}}))(PageUser)

export const UserDrow = ({userById}) => {
    let {_id_user} = useParams()
    useEffect(() => {
        userById(_id_user)
    }, [_id_user])
    return (
        <CPageUser/>


    )
}

export const CUserDrow = connect(null, {userById: actionUserById})(UserDrow)










