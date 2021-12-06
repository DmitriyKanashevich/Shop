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


        return (
        <Container>
            <Wrapper>
                <Left>

                    <SearchContainer >
                        <Input placeholder="Search" />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to={'/'} style={{ color: "black", textDecoration:'none' }}> <Logo>SHOP</Logo> </Link>


                </Center>
                <Right>
                    {localStorage.authToken ?
                        <MenuItem><Link to={"/usercabinet"}  style={{ color: "black", textDecoration:'none' }}>Личный кабинет</Link></MenuItem>
                   :
                    <MenuItem><Link to={"/login"} style={{ color: "black", textDecoration:'none' }}>  Авторизация
                        </Link></MenuItem>}
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
