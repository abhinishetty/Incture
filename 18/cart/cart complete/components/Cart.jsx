import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../new_redux/action";

function Cart() {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  let total = 0;
  for (let item of cartItems) {
    total += item.price * item.quantity;
  }

  return (
    <div>
      <h2>Cart Page</h2>
      {cartItems.length === 0 && <p>Cart is empty</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}

            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove from Cart
            </button>
          </li>
        ))}
      </ul>

      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default Cart;
