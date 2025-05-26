import { isCartItem, isProduct } from "../validation.js";
// Examples of a valid product and a valid cart item. You may use these when testing below.
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

// Group tests using "describe"
describe("Validation", () => {
  // Använd en "test" eller "it" (de är synonymer) för varje testfall
  /* Exempel på syntax:
	test('beskriv testfallet', () => {
		// här skriver du testkoden
		// avsluta alltid med "expect"
	})
	*/

  test("isProduct returnerar true för en giltig produkt", () => {
    const produkt = { id: 1, name: "Anka", price: 100 };
    expect(isProduct(produkt)).toBe(true);
  });

  test("isCartItem returnerar true för en giltlig produkt", () => {
    const product = { id: 2, name: "David", price: 999 };
    expect(isCartItem(product)).toBe(true);
  });

  test("isCartItem returnerar om joi kraven möts", () => {
    const product = { id: "tre", name: "Joi", price: 200 };
    expect(isCartItem(product)).toBe(false);
  });
  test("isProduct returnerar om joi kraven möts", () => {
    const product = { id: "fyra", name: "fyra", price: 4 };
    expect(isProduct(product)).toBe(false);
  });

  // ---------------------------------------------
  // Följande testfall ska du implementera. Det är tillåtet att använda Joi. Gör i så fall ett schema för varje sorts objekt du vill kunna validera. Du får även ändra texten och du t.ex. vill skriva på svenska i stället för engelska.
  // (Ta bort dessa kommentarer när du är klar)

  // 1. it returns true for a valid cart object
  // 2. it returns false for invalid cart objects

  // 3. it returns true for a valid product
  // 4. it returns false for invalid cart objects
});
