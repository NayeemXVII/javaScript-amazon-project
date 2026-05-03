import saveToStorage from "../scripts/utils/localStorage.js";

class Cart {
cartItems;
localKey;

    constructor(localStorageKey) {
        this.localKey = localStorageKey;
        this.loadFromStorage();
    };

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localKey)) || [
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
    };

    addToCart(productId, selectorValue) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += selectorValue;
    } else {
        this.cartItems.push({
            productId,
            quantity: selectorValue,
            deleveryOptionId: 'id1'
        });
    };

    saveToStorage(this.localKey, this.cartItems);
    };

    updateDeleveryOption(productId, deleveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        };
    });

    matchingItem.deleveryOptionId = deleveryOptionId;

    saveToStorage(this.localKey, this.cartItems);
    };
};

const cart = new Cart('cart-oop');
const busnessCart = new Cart('cart-busness');

busnessCart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e', 1);

console.log(busnessCart);
console.log(cart);

console.log(busnessCart instanceof Cart);