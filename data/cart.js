import saveToStorage from "../scripts/utils/localStorage.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId, selectorValue) {
  let matchingItem;

  cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
          matchingItem = cartItem;
      }
  });

  if (matchingItem) {
      matchingItem.quantity += selectorValue;
  } else {
      cart.push({
          productId,
          quantity: selectorValue
      });
  };

  saveToStorage('cart', cart);
}