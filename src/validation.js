import Joi from "joi";

const productSchema = Joi.object({
  id: Joi.number().integer().min(0).strict().required(),
  name: Joi.string().min(1).required(),
  price: Joi.number().positive().min(1).strict().required(),
});

const cartItemSchema = Joi.object({
  id: Joi.number().integer().min(0).strict().required(),
  amount: Joi.number().integer().min(1).required(),
  item: productSchema.required(),
});

function isCartItem(object) {
  const { error } = cartItemSchema.validate(object);
  return !error;
}

function isProduct(object) {
  const { error } = productSchema.validate(object);
  return !error;
}

export { isCartItem, isProduct };
