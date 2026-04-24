import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let productsHTML =  '';

products.forEach((product, index) => {
        productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-messege-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

document.querySelector('.products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((buttons) => {

    const timeOut = {};

    buttons.addEventListener('click', () => {

        // localStorage.setItem('cart', JSON.stringify(cart));

        const { productId } = buttons.dataset;
        const selectorElm = document.querySelector(`.js-quantity-selector-${productId}`)
        const selectorValue = Number(selectorElm.value);

        let matchingItem;

        cart.forEach((items) => {
            if (items.productId === productId) {
                matchingItem = items;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += selectorValue;
        } else {
            cart.push({
                productId,
                quantity: selectorValue
            });
        };

        const addedMsgElm = document.querySelector(`.js-added-messege-${productId}`);
        addedMsgElm.classList.add('added-msg-show');

          const idTimeOut = timeOut.id;
          clearTimeout(idTimeOut);

          const timeId = setTimeout(() => {
            addedMsgElm.classList.remove('added-msg-show');
          }, 2000);

          timeOut.id = timeId;

        let cartQuantity = 0; 

        cart.forEach((item) => {
            cartQuantity += item.quantity
        });

        document.querySelector('.js-add-cart-quantity')
            .innerText = cartQuantity;


    });
});