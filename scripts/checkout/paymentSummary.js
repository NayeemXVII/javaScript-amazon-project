import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeleveryOptions } from "../../data/deleveryOptions.js";
import { priceCentsFix } from "../utils/money.js";
import { cartTotalQuantity } from "../utils/totalCartItem.js";



export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    
    cart.forEach((cartItems) => {
        const product = getProduct(cartItems.productId);
        productPriceCents += product.priceCents * cartItems.quantity;

        shippingPriceCents += getDeleveryOptions(cartItems.deleveryOptionId).priceCents;
    });

    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const calculateTax = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + calculateTax;

    const paymentHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items (${cartTotalQuantity(cart)}):</div>
    <div class="payment-summary-money">$${priceCentsFix(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${priceCentsFix(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${priceCentsFix(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${priceCentsFix(calculateTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${priceCentsFix(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>`;

    document.querySelector('.js-payment-summary')
        .innerHTML = paymentHTML;
};