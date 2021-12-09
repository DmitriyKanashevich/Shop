import React, {useCallback, useState} from "react";
import {connect} from "react-redux";

import {processAddGood} from "../adminServices/actionAddGood";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {store} from "../../services/store";

import {useDropzone} from "react-dropzone";
import Navbar from "../../components/Navbar";
import {actionPromise} from "../../services/promiseReduser";

const dropzoneStyle = {
    width  : "50%",
    height : "20%",
    border : "1px solid black"
};


export function MyDropzone({onDrop:drp}) {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log(acceptedFiles)
        drp(acceptedFiles[0])

    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <>

            <h1>Перетащите или добавьте изображение</h1>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Нажмите для выбора изображения или </p> :
                        <p>Нажмите для выбора изображения или перетащите его</p>
                }
            </div>
        </>
    )
}

export const uploadFile = file => {
    let fd = new FormData()
    fd.append('photo', file)
    return fetch('http://shop-roles.asmer.fs.a-level.com.ua/upload', {
        method: 'POST',
        headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
        body: fd
    }).then(res => res.json()) /// сходить в корень бэка и посмотреть исходный код
}

export const actionUploadFile = file =>
    actionPromise('upload', uploadFile(file))




export const actionSetAvatar = file =>
    async dispatch => {
        var result = await dispatch(actionUploadFile(file))
        localStorage.removeItem("id")
        localStorage.setItem("id", result._id)
        localStorage.setItem("flag", result._id)


        window.location.reload();
    }


export const CMyDropzone = connect(null, {onDrop: actionSetAvatar})(MyDropzone)














export const AddGood = ({ addGood}) => {


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };



    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value},
        } = event;
        setPersonName(

            typeof value === 'string' ? value.split(',') : value
        );


    };


    const [name, setName] = useState('')
        const [description, setDescription] = useState('')
        const [price, setPrice] = useState('')
        const [catId, setCatId] = useState('')
        const [catName, setCatName] = useState('')
        const [img, setImg] = useState(localStorage.getItem("id"))

    const [cats, setCats] = useState([])

   try{
    store.subscribe(() => setCats(store.getState().promise.rootCategories.payload?.data?.CategoryFind))
    var cat = cats.map((e) =>

    <MenuItem
        key={e._id}
        value={e._id+" "+e.name}
        style={getStyles(name, personName, theme)}
    >
        {e.name}
    </MenuItem>
    )
   }
   catch (error) {
       console.log('err')
   }

    if(personName[0]) {
        var idCati = personName[0].substr(0, 24)
        var catNamei = personName[0].substr(24)
    }




    return (
<>
    <Navbar/>
        <div style={{  display: 'flex',  justifyContent:'center', alignItems:'center',flexDirection:"column"}}>
            <div>
                <h1>Добавить товар</h1>
                <CMyDropzone  style={dropzoneStyle}/>
                <div>


                    <div>
                        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                            <Select
                                displayEmpty


                                onChange={handleChange}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {

                                    if (selected.length === 0) {
                                        return <em>Выберите категорию</em>;
                                    }
                                    return selected[0].substr(24)
                                }}
                                value={personName}



                                MenuProps={MenuProps}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {cat}
                            </Select>
                        </FormControl>
                    </div>
                    {localStorage.getItem("flag")?
                        <div>
                            <h2>Введите имя товара</h2>
                            <input type='text' disabled value={name} placeholder={"name"} onChange={(e) => setName(e.target.value)}/>
                            <h2>Введите описание товара</h2>
                            <input type='text'  value={description} placeholder={"desc"} onChange={(e) => setDescription(e.target.value)} />
                            <h2>Введите цену товара</h2>
                            <input type='number' value={price}  placeholder={"price"} onChange={(e) => setPrice (Number(e.target.value))} />
                            <h2>ID категории</h2>
                            <input type='string'disabled value={idCati}   onChange={(e) => setCatId (e.target.value)} />
                            <h2>Имя категории</h2>
                            <input type='string' disabledvalue={catNamei}   onChange={(e) => setCatName (e.target.value)} />
                            <h2>ID изображения</h2>
                            <input type='string'disabled id="long" value={img}   onChange={(e) => setImg (e.target.value)} />
                        </div>
                        :<div></div>
                    }

                    <button  onClick={() => addGood(name,price,description,idCati,catNamei,img)}>Добавить товар</button>
                </div>
            </div>
        </div>

    </>
    );
};


export const CAddGood = connect(state => ({addGoo: state.addGoo}), {addGood:processAddGood})(AddGood)







