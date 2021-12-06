import Navbar from "../components/Navbar";
import React, {useState} from "react";
import {actionPromise} from "../services/promiseReduser";
import {shopGQL} from "../services/getQuery";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CMyDropzone, CUserDrow, PageUser} from "./userComponents/userInfo";
import {actionUserById} from "./userServices/actionUserById";
import {store} from "../services/store";
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';






const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



const imegesHref ='http://shop-roles.asmer.fs.a-level.com.ua/';

export const DrawOrder = () =>{
    const [order, setOrder] = useState([])
    store.subscribe(() => setOrder(store.getState().promise?.AllOrder?.payload?.data?.OrderFind||[]))
    var cat = order.map((value) =>
        value.orderGoods!=null &&value.orderGoods.length!= 0&&value.total!=null
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





function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}










export function UserPanel() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
<Navbar/>

            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Мои заказы" {...a11yProps(0)} />
                    <Tab label="Личные данные" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />

                </Tabs>
                <TabPanel value={value} index={0}>
                    <DrawOrder/>


                </TabPanel>
                <TabPanel value={value} index={1}>

                    <CUserDrow/>

                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>

            </Box>
            </>
            );
            }