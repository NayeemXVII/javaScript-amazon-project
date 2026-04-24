import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import {priceCentsFix} from './utils/money.js';
import saveToStorage from './utils/localStorage.js';
import {cartTotalQuantity} from './utils/totalCartItem.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProducts;

    products.forEach((allProducts) => {
        if (allProducts.id === productId) {
            matchingProducts = allProducts;
        };
    });

    cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProducts.id}">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProducts.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProducts.name}
        </div>
        <div class="product-price">
            $${priceCentsFix(matchingProducts.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-btn" data-product-id="${matchingProducts.id}">
            Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProducts.id}">
            <span class="delete-quantity-link link-primary js-delete-btn" data-delete-id="${matchingProducts.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProducts.id}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProducts.id}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProducts.id}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>`
});

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

const checkOutQuantity = document.querySelector('.js-return-to-home-link');

document.querySelectorAll('.js-delete-btn').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', () => {
        const {deleteId} = deleteBtn.dataset;
        cart.forEach((cartItems, i) => {
            if (cartItems.productId === deleteId) {
                cart.splice(i, 1);
                saveToStorage('cart', cart);
                document.querySelector(`.js-cart-item-container-${deleteId}`).remove();
                document.querySelector('.js-return-to-home-link')
                    .innerText = `${cartTotalQuantity(cart)} items`;
            };
        });

        checkOutQuantity.innerText = `${cartTotalQuantity(cart) || 0} items`;
    });
});

checkOutQuantity.innerText = `${cartTotalQuantity(cart) || 0} items`;

document.querySelectorAll('.js-update-btn').forEach((updateButtons) => {
    let isSave = false;
    updateButtons.addEventListener('click', () => {

        const {productId} = updateButtons.dataset;

        const inputElm = document.querySelector(`.js-quantity-input-${productId}`);
        inputElm.classList.toggle('quantity-input-toggle');
        const value = Number(inputElm.value);

        if (!isSave) {
            updateButtons.innerText = 'Save';
            isSave = true;
        } else {
            updateButtons.innerText = 'Update';
            cart.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    cartItem.quantity = value;
                }

                saveToStorage('cart', cart);
            });
            isSave = false;
        };
    });
});