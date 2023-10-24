const Joi = require(`joi`);

const registerSchema = Joi.object({
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    emailPhoneNumber: Joi.alternatives([
        Joi.string().email(),
        Joi.string().pattern(/^[0-9]{10}$/),
    ])
        .required()
        .strip(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,30}$/)
        .trim()
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .trim()
        .required()
        .strip(),
    phoneNumber: Joi.forbidden().when("emailPhoneNumber", {
        is: Joi.string().pattern(/^[0-9]{10}$/),
        then: Joi.string().default(Joi.ref("emailPhoneNumber")),
    }),
    email: Joi.forbidden().when("emailPhoneNumber", {
        is: Joi.string().email(),
        then: Joi.string().default(Joi.ref("emailPhoneNumber")),
    }),
});

const loginSchema = Joi.object({
    emailPhoneNumber: Joi.string().required(),
    password: Joi.string().required(),
});


const updateUserSchema = Joi.object({
    firstname:Joi.string().allow('', null),
    lastname:Joi.string().allow('', null),
    emailPhoneNumber: Joi.alternatives([
      Joi.string().email({ tlds: false }),
      Joi.string().pattern(/^[0-9]{10}$/)
    ]).allow('', null).strip(),
    phoneNumber: Joi.forbidden().when("emailPhoneNumber", {
        is: Joi.string().pattern(/^[0-9]{10}$/),
        then: Joi.string().default(Joi.ref("emailPhoneNumber")),
    }),
    email: Joi.forbidden().when("emailPhoneNumber", {
        is: Joi.string().email(),
        then: Joi.string().default(Joi.ref("emailPhoneNumber")),
    }),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,30}$/)
      .trim()
      .required(),
});

module.exports = { registerSchema, loginSchema ,updateUserSchema};
