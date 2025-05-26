import Joi from "joi";

// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat

function isCartItem(maybeCartItem) {
  const schema = Joi.object({
    id: Joi.number().integer().min(0).strict().required(),
    name: Joi.string().min(1).required(),
    price: Joi.number().positive().min(1).strict().required(),
  });

  const { error } = schema.validate(maybeCartItem);
  return !error; // returnerar true om produkten är giltig
}

function isProduct(maybeProduct) {
  const schema = Joi.object({
    id: Joi.number().integer().min(0).strict().required(),
    name: Joi.string().min(1).required(),
    price: Joi.number().positive().min(1).strict().required(),
  });

  const { error } = schema.validate(maybeProduct);
  return !error; // returnerar true om produkten är giltig
}

export { isCartItem, isProduct };
