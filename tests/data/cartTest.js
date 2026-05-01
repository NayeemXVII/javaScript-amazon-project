import { addToCart, cart, loadFromStorage } from "../../data/cart.js";
import { deletCartItem } from "../../scripts/checkout/orderSummary.js";

describe('Test Suite: addToCart', () => {

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('add an existing product in the cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deleveryOptionId: 'id1'
                }
            ]);
        });

        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1)

        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        
    });

    it('check cart for new items add', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deleveryOptionId: 'id1'
            }
        ]));
    });
});

describe('Test Suite: removeFromCart', () => {

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
                    quantity: 1,
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
    });

    afterEach(() => {
        document.querySelector('.js-test-container')
            .innerHTML = '';
    });

    it('Remove Product From  The Cart', () => {
        expect(deletCartItem('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});