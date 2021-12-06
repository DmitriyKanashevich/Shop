import styled from "styled-components";
import { popularProducts } from "../data";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import {useEffect} from "react";
import {actionCategoryById} from "../services/actionCategById";
import {mobile} from "../responsive";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';

const Container = styled.div`
    padding: 20px;
    display: inline-block;
    flex-wrap: wrap;
  align-items: center;
    justify-content: space-between;

`;
const Image = styled.img`
  height: 75%;
  z-index: 2;

`;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;


export const CategoryDraw = ({category:{name, goods=[]}}) =>{



       let categoryPageHead = <Title>{name}</Title>;
       const imegesHref = 'http://shop-roles.asmer.fs.a-level.com.ua/';

     const categoryPageBody = goods.map((e) =>

        <Container>


            <Card style={{maxWidth: "400px", marginLeft: "30px"}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="340"

                        image={imegesHref + e.images[0].url}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <Link to={`/goods/${e._id}`}>{e.id}{e.name}</Link>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {'Описание: ' + e.description}<p></p>
                        </Typography>
                        <Typography variant="h5" component="div">
                            {e.price + ' Грн'}
                            <Link to={`/goods/${e._id}`}> <Button style={{marginLeft: "150px"}} variant="contained"
                                                                  href="#contained-buttons">
                                Купить
                            </Button></Link>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>


        </Container>) || []

    return (
        <div className='CategoryDraw'>

            {categoryPageHead }
            <FilterContainer>
                <Filter>

                    <FilterText>Сортировать по:</FilterText>
                    <Select>
                        <Option selected>Популярности</Option>
                        <Option>Цене (возр.)</Option>
                        <Option>Цене (убыв.)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <hr></hr>
            {categoryPageBody}
        </div>
    )
   }

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




const Products = () => {
    return (

          <CPageCategory/>

    );
};

export default Products;
