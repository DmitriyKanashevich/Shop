import React, {useState} from "react";
import Box from '@mui/material/Box';
import {store} from "../../services/store";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export const imegesHref ='http://shop-roles.asmer.fs.a-level.com.ua/';
export const DrawOrder = () =>{
    const [order, setOrder] = useState([])
    store.subscribe(() => setOrder(store.getState().promise?.AllOrder?.payload?.data?.OrderFind||[]))
    var cat = order.map((value) =>
        value.orderGoods!=null && value.orderGoods.length!== 0 && value.total!=null
            ? <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Item>{value.createdAt}</Item>
                    </Grid>
                    <Grid item xs>
                        <Item>{value.orderGoods[0].good.name}</Item>
                    </Grid>
                    <Grid item xs>
                        <Item> <img src={imegesHref +value.orderGoods[0].good.images[0].url} alt={"logo"} style={{height:"50px"}}/></Item>
                    </Grid>
                    <Grid item xs>
                        <Item>{value.orderGoods[0].good.price}</Item>
                    </Grid>
                    <Grid item xs>
                        <Item>{value.orderGoods[0].good.price +"x"+ value.orderGoods[0].count}</Item>
                    </Grid>
                    <Grid item xs>
                        <Item>{value.total}</Item>
                    </Grid>
                    <Grid item xs>
                        <Item>{value.owner.login}</Item>
                    </Grid>

                </Grid>
            </Box>
            :[]
    )

    return (
        <div>
            {cat}
        </div>
    )
}


