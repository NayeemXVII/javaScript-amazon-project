export function cartTotalQuantity(cart) {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity === 0 ? '' : cartQuantity;
};