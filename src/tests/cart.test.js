// importera här
import {
  addToCart,
  getCartItemCount,
  clearCart,
  getItem,
  getTotalCartValue,
  removeFromCart,
  editCart,
} from "../cart";

describe("Cart", () => {
  beforeEach(() => {
    // Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
    clearCart();
  });

  // -------------------------------------------------- //
  // Skriv dina testfall här

  // Du får ett test att börja med
  test("addToCart lägger till en ny produkt i kundvagnen", () => {
    const itemCountBefore = getCartItemCount();
    const input = { id: 1002, name: "Vattenpistol", price: 40 };

    addToCart(input);
    const itemCountAfter = getCartItemCount();

    expect(itemCountAfter).toBe(itemCountBefore + 1);
  });

  test("getCartItemCount returns correct number", () => {
    addToCart({ id: 1, name: "Vattenballong", price: 20 });
    addToCart({ id: 2, name: "vattenhink", price: 30 });

    expect(getCartItemCount()).toBe(2);
  });

  describe("getItems", () => {
    test("getItem tar rätt item genom index", () => {
      const product = { id: 1003, name: "Boll", price: 20 };
      addToCart(product);

      const cartItem = getItem(0);

      expect(cartItem.item).toEqual(product);
      expect(cartItem.amount).toBe(1); // Default amount is 1
      expect(typeof cartItem.id).toBe("number"); // Ensure id is a number
    });

    test("getItem returnerar null för minus index", () => {
      addToCart({ id: 1004, name: "Gurka", price: 30 });

      const result = getItem(-1);
      expect(result).toBeNull();
    });

    test("getItem returnerar null för index mindre än 0", () => {
      addToCart({ id: 1005, name: "Sallad", price: 25 });

      const result = getItem(1);
      expect(result).toBeNull();
    });

    test("getItem returnerar null när carten är tom", () => {
      const result = getItem(0);
      expect(result).toBeNull();
    });
  });

  describe("getTotalCartValue", () => {
    test("getTotalCartValue returnerar noll vid tom vagn", () => {
      expect(getTotalCartValue()).toBe(0);
    });

    test("getTotalCartValue returnerar rätt antal för en produkt", () => {
      addToCart({ id: 1006, name: "Snusnäsduk", price: 20 });
      expect(getTotalCartValue()).toBe(20);
    });

    test("getTotalCartValue returnerar rätt antal för flera produkter", () => {
      addToCart({ id: 1007, name: "Ost", price: 30 });
      addToCart({ id: 1008, name: "Tomat", price: 50 });

      expect(getTotalCartValue()).toBe(80);
    });
  });

  describe("removeFromCart", () => {
    test("tar bort en produkt från cart", () => {
      const product = { id: 1009, name: "Shishkebab", price: 20 };
      addToCart(product);

      const itemCountBefore = getCartItemCount();
      const cartItem = getItem(0);
      const result = removeFromCart(cartItem.id);

      expect(result).toBe(true);
      expect(getCartItemCount()).toBe(itemCountBefore - 1);
    });

    test("removeFromCart returnerar false om produkten inte finns i cart", () => {
      const result = removeFromCart(9999);
      expect(result).toBe(false);
    });
  });

  describe("editCart", () => {
    test("editCart uppdaterar antalet produkter", () => {
      const product = { id: 1010, name: "Bröd", price: 20 };
      addToCart(product);

      const cartItem = getItem(0);
      const newValues = { amount: 3 };

      const result = editCart(cartItem.id, newValues);

      expect(result).toBe(true);
      expect(getItem(0).amount).toBe(3);
    });

    test("editCart returnerar false om produkten inte finns", () => {
      const newValues = { amount: 2 };
      const result = editCart(9999, newValues);
      expect(result).toBe(false);
    });

    test("editCart throws error på felaktigt antal", () => {
      const product = { id: 1011, name: "Bil", price: 100 };
      addToCart(product);

      const cartItem = getItem(0);

      expect(() => {
        editCart(cartItem.id, { amount: -5 });
      }).toThrow("amount must be a positive number");
    });
  });

  // -------------------------------------------------- //
});
