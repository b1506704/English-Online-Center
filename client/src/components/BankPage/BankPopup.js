import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {addBank, getUser} from '../../actions/user_actions';
import './BankPopup.css';

const BankPopup = ({close}) => {
    const dispatch = useDispatch();
    const modalRef = useRef();

    // const bankName = ["Agribank","BIDV","Sacombank","Vietcombank"];
    // const [selectedCreName, setSelectedCreName] = useState(bankName[0]);
    // const [bankInfo, setBankInfo] = useState({
    //     id: '',
    //     provider: ''
    // });
    // const currentUserName = useSelector((state) => state.user_reducer.loggedInUser.userName);
    
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

    // const onCreNameChange = (e) => {
    //     const name = e.target.value;
    //     setSelectedCreName(bankName.find((e) => e === name));
    // }

    // useEffect(() => {
    //     if (bankInfo.id != '') {
    //         dispatch(addBank(currentUserName, bankInfo))
    //         .then(() => dispatch(getUser(currentUserName)));
            
    //     }
    // },[bankInfo]);

    return(
        <div className="bank_container shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h1>VNPay Payment</h1>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    // setBankInfo({id: e.target.series_number.value, provider: selectedCreName});
                }}>
                <div>
                    <label>Series Number:</label>
                    <input type="text" autoFocus={true} name="series_number"></input>
                </div>
                <div>
                    <label>Release Date:</label>
                    <input type="date" name="release_date"></input>
                </div>
                <div>
                    <label>User Name:</label>
                    <input type="text" name="user_name"></input>
                </div>
                <div>
                    <label>OTP Code:</label>
                    <input type="password" name="otp"></input>
                </div>
                
                <div className="button_container">
                    <input type="submit" className="shadow" value="Submit"></input>
                    <input type="button" className="shadow" value="Cancel" onClick={close}></input>
                </div>
            </form>
            
        </div>
    );
}
export default BankPopup;