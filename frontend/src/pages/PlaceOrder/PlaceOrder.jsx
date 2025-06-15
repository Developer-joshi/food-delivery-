import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const { getTotalCartAmount,currency,deliveryCharge } = useContext(StoreContext);

    const navigate = useNavigate();

    return (
        <form  className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName'  placeholder='First name' required />
                    <input type="text" name='lastName'  placeholder='Last name' required />
                </div>
                <input type="email" name='email'   placeholder='Email address' required />
                <input type="text" name='street'   placeholder='Street' required />
                <div className="multi-field">
                    <input type="text" name='city'  placeholder='City' required />
                    <input type="text" name='state'  placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode'   placeholder='Zip code' required />
                    <input type="text" name='country'   placeholder='Country' required />
                </div>
                <input type="text" name='phone'  placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <button>PROCEED TO PAYMENT</button>
            </div>
        </form>
    )
}

export default PlaceOrder
