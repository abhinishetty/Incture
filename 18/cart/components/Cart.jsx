import { useSelector } from "react-redux";
function Cart(){
    const cartItems=useSelector(state=>state.cart);
    return(
        <div>
            <h2>Cart Page</h2>
            {cartItems.length===0 && <p>Cart is empty</p>}
            <ul>
                {cartItems.map((items,index)=>(
                    <li key={index}>{items.name}:{items.price} Rupees</li>
               ) )}
            </ul>
        </div>
    )
}
export default Cart