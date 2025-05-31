import { isCartItem, isProduct } from "../validation.js";

const exampleProduct = {
  id: 1001,
  name: "Badanka",
  price: 500,
};

const exampleCartObject = {
  id: 2001,
  amount: 1,
  item: exampleProduct,
};

describe("Validation", () => {
  describe("isProduct", () => {
    test("it  returns true for valid product", () => {
      expect(isProduct(exampleProduct)).toBe(true);
    });

    test("returnerar false om negativt nummer i pris", () => {
      const invalidProduct = { ...exampleProduct, price: -12 };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    test("returnerar false om price är noll", () => {
      const invalidProduct = { ...exampleProduct, price: 0 };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    test("returnerar false om price är string", () => {
      const invalidProduct = { ...exampleProduct, price: "fläskfärs" };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    test("returnerar false om price är null", () => {
      const invalidProduct = { ...exampleProduct, price: null };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    test("returnerar false med tomt id", () => {
      const invalidProduct = { ...exampleProduct };
      delete invalidProduct.id;
      expect(isProduct(invalidProduct)).toBe(false);
    });

    test("returnerar false för id i fel datatyp string", () => {
      const invalidProduct = { ...exampleProduct, id: "1001" };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    test("returnerar false för id null", () => {
      const invalidProduct = { ...exampleProduct, id: null };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    test("returnerar false pga avsaknad av namn", () => {
      const invalidProduct = { ...exampleProduct };
      delete invalidProduct.name;
      expect(isProduct(invalidProduct)).toBe(false);
    });

    test("returnerar false för tom sträng", () => {
      const invalidProduct = { ...exampleProduct, name: "" };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    test("returnerar false för att namnet är null", () => {
      const invalidProduct = { ...exampleProduct, name: null };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    test("returnerar false för fel produkt med fel datatyp", () => {
      const invalidProduct = { id: 1001, name: "produkt" };
      expect(isProduct(invalidProduct)).toBe(false);
    });
  });

  describe("isCartItem", () => {
    test("returns true for a valid cart item", () => {
      expect(isCartItem(exampleCartObject)).toBe(true);
    });

    test("returnerar false om det är -1 i cartItem", () => {
      const invalidCartItem = { ...exampleCartObject, amount: -1 };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    test("returnerar false för om cartItem är noll", () => {
      const invalidCartItem = { ...exampleCartObject, amount: 0 };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    test("returnerar false för fel item där amount är en sträng istället för number", () => {
      const invalidCartItem = { ...exampleCartObject, amount: "banan" };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    //saknas id
    test("returns false for invalid cart item with invalid id", () => {
      const invalidCartItem = { ...exampleCartObject };
      delete invalidCartItem.id;
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    test("returnerar false för fel item i cartitem", () => {
      const invalidCartItem = { ...exampleCartObject, item: "Senap" };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    test("returnerar false om cartItem har ett sträng id", () => {
      const invalidCartItem = { ...exampleCartObject, id: "2078" };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    test("returnerar false för cartitem om det saknas produkt i produkt fältet", () => {
      const invalidProduct = { id: 1001, name: "Product" };
      const invalidCartItem = { ...exampleCartObject, item: invalidProduct };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });
  });
});
