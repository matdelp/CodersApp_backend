import Joi from "joi";

export const coderSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  score: Joi.number().required(),
  is_verified: Joi.boolean().required(),
  submissions: Joi.array().items(
    Joi.object({
      status: Joi.string().valid("Passed", "Failed").required(),
      lang: Joi.string().required(),
      code: Joi.string().required(),
    })
  ),
});

export const managerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().uri().optional(),
  challenges: Joi.array(),
  is_verified: Joi.boolean().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateSchema = Joi.object({
  firstName: Joi.string().min(2).optional(),
  lastName: Joi.string().min(2).optional(),
  avatar: Joi.string().uri().optional(),
  description: Joi.string().optional(),
});

export const challengeSchema = Joi.object({
  title: Joi.string().min(2).required(),
  category: Joi.string().min(2).required(),
  description: Joi.string().required(),
  level: Joi.string().valid("Easy", "Moderate", "Hard").required(),
  code: Joi.array().items(
    Joi.object({
      function_name: Joi.string().required(),
      code_text: Joi.array().items(
        Joi.object({
          language: Joi.string().valid("py", "js").required(),
          content: Joi.string().required(),
        })
      ),
      inputs: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          type: Joi.string().required(),
        })
      ),
    })
  ),
  tests: Joi.array().items(
    Joi.object({
      weight: Joi.number().min(0).max(1).required(),
      inputs: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          value: Joi.string().required(),
        })
      ),
      outputs: Joi.string().required(),
    })
  ),
  submissions: Joi.array().items(
    Joi.object({
      status: Joi.string().valid("Passed", "Failed").required(),
      lang: Joi.string().required(),
      code: Joi.string().required(),
    })
  ),
});
