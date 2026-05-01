
import {cart, updateDeleveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {priceCentsFix} from '../utils/money.js';
import saveToStorage from '../utils/localStorage.js';
import {cartTotalQuantity} from '../utils/totalCartItem.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deleveryOptions, getDeleveryOptions } from '../../data/deleveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderCheckOutPage() {
    const today = dayjs();
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;

        const matchingProducts = getProduct(productId);
        const deleveryOptionId = cartItem.deleveryOptionId;

        const deleveryOption = getDeleveryOptions(deleveryOptionId);

        const dateAdd = today.add(deleveryOption.deleveryDays, 'days').format('dddd, MMMM D');

        cartSummaryHTML += `<div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProducts.id}">
        <div class="delivery-date">
            Delivery date: ${dateAdd}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProducts.image}">

            <div class="cart-item-details js-test-product-name-${matchingProducts.id}">
            <div class="product-name">
                ${matchingProducts.name}
            </div>
            <div class="product-price">
                $${priceCentsFix(matchingProducts.priceCents)}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProducts.id}">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-btn" data-product-id="${matchingProducts.id}">
                Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProducts.id}">
                <span class="delete-quantity-link link-primary js-delete-btn js-delete-link-${matchingProducts.id}" data-delete-id="${matchingProducts.id}">
                Delete
                </span>
            </div>
            </div>


            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
                ${deleveryOptionHTML(matchingProducts.id, cartItem)}
            </div>
            </div>
        </div>
        </div>
        `
    });

    function deleveryOptionHTML(matchingProducts, cartItem) {
        let HTML = '';
        deleveryOptions.forEach((deleveryTime) => {
            const deleveryDate = today.add(deleveryTime.deleveryDays, 'days');

            const priceString = deleveryTime.priceCents === 0 ? 'FREE' : `$${priceCentsFix(deleveryTime.priceCents)}`;

            const isChecked = deleveryTime.id === cartItem.deleveryOptionId ? 'checked' : '';

            const dateFormate = deleveryDate.format('dddd, MMMM D');

            HTML += `
                <div class="delivery-option js-delevery-option"
                data-product-id="${matchingProducts}"
                data-delevery-id="${deleveryTime.id}">
                <input type="radio" ${isChecked}
                class="delivery-option-input"
                name="delivery-option-${matchingProducts}">
                <div>
                <div class="delivery-option-date">
                    ${dateFormate}
                </div>
                <div class="delivery-option-price">
                    ${priceString} - Shipping
                </div>
                </div>
            </div>`;
        });
        return HTML;
    };

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

    const checkOutQuantity = document.querySelector('.js-return-to-home-link');

    document.querySelectorAll('.js-delete-btn').forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', () => {
            const {deleteId} = deleteBtn.dataset;
            deletCartItem(deleteId)
        });
    });

    document.querySelector('.js-return-to-home-link')
        .innerText = `${cartTotalQuantity(cart)} items`;

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

                renderCheckOutPage();
                isSave = false;
            };
        });
    });

    document.querySelectorAll('.js-delevery-option').forEach((radioButtons) => {
        radioButtons.addEventListener('click', () => {
            const {productId, deleveryId} = radioButtons.dataset;
            updateDeleveryOption(productId, deleveryId);
            renderCheckOutPage();
        });
    });

    renderPaymentSummary();
};

export function deletCartItem(deleteId) {
    cart.forEach((cartItems, i) => {
        if (cartItems.productId === deleteId) {
            cart.splice(i, 1);
            saveToStorage('cart', cart);
        };
    });

    renderCheckOutPage();

    return cart.length;
};