import Joi from "joi";

export const coderSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  score: Joi.number().required(),
});

export const managerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().uri().optional(),
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
  code: Joi.object({
    functionName: Joi.string().required(),
    codeText: Joi.array().items(
      Joi.object({
        language: Joi.string().valid("py", "js").required(),
        content: Joi.string().required(),
      })
    ),
    inputs: Joi.array().items(
      Joi.object({
        inputName: Joi.string().required(),
        inputType: Joi.string().required(),
      })
    ),
  }),
  tests: Joi.array().items(
    Joi.object({
      weight: Joi.number().min(0).max(1).required(),
      testInputs: Joi.array().items(
        Joi.object({
          testInputName: Joi.string().required(),
          testInputValue: Joi.number().required(),
        })
      ),
      testOutput: Joi.string().required(),
    })
  ),
});