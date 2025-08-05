import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, clearCart, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper to parse price string like "$15" to number
  const parsePrice = (price) => Number(price.replace('$', ''));

  // Calculate total cost for an item
  const calculateTotalCost = (item) => parsePrice(item.cost) * item.quantity;

  // Calculate total cart amount
  const calculateTotalAmount = () =>
    cartItems.reduce((sum, item) => sum + calculateTotalCost(item), 0);

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(addItem({ ...item }));
  };

  // Decrement quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch({
        type: 'cart/removeItem',
        payload: { ...item, quantity: 1, decrement: true }
      });
    } else {
      dispatch(removeItem(item));
    }
  };

  // Remove item
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Continue shopping
  const handleContinueShopping = (e) => {
  // Logic to switch view back to product grid
  setShowProductList(true); // Example: show the product listing
};

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map(item => (
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
          </ul>
        )}
      </div>
      <div className="continue_shopping_btn">
      <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
  Checkout
</button>
        <button className="get-started-button3" onClick={() => dispatch(removeItem())}>Remove item</button>
      </div>
    </div>
  );
};

export default CartItem;


