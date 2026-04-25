import saveToStorage from "../scripts/utils/localStorage.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deleveryOptionId: 'id1'
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deleveryOptionId: 'id2'
    }
];

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
          quantity: selectorValue,
          deleveryOptionId: 'id1'
      });
  };

  saveToStorage('cart', cart);
}

export function updateDeleveryOption(productId, deleveryOptionId) {
    let matchingItem;

  cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
          matchingItem = cartItem;
      };
  });



  matchingItem.deleveryOptionId = deleveryOptionId;

  saveToStorage('cart', cart);
};