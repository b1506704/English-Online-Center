import React, {useEffect, useRef, useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { getUser, createHouse, setNotification } from '../../../actions/user_actions';
import FileBase from 'react-file-base64';
import random from '../../../utils/RandomNumber';

import './UserInfo.css';

const UserInfo = () => {
    const dispatch = useDispatch();
    const [currentImg, setCurrentImg] = useState(null);
    const currentCategory = useSelector((state) => state.user_reducer.categoryList);
    const houseInputRef = 
    {
        categoryRef: useRef(null),
        priceRef: useRef(null),
        area: useRef(null),
        front: useRef(null),
        direction: useRef(null),
        address: useRef(null),
        lat: useRef(null),
        lng: useRef(null)
    };
    const currentLoginUser = useSelector((state) => state.user_reducer.login);
    const user = useSelector((state) => state.user_reducer.currentUser);
    
    useEffect(()=> {
        if (currentLoginUser) {
            dispatch(getUser(currentLoginUser.userName));
        }
    },[currentLoginUser]);

    const onHouseUpload = () => {
        const uploadHouse = 
        {
            id: random(1,10000),  
            price: houseInputRef.priceRef.current.value || null,
            category: houseInputRef.categoryRef.current.value || null,
            imgUrl:  currentImg ? currentImg : null,
            houseSeller:  user ? user.userName : null,
            area: houseInputRef.area.current.value || null,
            front: houseInputRef.front.current.value || null,
            direction: houseInputRef.direction.current.value || null,
            address: houseInputRef.address.current.value || null,
            lat: parseFloat(houseInputRef.lat.current.value) || null,
            lng: parseFloat(houseInputRef.lng.current.value) || null
        };
        dispatch(createHouse(uploadHouse));
        
    }

    const refresh = () => {
        dispatch(getUser(currentLoginUser.userName))
        .then(() => dispatch(setNotification("Làm mới thành công")));
    }

    return(
        <div className="user_info_container shadow">
            <h2 className="icon"> {"||"} </h2>
            <h2 className="title"> Thông Tin Người Dùng { user ? user.userName : null} </h2>
            <div className="info_panel">
                <div> 
                    <button type="button" className="shadow refresh_button" onClick={refresh}></button>
                </div>
                
                {currentLoginUser && currentLoginUser.isAdmin === true ?
                <> 
                <div style={{color: "yellow"}}> Thu Nhập: { user ? user.balance : null} Tỷ VND</div>
                <div> Nhà Đã Bán Được: &nbsp; 
                </div> 
                    {
                        user ? user.houseSellList.map((e,k) => (<span key={k}>{e}</span>)) : 'Chưa có'
                    } 
                </>
                : null}
                
                {currentLoginUser && currentLoginUser.isAdmin === false ?
                    <> 
                        <div> Email: { user ? user.email : null}</div>
                        <div style={{color: "yellow"}}> Mã Thẻ Ngân Hàng: { user ? user.bankID : null}</div>
                        <div style={{color: "yellow"}}> Ngân Hàng: { user ? user.bankProvider : null}</div>
                        <div style={{color: "yellow"}}> Số Dư Tài Khoản: { user ? user.balance : null} Tỷ VND</div>
                        <div> Nhà Đã Mua: &nbsp; 
                        </div>
                            {
                                user ? user.houseOwnList.map((e,k) => (<span key={k}>{e}</span>)) : 'Chưa có'
                            } 
                        <div> Nhà Đã Bán Được: &nbsp; 
                        </div>
                            {
                                user ? user.houseSellList.map((e,k) => (<span key={k}>{e}</span>)) : 'Chưa có'
                            } 
                        <div style={{backgroundColor: "black", paddingLeft: "15vh"}}> Đăng tin bán nhà </div>
                        <div> Loại Nhà: &nbsp; 
                            <select ref={houseInputRef.categoryRef}>
                                { currentCategory != null 
                                ? currentCategory.map((ele, key) => (<option value={ele.name} key={key}>{ele.name}</option>))
                                : null
                                }
                            </select>
                        </div>
                        <div> Giá: &nbsp;
                            <input ref={houseInputRef.priceRef} type="text"></input>
                        </div>
                        <div> Diện Tích:&nbsp;
                            <input ref={houseInputRef.area} type="text"></input>
                        </div>
                        <div> Mặt Tiền:&nbsp;
                            <input ref={houseInputRef.front} type="text"></input>
                        </div>
                        <div> Hướng:&nbsp;
                            <input ref={houseInputRef.direction} type="text"></input>
                        </div>
                        <div> Địa chỉ:&nbsp;
                            <input ref={houseInputRef.address} type="text"></input>
                        </div>
                        <div> Lat:&nbsp;
                            <input ref={houseInputRef.lat} type="text"></input>
                        </div>
                        <div> Lng:&nbsp;
                            <input ref={houseInputRef.lng} type="text"></input>
                        </div>
                        <div>
                            <FileBase className="base64"  type="file" multiple={false} onDone = {({base64}) => {setCurrentImg(base64)}}></FileBase>  
                        </div>
                        <div>
                            <img className="image" alt="Chọn Anh Để Upload" src={currentImg}/>
                        </div>
                        <div> 
                            <button type="button" className="shadow upload_button" onClick={onHouseUpload}></button>
                        </div>
                    </>
                    : null
                }
            </div>
        </div>
    );
}
export default UserInfo;