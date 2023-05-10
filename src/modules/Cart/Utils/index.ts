import { CartProduct } from "../../../slicer/cart/cart.types";

export const getTotalValue = (cartProducts:CartProduct[]) => {
  
  let totalValue = 0;
  for (const cartProduct of cartProducts) {
    const price = !cartProduct?.product?.discount
    ? Number(cartProduct?.product?.price)
    : Number(
      (Number(cartProduct?.product.price) * (1 - cartProduct?.product?.discount / 100)).toFixed(2)
    );
    totalValue += price * cartProduct.value;
  }
  return totalValue;
};