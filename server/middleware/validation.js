import Joi from '@hapi/joi';

export const genericValidator = (req, res, schema, next) => {
  const { error } = Joi.validate(req.body, schema, {
    abortEarly: false,
    convert: true
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
      price: Joi.number().min(0),
      state: Joi.string()
        .strict()
        .trim()
        .min(2),
      city: Joi.string()
        .strict()
        .trim()
        .min(2),
      address: Joi.string()
        .strict()
        .trim()
        .min(2),
      type: Joi.string().regex(/^(2 bedroom|3 bedroom|mini flat|others)$/)
    });
    genericValidator(req, res, schema, next);
  }

  static addProperyValidator(req, res, next) {
    const schema = Joi.object().keys({
      price: Joi.number()
        .min(0)
        .required(),
      state: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),
      city: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),
      address: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),
      type: Joi.string()
        .trim()
        .regex(/^(2 bedroom|3 bedroom|mini flat|others)$/)
        .required(),
      image: Joi.binary()
    });
    genericValidator(req, res, schema, next);
  }

  static userValidator(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      first_name: Joi.string()
        .strict()
        .trim()
        .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
        .min(2)
        .max(30)
        .required(),
      last_name: Joi.string()
        .alphanum()
        .strict()
        .trim()
        .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
        .min(2)
        .max(30)
        .required(),
      password: Joi.string()
        .min(6)
        .max(50)
        .required(),
      phone_number: Joi.string()
        .strict()
        .trim()
        .regex(/^[0-9]{7,10}$/)
        .required(),
      address: Joi.string()
        .strict()
        .trim()
        .min(2)
        .max(50)
        .required()
    });
    genericValidator(req, res, schema, next);
  }
}
