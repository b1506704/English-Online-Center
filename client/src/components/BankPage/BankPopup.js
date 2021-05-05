import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {addBank, getUser} from '../../actions/user_actions';
import './BankPopup.css';

const BankPopup = ({close}) => {
    const dispatch = useDispatch();
    const modalRef = useRef();

    const bankName = ["Agribank","BIDV","Sacombank","Vietcombank"];
    const [selectedCreName, setSelectedCreName] = useState(bankName[0]);
    const [bankInfo, setBankInfo] = useState({
        id: '',
        provider: ''
    });
    const currentUserName = useSelector((state) => state.user_reducer.loggedInUser.userName);
    
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
            <h1>Credit Card</h1>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    setBankInfo({id: e.target.series_number.value, provider: selectedCreName});
                }}>
                <div>
                    <label>Series Number:</label>
                    <input type="text" autoFocus={true} name="series_number"></input>
                </div>
                <div>
                    <label>Bank:</label>
                    <select value={selectedCreName} onChange={onCreNameChange}>
                        {bankName.map((item, key) => (
                            <option value={item} key={key}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="button_container">
                    <input type="submit" className="shadow" value="Save"></input>
                    <input type="button" className="shadow" value="Close" onClick={close}></input>
                </div>
            </form>
            
        </div>
    );
}
export default BankPopup;