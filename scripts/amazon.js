import * as cartItemsControl from '../data/cart.js';
import {products} from '../data/products.js';
import {priceCentsFix} from './utils/money.js';

updateCartQuantity();

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
            $${priceCentsFix(product.priceCents)}
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

let idTimeOut;

function updateCartQuantity() {
  let cartQuantity = 0; 

  cartItemsControl.cart.forEach((item) => {
      cartQuantity += item.quantity
  });

  document.querySelector('.js-add-cart-quantity')
      .innerText = cartQuantity;
}

function addedMessege(productId) {
  const addedMsgElm = document.querySelector(`.js-added-messege-${productId}`);
  addedMsgElm.classList.add('added-msg-show');
    clearTimeout(idTimeOut);

    idTimeOut = setTimeout(() => {
      addedMsgElm.classList.remove('added-msg-show');
    }, 2000);
};

document.querySelectorAll('.js-add-to-cart').forEach((buttons) => {
    buttons.addEventListener('click', () => {
        const { productId } = buttons.dataset;
        const selectorElm = document.querySelector(`.js-quantity-selector-${productId}`);
        const selectorValue = Number(selectorElm.value);
        cartItemsControl.addToCart(productId, selectorValue);
        addedMessege(productId);
        updateCartQuantity();
    });
});