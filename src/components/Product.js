import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import {connect} from "react-redux";
import {actionCategoryById} from "../services/actionCategById";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {store} from "../services/store";
import {Link} from 'react-router-dom';
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;

  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
  display: flex;

  text-align: center;





`;

const Container = styled.div`
  float:left;
  width:33.3%;
  box-sizing:border-box;
  margin:0;
  flex: 1;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
margin: 20px;

  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;



export const CategoryDraw = ({category:{ goods=[]}}) =>{
    let categoryPageHead = <h1 style={{marginLeft:"37%"}}>Лучшие товары месяца</h1>;
    const imegesHref ='http://shop-roles.asmer.fs.a-level.com.ua/';
    const categoryPageBody = goods.map((e) =>

        <Container>

            <Image src={e.images[0]?imegesHref + e.images[0].url:"http://shop-roles.asmer.fs.a-level.com.ua/"}/>
            <Circle />
            <Info>
                <Icon>
                    <Link to={`/goods/${e._id}`}>  <SearchOutlined /></Link>
                </Icon>

            </Info>

        </Container>)

    return (
        <div className='CategoryDraw'>

            {categoryPageHead }
            {categoryPageBody}
        </div>
    )}

export const CCategoryDraw = connect(state =>({category: state.promise?.catById?.payload?.data?.CategoryFindOne || {}}))(CategoryDraw)


export const PageCategory = ({cateById}) => {
    let {_id_cat} = useParams()
    useEffect(() => {
        cateById(_id_cat)
    },[_id_cat])
    return (
        <div className='PageCategory'>
            <CCategoryDraw />

        </div>
    )
}

export const CPageCategory = connect(null, {cateById: actionCategoryById})(PageCategory)




const Product = () => {

    return (

<CPageCategory/>




    );
};

export default Product;
