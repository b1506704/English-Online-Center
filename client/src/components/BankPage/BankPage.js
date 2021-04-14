import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {addBank, getUser} from '../../actions/user_actions';
import './BankPage.css';

const BankPage = ({close}) => {
    const dispatch = useDispatch();
    const modalRef = useRef();

    const bankName = ["Agribank","BIDV","Sacombank","Vietcombank"];
    const [selectedCreName, setSelectedCreName] = useState(bankName[0]);
    const [bankInfo, setBankInfo] = useState({
        id: '',
        provider: ''
    });
    const currentUserName = useSelector((state) => state.user_reducer.login.userName);
    
    useEffect(() => {
        scrollToModal();
    },[close]);
    
    const scrollToModal = () => {
        modalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start", 
          inline: "nearest"
        });
      };

    const onCreNameChange = (e) => {
        const name = e.target.value;
        setSelectedCreName(bankName.find((e) => e === name));
    }

    useEffect(() => {
        if (bankInfo.id != '') {
            dispatch(addBank(currentUserName, bankInfo))
            .then(() => dispatch(getUser(currentUserName)));
            
        }
    },[bankInfo]);

    return(
        <div className="bank_container shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h1>Nhập Thông Tin Thẻ</h1>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    setBankInfo({id: e.target.ma_the.value, provider: selectedCreName});
                }}>
                <div>
                    <label>Mã Thẻ:</label>
                    <input type="text" autoFocus={true} name="ma_the"></input>
                </div>
                <div>
                    <label>Ngân Hàng:</label>
                    <select value={selectedCreName} onChange={onCreNameChange}>
                        {bankName.map((item, key) => (
                            <option value={item} key={key}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="button_container">
                    <input type="submit" className="drop_shadow" value="Lưu"></input>
                    <input type="button" className="drop_shadow" value="Thoát" onClick={close}></input>
                </div>
            </form>
            
        </div>
    );
}
export default BankPage;