import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, addItem, removeItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity); // Get total quantity

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
        cart.forEach((item) => {
            totalAmount += parseInt(item.cost.replace('$','')) * item.quantity
        });
    return totalAmount;
  };

  const handleContinueShopping = () => {
    onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    dispatch(updateTotalQuantity(1)); // Update total quantity
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1){
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        dispatch(updateTotalQuantity(-1)); // Update total quantity
    }
    else {
        dispatch(removeItem(item.name));
        dispatch(updateTotalQuantity(-1)); // Update total quantity
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    dispatch(updateTotalQuantity(-item.quantity)); // Update total quantity
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return  parseInt(item.cost.replace('$','')) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
        Total Quantity: {totalQuantity}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


