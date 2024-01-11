import joi from "joi";

export const inputUserValidation = (payload) => {
  const schema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
  });

  return schema.validate(payload);
};
