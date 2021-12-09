import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, {useState} from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {store} from "../services/store";
import {Link} from "react-router-dom";
import {actionRootCategories} from "../services/actionCategories";
import CategoryItem from "./CategoryItem";
import {CartPage} from "../pages/Cart";

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
const Container = styled.div`
  
  height: 250px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;


const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const CategoryStyle = styled.div`

  


`;




export const Category = () =>{
    try {
        const [cats, setCats] = useState([])
        store.subscribe(() => setCats(store.getState().promise.rootCategories.payload?.data?.CategoryFind))
        var cat = cats.map((e) =>
            <li  key={e._id}> <Link to={`/categories/${e._id}`}>{e.name}</Link></li>)
    }
    catch (error) {
        console.log('err')
    }

    return(
        <div className={"menu-li"}>

            <ul className={"menu"} >
                {cat}
            </ul>

        </div>
    )
}




const Navbar = () => {


    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (
        <Container>
            <Wrapper>
                <Left>
                    {
                        !localStorage.authToken?
                            <ButtonGroup variant="text" aria-label="text button group">
                                <Button ><Link to={"/login"} style={{ color: "black", textDecoration:'none' }}>  Авторизация
                                </Link>   </Button >

                                <Button ><Link  to={'/Register'} style={{ color: "black", textDecoration:'none' }}>   Регистрация</Link>   </Button >
                            </ButtonGroup>
                            :JSON.parse(atob(localStorage.authToken.split('.')[1])).sub.acl[2] ?
                                <ButtonGroup variant="text" aria-label="text button group">
                                    <Button ><Link to={"/usercabinet"}  style={{ color: "black", textDecoration:'none' }}>Личный кабинет</Link></Button>
                                    <Button onClick={() => {window.location.reload()}}><Link to={"/userorder"}  style={{ color: "black", textDecoration:'none' }}>Заказы пользователей</Link></Button>
                                    <Button ><Link to={"/addgood"}  style={{ color: "black", textDecoration:'none' }}>Добавить товар</Link></Button>
                                    <Button onClick={() => {localStorage.authToken="";    window.location.reload();}} style={{ color: "black", textDecoration:'none' }}>Выйти</Button>
                                </ButtonGroup>:
                                <ButtonGroup variant="text" aria-label="text button group">
                                    <Button ><Link to={"/usercabinet"}  style={{ color: "black", textDecoration:'none' }}>Личный кабинет</Link></Button>
                                    <Button onClick={() => {window.location.reload()}}><Link to={"/userorder"}  style={{ color: "black", textDecoration:'none' }}>Мои заказы</Link></Button>
                                    <Button onClick={() => {localStorage.authToken="";    window.location.reload();}} style={{ color: "black", textDecoration:'none' }}>Выйти</Button>


                                </ButtonGroup>
                    }

                </Left>
                <Center>
                    <Link to={'/'} style={{ color: "black", textDecoration:'none' }}> <Logo>SHOP</Logo> </Link>


                </Center>
                <Right>

                    <MenuItem>

                        <Link to={'/Cart'} style={{ color: "black", textDecoration:'none' }}> <ShoppingCartOutlined> </ShoppingCartOutlined></Link>

                    </MenuItem>
                </Right>
            </Wrapper>
            <Category />
        </Container>
    );
};

export default Navbar;
