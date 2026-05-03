import saveToStorage from "../scripts/utils/localStorage.js";

function Cart(localKey) {
        const cart = {
        cartItems: undefined,
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localKey)) || [
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
        },

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

        saveToStorage(localKey, this.cartItems);
        },

        updateDeleveryOption(productId, deleveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingItem = cartItem;
            };
        });

        matchingItem.deleveryOptionId = deleveryOptionId;

        saveToStorage(localKey, this.cartItems);
        }
        
    };

    return cart;
};

const cart = Cart('cart-oop');
const busnessCart = Cart('cat-buesness');

cart.loadFromStorage();
busnessCart.loadFromStorage();

console.log(cart);

busnessCart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e', 1);
console.log(busnessCart);