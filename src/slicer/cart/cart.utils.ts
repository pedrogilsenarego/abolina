import { Book } from "../books/books.types";

 


 interface CartProduct {
  product:Book;
  value:number
}

export interface CartState {
  cartItems: CartProduct[]
}

interface Props {
  prevCartItems: CartProduct[];
  nextCartItems: Book[];
}

 
export const handleAddToCart = ({ prevCartItems, nextCartItems }: Props) => {
  const updatedCartItems = prevCartItems.slice(); // create a copy of the previous cart items array
  for (let i = 0; i < nextCartItems.length; i++) {
    const nextCartItem = nextCartItems[i];
    const existingCartItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.product.documentID === nextCartItem.documentID
    );
    if (existingCartItemIndex !== -1) {
      // item already exists in cart, increment the value
      updatedCartItems[existingCartItemIndex] = {
        product: nextCartItem,
        value: updatedCartItems[existingCartItemIndex].value + 1,
      };
    } else {
      // item doesn't exist in cart, add it
      updatedCartItems.push({
        product: nextCartItem,
        value: 1,
      });
    }
  }
  return updatedCartItems;
};



// export const handleRemoveCartItem = ({ prevCartItems, cartItemToRemove }) => {
// 	return prevCartItems.filter(
// 		(item) => item.reference !== cartItemToRemove.reference
// 	);
// };

// export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
// 	const existingCartItem = prevCartItems.find(
// 		(cartItem) => cartItem.documentID === cartItemToReduce.documentID
// 	);

// 	if (existingCartItem.quantity === 1) {
// 		return prevCartItems.filter(
// 			(cartItem) => cartItem.documentID !== existingCartItem.documentID
// 		);
// 	}

// 	return prevCartItems.map((cartItem) =>
// 		cartItem.documentID === existingCartItem.documentID
// 			? {
// 					...cartItem,
// 					quantity: cartItem.quantity - 1
// 			  }
// 			: cartItem
// 	);
// };
