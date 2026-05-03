import { renderCheckOutPage } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import '../data/cart-class.js';
import { cart } from "../data/cart.js";

renderCheckOutPage();
renderPaymentSummary();