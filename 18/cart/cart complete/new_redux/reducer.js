import { ADD_TO_CART, REMOVE_FROM_CART } from "./action";

const initialState = {
  cart: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingProduct = state.cart.find(item => item.id === action.payload.id);

      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case REMOVE_FROM_CART: {
      
      const existingProduct = state.cart.find(item => item.id === action.payload);

      if (!existingProduct) return state; 

      if (existingProduct.quantity > 1) {
       
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        
      }
    }

    default:
      return state;
  }
};

export default cartReducer;
