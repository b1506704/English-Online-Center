import { React, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from "react-paypal-button-v2";
import './BankPopup.css';
import { fetchRoom, joinRoom, openPaypal, setNotification } from '../../actions/user_actions';
import { useHistory } from 'react-router';

const BankPopup = ({close}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const modalRef = useRef();
    const currentRoom = useSelector((state) => state.user_reducer.currentRoom);
    const currentUser= useSelector((state) => state.user_reducer.currentUser);
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
      

    return(
        <div className="bank_container shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h1>Paypal Payment</h1>
                    <PayPalButton
                        amount={`${currentRoom?.price}`}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={(details, data) => {
                            dispatch(setNotification("Transaction completed by " + details.payer.name.given_name));
                            dispatch(joinRoom(currentRoom.id, currentUser))
                            .then(() => history.push(`/user/room/${currentRoom.id}`))
                            .then(() => {
                                dispatch(openPaypal(false));
                            });
                            
                            // OPTIONAL: Call your server to save the transaction
                            // return fetch("/paypal-transaction-complete", {
                            //     method: "post",
                            //     body: JSON.stringify({
                            //     orderId: data.orderID
                            //     })
                            // });
                        }}
                        options={{
                        clientId: "AY951E5uFqyAHj_l006PRnDq1qECtJHTVy53KaNn0On8bT_Wof7ruk6Y4cPVWAdFeMWq8zLkfANyU9V5"
                        }}
                    />
                <div className="button_container">
                    {/* <input type="submit" className="shadow" value="Submit"></input> */}
                    <input type="button" className="shadow" value="Cancel" onClick={close}></input>
                </div>
        </div>
    );
}
export default BankPopup;