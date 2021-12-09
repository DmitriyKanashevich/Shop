import styled from "styled-components";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {actionGoodById} from "../../services/actionGoodById";
import {shopGQL} from "../../services/getQuery";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;

`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;

`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;

`;


const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;


const GoodsRedact =({goods:{name, images, price, description, _id}}) =>{
    const imegesDomen ='http://shop-roles.asmer.fs.a-level.com.ua/';
    const [names, setNames] = useState(`${name}`)
    const [prices, setPrices] = useState(`${price}`)
    const [id, setId] = useState(`${_id}`)
    const [descriptions, setDescriptions] = useState(`${description}`)


    let goodPage =
        <Container>
            <Navbar />
            <Wrapper>

                <ImgContainer>
                    <Image src={imegesDomen + images?.map((e) => e.url)} />

                </ImgContainer>
                <InfoContainer>
                    <Title>{name}</Title>
                    <input type='text'  value={names} onChange={(e) => setNames(e.target.value)}/>

                    <Desc>
                        {'Описание: ' + description}
                    </Desc>
                    <input type='text' value={descriptions} onChange={(e) => setDescriptions(e.target.value)}/>

                    <Price>{price + ' Грн'}</Price>
                    <input type='text' value={prices} onChange={(e) => setPrices(e.target.value)}/>

                    <input type='text' value={id} onChange={(e) => setId(e.target.value)}/>

                    <FilterContainer>


                    </FilterContainer>
                    <AddContainer>

                        <Button  onClick={()=> redGood(id, names, descriptions,parseFloat(prices))} >Добавить в корзину</Button>


                    </AddContainer>
                </InfoContainer>
            </Wrapper>

            <Footer />
        </Container>

    return(
        <div>
            {goodPage}
        </div>)
}

const CGoodsRedactDraw = connect(state =>({goods: state.promise?.goodById?.payload?.data?.GoodFindOne || {}}), {goodById: actionGoodById} )(GoodsRedact)

export const redGood = (id, names, descriptions,prices) => {

    shopGQL(`mutation addGood($id:ID,$names:String,$descriptions:String, $prices:Float){
        GoodUpsert(good:{
        _id:$id
            name:$names,
            price:$prices
            description:$descriptions,
     
    }) {
        _id
    }
      }`
        ,  {id, names, descriptions,prices}
    )
}
const PageGoods = ({goodById}) => {
    let {_id_good} = useParams()
    useEffect(() => {
        goodById(_id_good)
    },[_id_good])
    return (
        <div className='GoodsCategory'>
            <CGoodsRedactDraw />
        </div>
    )
}

const CPageGoodsRedact = connect(null, {goodById: actionGoodById})(PageGoods)

export const redactGood = () => {
    return (
        <CPageGoodsRedact/>
    );
};

export default redactGood;
