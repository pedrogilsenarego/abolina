import cartTypes, { CartState } from "./cart.types";
import { handleAddToCart } from "./cart.utils";

const INITIAL_STATE: CartState = {
  cartItems: [],
};

interface Action {
  type: string;
  payload: any;
}

const cartReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case cartTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItems: action.payload,
        }),
      };
    case cartTypes.DELETE_PRODUCT:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item, id) => item.product.documentID !== action.payload
        ),
      };
      case cartTypes.CHANGE_VALUE:
        const { id, value } = action.payload;
        return {
          ...state,
          cartItems: state.cartItems.map((item) => {
            if (item.product.documentID === id) {
              // Return a new object with the updated value property
              return {
                ...item,
                value: value,
              };
            }
            return item;
          }),
        };
      
    case cartTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
