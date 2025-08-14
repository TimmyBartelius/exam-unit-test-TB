// Importerar funktioner som ska testas från cart-modulen
import {
  addToCart,
  getCartItemCount,
  clearCart,
  getItem,
  getTotalCartValue,
  removeFromCart,
  editCart,
} from "../cart";

// Grupp av tester för cart-funktionalitet
describe("Cart", () => {
  beforeEach(() => {
    // Körs före varje test. Rensar kundvagnen så att tester inte påverkar varandra.
    clearCart();
  });

  // Testar att addToCart faktiskt lägger till en produkt i kundvagnen
  test("addToCart lägger till en ny produkt i kundvagnen", () => {
    const itemCountBefore = getCartItemCount(); // Antal innan vi lägger till
    const input = { id: 1002, name: "Vattenpistol", price: 40 };

    addToCart(input); // Lägger till produkten
    const itemCountAfter = getCartItemCount(); // Antal efter tillägg

    expect(itemCountAfter).toBe(itemCountBefore + 1); // Ska ha ökat med 1
  });

  // Testar att getCartItemCount returnerar rätt antal produkter
  test("getCartItemCount returns correct number", () => {
    addToCart({ id: 1, name: "Vattenballong", price: 20 });
    addToCart({ id: 2, name: "vattenhink", price: 30 });

    expect(getCartItemCount()).toBe(2); // Ska vara 2 produkter i vagnen
  });

  // Tester relaterade till getItem
  describe("getItems", () => {
    // Testar att getItem returnerar rätt produkt vid giltigt index
    test("getItem tar rätt item genom index", () => {
      const product = { id: 1003, name: "Boll", price: 20 };
      addToCart(product);

      const cartItem = getItem(0); // Hämtar första objektet i vagnen

      expect(cartItem.item).toEqual(product); // Produkten stämmer
      expect(cartItem.amount).toBe(1); // Antalet ska vara 1
      expect(typeof cartItem.id).toBe("number"); // cartItem har ett numeriskt id
    });

    // Testar att negativa index returnerar null
    test("getItem returnerar null för minus index", () => {
      addToCart({ id: 1004, name: "Gurka", price: 30 });

      const result = getItem(-1);
      expect(result).toBeNull();
    });

    // Testar att index som är större än max returnerar null
    test("getItem returnerar null för index mindre än 0", () => {
      addToCart({ id: 1005, name: "Sallad", price: 25 });

      const result = getItem(1); // Index 1 finns inte (endast 1 produkt)
      expect(result).toBeNull();
    });

    // Testar att getItem returnerar null om kundvagnen är tom
    test("getItem returnerar null när carten är tom", () => {
      const result = getItem(0);
      expect(result).toBeNull();
    });
  });

  // Tester för beräkning av totalvärde i kundvagnen
  describe("getTotalCartValue", () => {
    // Tom vagn ska ge 0
    test("getTotalCartValue returnerar noll vid tom vagn", () => {
      expect(getTotalCartValue()).toBe(0);
    });

    // En produkt ger värdet av dess pris
    test("getTotalCartValue returnerar rätt värde för en produkt", () => {
      addToCart({ id: 1006, name: "Snusnäsduk", price: 20 });
      expect(getTotalCartValue()).toBe(20);
    });

    // Flera produkter ger summan av deras pris
    test("getTotalCartValue returnerar rätt värde för flera produkter", () => {
      addToCart({ id: 1007, name: "Ost", price: 30 });
      addToCart({ id: 1008, name: "Tomat", price: 50 });

      expect(getTotalCartValue()).toBe(80);
    });
  });

  // Tester för att ta bort produkter
  describe("removeFromCart", () => {
    test("tar bort en produkt från cart", () => {
      const product = { id: 1009, name: "Shishkebab", price: 20 };
      addToCart(product);

      const itemCountBefore = getCartItemCount();
      const cartItem = getItem(0);
      const result = removeFromCart(cartItem.id); // Tar bort med ID

      expect(result).toBe(true); // Borttagning lyckades
      expect(getCartItemCount()).toBe(itemCountBefore - 1); // Antalet minskat med 1
    });

    // Om ID inte finns ska funktionen returnera false
    test("removeFromCart returnerar false om produkten inte finns i cart", () => {
      const result = removeFromCart(9999);
      expect(result).toBe(false);
    });
  });

  // Tester för att ändra antal produkter i kundvagnen
  describe("editCart", () => {
    test("editCart uppdaterar antalet produkter", () => {
      const product = { id: 1010, name: "Bröd", price: 20 };
      addToCart(product);

      const cartItem = getItem(0);
      const newValues = { amount: 3 }; // Nytt antal

      const result = editCart(cartItem.id, newValues);

      expect(result).toBe(true); // Uppdatering lyckades
      expect(getItem(0).amount).toBe(3); // Antalet är ändrat
    });

    // Om produkten inte finns ska funktionen returnera false
    test("editCart returnerar false om produkten inte finns", () => {
      const newValues = { amount: 2 };
      const result = editCart(9999, newValues);
      expect(result).toBe(false);
    });

    // Negativt antal ska kasta ett fel
    test("editCart throws error på felaktigt antal", () => {
      const product = { id: 1011, name: "Bil", price: 100 };
      addToCart(product);

      const cartItem = getItem(0);

      expect(() => {
        editCart(cartItem.id, { amount: -5 });
      }).toThrow("amount must be a positive number");
    });
  });
});
