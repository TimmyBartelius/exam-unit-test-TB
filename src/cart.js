/*
Din uppgift:
- skriv testfall för alla funktionerna nedan i cart.test.js (RED)
- skriv kod här för att implementera funktionerna (GREEN)

Tips:
- börja med att identifiera VAD som ska testas.
- om du testar t.ex. removeFromCart får du använda addToCart i början av testet. Den kommer nämligen ha sina egna tester

*/
// function getCartItemCount()
// function getItem(index)
// function getTotalCartValue()
// function addToCart(newItem)
// function removeFromCart(itemId)
// function editCart(itemId, newValues)
// function clearCart()
// -------------------------------------------------- //

import { isCartItem, isProduct } from "./validation.js";

let cart = [];
let idCounter = 2002;
// -------------------------------------------------- //

// Din kod börjar här
// Du får en funktion att börja med

function clearCart() {
  cart = [];
}

function getItem(index) {
  if (index < 0 || index >= cart.length) {
    return null;
  }
  return cart[index];
}

function getCartItemCount() {
  return cart.length;
}

function addToCart(newItem) {
  if (!isProduct(newItem)) {
    return false;
  }

  const cartItem = { id: idCounter, amount: 1, item: newItem };
  idCounter++;
  cart.push(cartItem);
}

function getTotalCartValue() {
  if (cart.length === 0) {
    return 0;
  }
  return cart.reduce((total, cartItem) => {
    return total + cartItem.item.price * cartItem.amount;
  }, 0);
}

function removeFromCart(itemId) {
  const index = cart.findIndex((cartItem) => cartItem.id === itemId);
  if (index === -1) return false;
  cart.splice(index, 1);
  return true;
}

function editCart(itemId, newValues) {
  if (typeof newValues !== "object" || newValues === null) {
    throw new Error("newValues must be an object");
  }

  const cartItem = cart.find((item) => item.id === itemId);
  if (!cartItem) return false;

  if ("amount" in newValues) {
    const newAmount = newValues.amount;
    if (
      typeof newAmount !== "number" ||
      !Number.isInteger(newAmount) ||
      newAmount <= 0
    ) {
      throw new Error(" amount must be a positive number");
    }
    cartItem.amount = newAmount;
  }

  return true;
}

export {
  getCartItemCount,
  addToCart,
  clearCart,
  getItem,
  getTotalCartValue,
  removeFromCart,
  editCart,
};
