import styled from "styled-components";
import {mobile} from "../responsive";
import React, {useState} from "react";
import {connect} from "react-redux";
import {processLogin, thunkLogout} from "../services/login";
import {authReducer} from "../services/login";
import {jwtDecoder} from "../services/jwtDecoder";
import {actionLogin} from "../services/login";
import {reduce} from "../services/store";
import {store} from "../services/store";
import {shopGQL} from "../services/getQuery";

import { createBrowserHistory } from "history";
import { Router, Route, Switch ,Redirect} from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import Navbar from "../components/Navbar";

const Container = styled.div`
  border: none;
  height: 90vh;
  position: sticky;
  line-height: 30%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://demiart.ru/forum/uploads/post-40044-1202622058.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;

  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;

  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;




export const Login = ({auth, onLogin,onLogout}) =>{
    console.log(auth);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
<div>
    <Navbar/>
        <Container>

            <Wrapper>
                <Title>Авторизация</Title>
                <Form >
                    <Input placeholder="username" type='text' value={login} onChange={(e) => setLogin(e.target.value)}  />
                    <Input placeholder="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                   <Button type="button" disabled={!login.length || !password.length} onClick={() => onLogin(login, password) }  >Войти</Button>


                </Form>
            </Wrapper>
        </Container>
</div>
    );
};


 export const CLoginPage = connect(state => ({auth: state.auth}), {onLogin:processLogin})(Login)


