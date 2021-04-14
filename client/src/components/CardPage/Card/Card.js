import {React, useRef, useState} from 'react';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import GoogleMap from '../../../utils/GoogleMap/GoogleMap';
import {
  buyHouse, 
  filterHouse, 
  deleteHouse, 
  deleteBank, 
  deleteCategory, 
  setNotification,
  updateHouse,
  updateCategory,
  updateBank,
  getUser
} from '../../../actions/user_actions';
import './Card.css';
import BIDV from '../../../assets/imgs/bidv.jpg'; 
import Agribank from '../../../assets/imgs/agribank.png'
import Sacombank from '../../../assets/imgs/sacombank.jpeg'
import Vietcombank  from '../../../assets/imgs/vietcombank.png';

const Card = ({house, category, bank, type, mode}) => {
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
    const categoryInputRef = 
    {
      nameRef: useRef(null),
    };
    const bankInputRef = 
    {
      providerRef: useRef(null),
      ownerRef: useRef(null),
      valueRef: useRef(null),
    };
    
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [currentImg, setCurrentImg] = useState(null);
    const currentLoginUser = useSelector((state) => state.user_reducer.login);
    const currentCategory = useSelector((state) => state.user_reducer.categoryList);
    const currentHouse = useSelector((state) => state.user_reducer.houseList);
    const providerList = ["Agribank","BIDV","Sacombank","Vietcombank"];   
    const bankValueList = [2, 5, 10, 20, 100];   
    
    const countCtgByName = (name) => {
      if (currentHouse) {
        let count = 0;
        for (let i = 0; i < currentHouse.length; i++) {
          if (currentHouse[i].category === name) {
            count++;
          }
        }
        return count;
      }
    }

    const countCtgBySell = (name) => {
      let count = 0;
      if (currentHouse) {
        for (let i = 0; i < currentHouse.length; i++) {
          if (currentHouse[i].category === name && currentHouse[i].isBought === true) {
            count++;
          }
        }
        return count;
      }
    }

    const onCardSelect = () => {
      if (type === "category") {
        dispatch(filterHouse(category.name));
      }
      if (type === "house") {
        if (currentLoginUser === null || currentLoginUser === undefined) {
          dispatch(setNotification("Cần đăng nhập để sử dụng chức năng này!"));
        } else {
          dispatch(buyHouse(currentLoginUser.userName, house))
          .then(() => dispatch(getUser(currentLoginUser.userName)));
        } 
      }
    }
    const onCardEdit = () => {
      setIsEditing(true);
    }
    const onCardUpdate = () => {
      if (type === "house") {
        const updatedHouse = {
          price: houseInputRef.priceRef.current.value || null,
          category: houseInputRef.categoryRef.current.value || null,
          imgUrl:  currentImg ? currentImg : null,
          area: houseInputRef.area.current.value || null,
          front: houseInputRef.front.current.value || null,
          direction: houseInputRef.direction.current.value || null,
          address: houseInputRef.address.current.value || null,
          lat: parseFloat(houseInputRef.lat.current.value) || null,
          lng: parseFloat(houseInputRef.lng.current.value) || null
        };
          dispatch(updateHouse(house.id, updatedHouse))
          .then(() => setIsEditing(false));
      } else if (type === "category") {
          const updatedCategory = {
            name: categoryInputRef.nameRef.current.value || category.name,
            imgUrl: currentImg ? currentImg : category.imgUrl,
          };
          dispatch(updateCategory(category.name, updatedCategory))
          .then(() => setIsEditing(false));
      } else if (type === "bank") {
          const updatedBank = {
            provider: bankInputRef.providerRef.current.value,
            value: bankInputRef.valueRef.current.value,
          };
          dispatch(updateBank(bank.id, updatedBank))
          .then(() => setIsEditing(false));
      }
    }
    const onCardCancel = () => {
      setIsEditing(false);
    }
    const onCardDelete = () => {
      if (type === "house") {
        dispatch(deleteHouse(house.id));
      } else if (type === "bank") {
        dispatch(deleteBank(bank.id));
      } else if (type === "category") {
        dispatch(deleteCategory(category.name));
      }
    }
    
    return (
      <div className="card_detail shadow">
        <div className="title_bar shadow">
          { type === "house" ? '#' + house.id : type === "category" ? '#' + category.name : type ==="bank" ? '#' + bank.id : null }            
        </div>
        { 
          type === "house" 
          ? <div className="house_info">
              <div> Loại nhà: &nbsp; 
                { isEditing === false ? house.category
                  : (<select ref={houseInputRef.categoryRef}>
                      { currentCategory != null 
                        ? currentCategory.map((ele, key) => (<option value={ele.name} key={key}>{ele.name}</option>))
                        : null
                      }
                    </select>)
                }
              </div>
              <div> Giá: &nbsp;
                { isEditing === false ? house.price + " Tỷ VND"
                  : (<input ref={houseInputRef.priceRef} type="text" placeholder={house.price}></input>)
                }
              </div>
              <div style={{color: "yellow"}}>Tình trạng: &nbsp;{house.isBought ? "Đã bán" : "Chưa bán"}</div>
              <div style={{color: "yellow"}}>Người mua:&nbsp; {house.houseOwner}</div>
              <div style={{color: "yellow"}}>Người bán:&nbsp; {house.houseSeller}</div>
              <div> Diện tích:&nbsp;
              { isEditing === false ? house.area + " m2"
                : (<input ref={houseInputRef.area} type="text" placeholder={house.area}></input>)
              }
              </div>
              <div> Mặt tiền:&nbsp;
              { isEditing === false ? house.front + " m2"
                : (<input ref={houseInputRef.front} type="text" placeholder={house.front}></input>)
              }
              </div>
              <div> Hướng:&nbsp;
              { isEditing === false ? house.direction
                : (<input ref={houseInputRef.direction} type="text" placeholder={house.direction}></input>)
              }
              </div>
              <div> Địa chỉ:&nbsp;
                
              { isEditing === false 
                ? <>
                    {house.address + ` (lat: ${house.lat}, lng: ${house.lng})`}
                    <GoogleMap lat={house.lat} lng={house.lng}/>
                  </>
                : <>
                    <input ref={houseInputRef.address} type="text" placeholder={house.address}></input>
                    <div> Lat: 
                      <input ref={houseInputRef.lat} type="text" placeholder={house.lat}></input>
                    </div>
                    <div> Lng: 
                      <input ref={houseInputRef.lng} type="text" placeholder={house.lng}></input>
                    </div>
                    <div>
                      <GoogleMap lat={house.lat} lng={house.lng}/>
                    </div>
                  </>
              }
              </div>
              
            </div>
          : type === "category" 
            ? <div className="house_info">
                <div> Loại nhà:
                  { isEditing === false ? category.name
                  : (<input ref={categoryInputRef.nameRef} type="text" placeholder={category.name}></input>)
                  }
                </div>
                <div style={{color: "yellow"}}> Số nhà rao bán:&nbsp; {countCtgByName(category.name) || null}</div>
                <div style={{color: "yellow"}}> Đã bán:&nbsp; {countCtgBySell(category.name) || null}</div>
              </div>
              : type === "bank"
                ? <div className="house_info">
                    <div> Ngân hàng:&nbsp;
                        { isEditing === false ? bank.provider
                          : (<select ref={bankInputRef.providerRef}>
                              { providerList != null 
                                ? providerList.map((ele, key) => (<option value={ele} key={key}>{ele}</option>))
                                : null
                              }
                            </select>)
                        }
                    </div>
                    <div> Số dư: &nbsp;
                        { isEditing === false ? bank.value + " Tỷ VND"
                          : (<select ref={bankInputRef.valueRef}>
                              { bankValueList != null 
                                ? bankValueList.map((ele, key) => (<option value={ele} key={key}>{ele}</option>))
                                : null
                              }
                            </select>)
                        }
                    </div>
                    <div> Chủ sở hữu: &nbsp;
                        { isEditing === false ? bank.owner
                          : null
                        }
                    </div>
                    <div style={{color: "yellow"}}> Tình trạng:&nbsp;  {bank.isOwned ? "Đã liên kết" : "Chưa liên kết" }</div>
                  </div>
                  : null   
        }
        {
          mode === "view"
          ? <>
              {
                type === "house" ? <button type="button" className="card_button buy_button shadow" onClick={onCardSelect}></button>   
                : type === "category" ? <button type="button" className="card_button browse_button shadow" onClick={onCardSelect}></button>
                : null   
              } 
            </>
          : <>
              { isEditing === false 
                ? (<button type="button" className="card_button edit_button shadow" onClick={onCardEdit}>
                    
                  </button>) 
                : <>
                  { type === "bank" ? null : (<div className="card_button base64_button shadow">
                    Upload hình ảnh:
                    <FileBase className="base64"  type="file" multiple={false} onDone = {({base64}) => {setCurrentImg(base64)}}></FileBase>  
                  </div>)}
                  <button type="button" className="card_button cancel_button shadow" onClick={onCardCancel}>
                    
                  </button>
                  <button type="button" className="card_button save_button shadow" onClick={onCardUpdate}>
                    
                  </button>
                  </>
              }
              <button type="button" className="card_button delete_button shadow" onClick={onCardDelete}>
                  (X)         
              </button>
            </>
        }
        <div className="image_container">
          { type === "house" && (house.imgUrl || currentImg) ? 
            (<img className="image" alt="Loading..." src={currentImg || house.imgUrl}/>)
            : type === "category" && (category.imgUrl || currentImg ) ?
            (<img className="image" 
              alt="Loading..." 
              src={
                currentImg || category.imgUrl
            }/>)   
          : type === "bank" ?
            (<img className="image" 
              alt="Loading..." 
              src={
                bank.provider === "BIDV" 
              ? BIDV
              : bank.provider === "Agribank"
              ? Agribank
              : bank.provider === "Sacombank"
              ? Sacombank
              : bank.provider === "Vietcombank"
              ? Vietcombank
              : null
            }/>)  
          : (<LoadingContainer style="spinner"/>)
          }
        </div>
      </div>
    );
};
export default Card;