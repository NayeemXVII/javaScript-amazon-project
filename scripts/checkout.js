import { renderCheckOutPage } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/cart-class.js';
import '../data/car.js';
import { cart } from "../data/cart.js";
import { loadProductFetch } from "../data/products.js";

async function loadPage() {
    try {

        // throw 'Error1'

        await loadProductFetch();
    } catch (error) {
        console.log('Unexpected Error. Please Try Again Later.');
    };
    

    renderCheckOutPage();
    renderPaymentSummary();
};

loadPage();

// new Promise((resolve) => {
//     loadProduct(() => {
//         resolve();
//     });
// }).then(() => {
//     renderCheckOutPage();
//     renderPaymentSummary();
// });

// loadProductFetch().then(() => {
//     renderCheckOutPage();
//     renderPaymentSummary();
// });