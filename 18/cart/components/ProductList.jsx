import {useDispatch } from "react-redux"
import { ADD_TO_CART, addToCart } from "../new_redux/action";
const products=[
    {id:100,name:'IPhone',price:150000},
    {id:200,name:'Dell_laptop',price:250000},
    {id:300,name:'HP_laptop',price:60000},
    {id:400,name:'Samsung_Mobile',price:25000},
]

function ProductList(){
    const dispatch=useDispatch();
    return(
        <div>
<h2>Products:</h2>
{products.map(product=>(
    <div key={product.id} style={{marginBottom:'10px'}}>
        <span>{product.name}::{product.price}</span>
        <button 
        style={{marginLeft:'10px'}}
         onClick={()=>dispatch(addToCart(product))}>Add to cart</button>

        </div>
))}
        </div>
    )
}
export default ProductList