import Joi from '@hapi/joi';

export const genericValidator = (req, res, schema, next) => {
  const { error } = Joi.validate(req.body, schema, {
    abortEarly: false
  });
  if (error) {
    const errors = [];
    const { details: errArr = [] } = error || {};
    errArr.forEach(err => {
      errors.push(err.message.split('"').join(''));
    });
    return res.status(400).json({
      status: res.statusCode,
      errors
    });
  }
  return next();
};

export class Validation {
  static updatePropertyValidator(req, res, next) {
    const schema = Joi.object().keys({
      owner: Joi.number().integer(),
      price: Joi.number().min(0),
      state: Joi.string().min(2),
      city: Joi.string().min(2),
      address: Joi.string().min(2),
      type: Joi.string().min(3)
    });
    genericValidator(req, res, schema, next);
  }

  static addProperyValidator(req, res, next) {
    const schema = Joi.object().keys({
      owner: Joi.number()
        .integer()
        .required(),
      price: Joi.number()
        .min(0)
        .required(),
      state: Joi.string()
        .min(2)
        .required(),
      city: Joi.string()
        .min(2)
        .required(),
      address: Joi.string()
        .min(2)
        .required(),
      type: Joi.string()
        .min(3)
        .required()
    });
    genericValidator(req, res, schema, next);
  }
}
