import * as Joi from 'joi';

export const LoginSchoolAdminValidation = Joi.object().keys({
  email: Joi.string().max(50).email().required(),
  password: Joi.string().min(8).max(32).required(),
});
