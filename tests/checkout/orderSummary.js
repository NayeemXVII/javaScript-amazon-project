import { renderCheckOutPage } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe('Test Suite: Render Order Summary', () => {

beforeEach(() => {
    document.querySelector('.js-test-container')
        .innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-return-to-home-link"></div>
            <div class="js-payment-summary"></div>
        `;

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([
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
        ]);
    });

    loadFromStorage();
    renderCheckOutPage();
});

afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
});


    it('display the cart', () => {

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector('.js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerText).toContain('Quantity: 2');

        expect(document.querySelector('.js-test-product-name-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

        expect(document.querySelector('.js-test-product-name-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerText).toContain('$');

        expect(document.querySelector('.js-product-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d').innerText).toContain('Quantity: 1');
    });

    it('Remove a Product', () => {

        document.querySelector('.js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        expect(document.querySelector('.js-cart-item-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6')).toEqual(null);

        expect(document.querySelector('.js-cart-item-container-15b6fc6f-327a-4ec4-896f-486349e85a3d')).not.toEqual(null);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    });
});