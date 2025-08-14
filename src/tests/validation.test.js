// Importerar valideringsfunktioner
import { isCartItem, isProduct } from "../validation.js";

// Exempel på giltig produkt
const exampleProduct = {
  id: 1001,
  name: "Badanka",
  price: 500,
};

// Exempel på giltig cartItem
const exampleCartObject = {
  id: 2001,
  amount: 1,
  item: exampleProduct,
};

// Tester för produktvalidering
describe("Validation", () => {
  describe("isProduct", () => {
    // Giltig produkt ska returnera true
    test("it  returns true for valid product", () => {
      expect(isProduct(exampleProduct)).toBe(true);
    });

    // Pris får inte vara negativt
    test("returnerar false om negativt nummer i pris", () => {
      const invalidProduct = { ...exampleProduct, price: -12 };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    // Pris får inte vara noll
    test("returnerar false om price är noll", () => {
      const invalidProduct = { ...exampleProduct, price: 0 };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    // Pris får inte vara text
    test("returnerar false om price är string", () => {
      const invalidProduct = { ...exampleProduct, price: "fläskfärs" };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    // Pris får inte vara null
    test("returnerar false om price är null", () => {
      const invalidProduct = { ...exampleProduct, price: null };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    // ID måste finnas
    test("returnerar false med tomt id", () => {
      const invalidProduct = { ...exampleProduct };
      delete invalidProduct.id;
      expect(isProduct(invalidProduct)).toBe(false);
    });

    // ID måste vara ett nummer, inte text
    test("returnerar false för id i fel datatyp string", () => {
      const invalidProduct = { ...exampleProduct, id: "1001" };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    // ID får inte vara null
    test("returnerar false för id null", () => {
      const invalidProduct = { ...exampleProduct, id: null };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    // Namn måste finnas
    test("returnerar false pga avsaknad av namn", () => {
      const invalidProduct = { ...exampleProduct };
      delete invalidProduct.name;
      expect(isProduct(invalidProduct)).toBe(false);
    });

    // Namn får inte vara tom sträng
    test("returnerar false för tom sträng", () => {
      const invalidProduct = { ...exampleProduct, name: "" };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    // Namn får inte vara null
    test("returnerar false för att namnet är null", () => {
      const invalidProduct = { ...exampleProduct, name: null };
      expect(isProduct(invalidProduct)).toBe(false);
    });

    // Måste ha korrekt pris-fält
    test("returnerar false för fel produkt med fel datatyp", () => {
      const invalidProduct = { id: 1001, name: "produkt" }; // Saknar price
      expect(isProduct(invalidProduct)).toBe(false);
    });
  });

  // Tester för kundvagnsobjekt
  describe("isCartItem", () => {
    // Giltigt cartItem ska returnera true
    test("returns true for a valid cart item", () => {
      expect(isCartItem(exampleCartObject)).toBe(true);
    });

    // Antalet får inte vara negativt
    test("returnerar false om det är -1 i cartItem", () => {
      const invalidCartItem = { ...exampleCartObject, amount: -1 };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    // Antalet får inte vara noll
    test("returnerar false för om cartItem är noll", () => {
      const invalidCartItem = { ...exampleCartObject, amount: 0 };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    // Antalet måste vara nummer
    test("returnerar false för fel item där amount är en sträng istället för number", () => {
      const invalidCartItem = { ...exampleCartObject, amount: "banan" };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    // ID måste finnas
    test("returns false for invalid cart item with invalid id", () => {
      const invalidCartItem = { ...exampleCartObject };
      delete invalidCartItem.id;
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    // item måste vara ett produktobjekt, inte en sträng
    test("returnerar false för fel item i cartitem", () => {
      const invalidCartItem = { ...exampleCartObject, item: "Senap" };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    // ID får inte vara en sträng
    test("returnerar false om cartItem har ett sträng id", () => {
      const invalidCartItem = { ...exampleCartObject, id: "2078" };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });

    // Produkt i cartItem måste vara giltig produkt
    test("returnerar false för cartitem om det saknas produkt i produkt fältet", () => {
      const invalidProduct = { id: 1001, name: "Product" }; // Saknar pris
      const invalidCartItem = { ...exampleCartObject, item: invalidProduct };
      expect(isCartItem(invalidCartItem)).toBe(false);
    });
  });
});
