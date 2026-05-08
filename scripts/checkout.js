import { renderCheckOutPage } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/cart-class.js';
import '../data/car.js';
import { cart } from "../data/cart.js";
import { loadProduct } from "../data/products.js";

new Promise((resolve) => {
    loadProduct(() => {
        resolve();
    });
}).then(() => {
    renderCheckOutPage();
    renderPaymentSummary();
});