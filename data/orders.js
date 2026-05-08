import saveToStorage from "../scripts/utils/localStorage.js";

export const orders = JSON.parse(localStorage.getItem('order')) || [];

export function addOrder(orderObject) {
    orders.unshift(orderObject);
    saveToStorage('order', orders);
}