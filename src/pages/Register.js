import styled from "styled-components";
import { mobile } from "../responsive";
import React, {useState} from "react";
import {connect} from "react-redux";
import {processRegistration} from "../services/actionRegistration";
import {Link} from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;










export const onHomePage=()=>{
    return  window.location.href = "/"
}


export const Register = ({reg, onReg}) => {
    console.log(reg);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [nick, setNick] = useState('')

    return (
        <Container>
            <Wrapper>
                <Title>Создать новый акаунт</Title>
                <Form>

                  <input type='text' value={login} placeholder={"Логин"} onChange={(e) => setLogin(e.target.value)} />

                    <input type='password' value={password} placeholder={"Пароль"}  onChange={(e) => setPassword(e.target.value)} />

                  <input type='text' value={nick} placeholder={"Никнейм"} onChange={(e) => setNick(e.target.value)} />

                  <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={() => onReg(login, password,nick)}>Зарегестрироваться</Button>
                    <Button ><Link to={"/Home"} style={{ color: "white", textDecoration:'none' }}>  На главную
                    </Link> </Button>
                </Form>
            </Wrapper>
        </Container>
    );
};


export const CRegPage = connect(state => ({reg: state.reg}), {onReg:processRegistration})(Register)


