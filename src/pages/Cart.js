import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import ProductList from "./ProductList";
import React from "react";
import {connect} from "react-redux";
import {actionCartAdd, actionCartRemove} from "../services/cartReducer";
import {actionCartSet} from "../services/cartReducer";
import {actionCartClear} from "../services/cartReducer";
import {shopGQL} from "../services/getQuery";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 25vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;




export const CartPage = ({cart, onRemove, onSet,onAdd, onClear}) => {
    let cost = 0;
    for (let goodId in cart){
        cost += cart[goodId].price * cart[goodId].count
    }

     const orderPush = (id,count) => {
        console.log(id)
        console.log(count)

        shopGQL(`
                 mutation newOrder($id:ID,$count:Int!){
                OrderUpsert(order:{orderGoods:{
                  count:$count
                good:{_id:$id

                  
                
                }
                  
                }}){
                    _id,
          owner {
            _id
            createdAt
            login
            nick
          }
          
          }
   } `
            ,  {id,count}
        )
    }


    let Pages = Object.entries(cart).map(([key, value]) =>

        <Product>
            <ProductDetail>


                <Details>
                    <ProductName>
                        <b>ТОВАР:</b> {value.good.name}
                    </ProductName>
                    <ProductId>
                        <b>ID товара:</b> {value.good._id}
                    </ProductId>

                </Details>
            </ProductDetail>
            <PriceDetail>
                <ProductAmountContainer>

                    < button onClick={(e) => onSet(value.good._id, value.good.name, value.price,parseInt(value.count)+1)}> <Add /> </button>

                    <ProductAmount> <input id="Breaks" value={value.count > 0 ? value.count : 1} type='number'onChange={(e) => onSet(value.good._id, value.good.name, value.price, e.target.value)}/>
                    </ProductAmount>
                    < button onClick={(e) => onSet(value.good._id, value.good.name, value.price,parseInt(value.count)-1)}><Remove/> </button>
                </ProductAmountContainer>
                <ProductPrice>{'Цена: ' + value.price}</ProductPrice>
            </PriceDetail>
            <button onClick={(e) => orderPush(value.good._id, parseInt(value.count))}>Оформить</button>

        </Product>



    )
    return (
<div>
    <Wrapper>
    <Title>КОРЗИНА</Title>
    <Top>

        <TopButton type="filled" onClick={() => onClear()} disabled={!Object.keys(cart).length}>ОЧИСТИТЬ КОРЗИНУ</TopButton>
    </Top>
    <Bottom>
        <Info>

            {Pages}

            <Hr />

        </Info>
        <Summary>
            <SummaryTitle>Подсчет корзины</SummaryTitle>
            <SummaryItem type="total">
                <SummaryItemText>Всего</SummaryItemText>
                <SummaryItemPrice>{cost}</SummaryItemPrice>
            </SummaryItem>


        </Summary>
    </Bottom>

</Wrapper>


</div>

    )
}



export const CCartPage = connect(state =>({cart: state.cart}), {onRemove:actionCartRemove, onSet:actionCartSet, onClear:actionCartClear})(CartPage)







export const Cart = () => {
    return (
        <Container>
            <Navbar />


<CCartPage/>

            <Footer />
        </Container>
    );
};

export default Cart;
