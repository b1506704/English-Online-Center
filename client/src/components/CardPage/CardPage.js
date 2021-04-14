import {React, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from './Card/Card';
import LoadingContainer from '../../utils/LoadingContainer/LoadingContainer';
import {createHouse, createBank, createCategory, fetchCategory, fetchBank, fetchHouse, setNotification, filterHouseByPrice } from '../../actions/user_actions';
import random from '../../utils/RandomNumber';
import './CardPage.css';

const CardPage = ({context}) => {
    const dispatch = useDispatch();
    const houseList = useSelector((state) => state.user_reducer.houseList);
    const bankList = useSelector((state) => state.user_reducer.bankList);
    const categoryList = useSelector((state) => state.user_reducer.categoryList);
    const bankProvider = ["Agribank","BIDV","Sacombank","Vietcombank"];   
    const bankValue = [2, 5, 10, 20, 50, 100];   
    const searchInput = useRef(null);

    const addHouse = () => {
        dispatch(
            createHouse(
                {
                    id: random(1,2000),  
                    price: random(1,200),
                    category: categoryList !=null && categoryList.length!= 0 ? categoryList[random(0,  categoryList.length - 1)].name : null,
                    imgUrl: null,
                    isBought: false, 
                    houseSeller: 'admin',
                    area: random(1,1000),
                    front: random(1,1000),
                    direction: 'Hướng lộ',
                    address: 'ĐH Thủ Dàu Một'
                }
            )
        );
    }
    const addBank = () => {
        dispatch(createBank(
            {
                id: random(1,2000),
                provider: bankProvider[random(0, bankProvider.length-1)],
                value: bankValue[random(0, bankValue.length-1)]
            }
        ));
    }
    const addCategory = () => {
        dispatch(createCategory(
            {
                name: random(1,2000),
                imgUrl: null,
                houseNum: 0,
                sellNum: 0
            }));
    }

    const loadCategory = () => {
        dispatch(fetchCategory())
        .then(() => dispatch(setNotification("Làm mới thành công")));
    }

    const loadBank = () => {
        dispatch(fetchBank())
        .then(() => dispatch(setNotification("Làm mới thành công")));
    }

    const loadHouse = () => {
        dispatch(fetchHouse())
        .then(() => dispatch(setNotification("Làm mới thành công")));
    }
    
    const searchByPrice = (e) => {
        e.preventDefault();
        const price = parseFloat(searchInput.current.value);
        if (isNaN(price)) {
            dispatch(setNotification(`Vui lòng nhập giá tiền`));
        } else {
            dispatch(filterHouseByPrice(price));
        }
    }

    switch (context) {
        case "list":
            return(
                <div className="card_page">
                    <div className="card_header"> <b>Nhà Bán ({houseList ? houseList.length : 0})</b> 
                        <button type="button" className="card_menu_button refresh_button_user shadow" onClick={loadHouse}></button>
                        <form onSubmit={(e) => searchByPrice(e)}>
                            <input type="text" ref={searchInput} className="shadow" placeholder="Tìm theo giá"></input>
                            <input type="submit" className="shadow"></input>
                        </form>
                    </div>
                    <div className="card_container">
                        {
                            houseList != null && houseList.length != 0? 
                            houseList.map ((item,key) => 
                            (<Card key={key} house={item} type={"house"} mode={"view"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        }
                    </div>
                </div>
            );
        case "category":
            return(
                <div className="card_page">
                    <div className="card_header"> <b> Loại Nhà ({categoryList ? categoryList.length : 0})</b> 
                        <button type="button" className="card_menu_button refresh_button_user shadow" onClick={loadCategory}></button>
                    </div>

                    <div className="card_container">
                        {
                            categoryList != null && categoryList.length != 0 ? 
                            categoryList.map ((item,key) => 
                            (<Card key={key} category={item} type={"category"} mode={"view"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        }
                    </div>
                </div>
            );
        case "edit_category":
            return(
                <div className="card_page">
                    <div className="card_header"> <b>Quản Lý Loại Nhà ({categoryList ? categoryList.length : 0})</b> 
                        <button type="button" className="card_menu_button add_button shadow" onClick={addCategory}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadCategory}></button>
                    </div>
                    <div className="card_container">
                        {
                            categoryList != null && categoryList.length != 0 ? 
                            categoryList.map ((item,key) => 
                            (<Card key={key} category={item} type={"category"} mode={"edit"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        }
                    </div>
                </div>
            );   
        case "edit_list":
            return(
                <div className="card_page">
                    <div className="card_header"> <b>Quản Lý Nhà Bán ({houseList ? houseList.length : 0})</b> 
                        <button type="button" className="card_menu_button add_button shadow" onClick={addHouse}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadHouse}></button>
                    </div>
                    <div className="card_container">
                        {
                            houseList != null && houseList.length != 0?
                            houseList.map ((item,key) => 
                            (<Card key={key} house={item} type={"house"} mode={"edit"}/>))
                            : <LoadingContainer style={'spinner'}/>
                        }
                    </div>
                </div>
            );
        case "edit_card":
            return(
                <div className="card_page">
                    <div className="card_header"> <b>Quản Lý Tài Khoản Ngân Hàng ({bankList ? bankList.length : 0})</b> 
                        <button type="button" className="card_menu_button add_button shadow" onClick={addBank}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadBank}></button>
                    </div>
                    <div className="card_container">
                        {
                            bankList != null && bankList.length != 0 ?
                            bankList.map ((item,key) => 
                            (<Card key={key} bank={item} type={"bank"} mode={"edit"}/>))
                            : <LoadingContainer style={'spinner'}/>
                        }
                    </div>
                </div>
            );                
        default:
            return (<LoadingContainer style={'dot'}/>);
    }
}
export default CardPage;