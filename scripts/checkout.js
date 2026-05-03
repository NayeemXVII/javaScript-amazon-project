import { renderCheckOutPage } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import '../data/cart-opp.js';
import { cart } from "../data/cart.js";

renderCheckOutPage();
renderPaymentSummary();