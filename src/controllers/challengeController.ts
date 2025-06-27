import { Request, Response } from "express";
import Joi from "joi";
import { Challenge, Input, Test, TestInput, challenges } from "../data";

const challengeSchema = Joi.object({
  title: Joi.string().min(2).required(),
  category: Joi.string().min(2).required(),
  description: Joi.string().required(),
  level: Joi.string().required(),
  code: Joi.object({
    functionName: Joi.string().required(),
    codeText: Joi.object({
      language: Joi.string().required(),
      text: Joi.string().required(),
    }),
    inputs: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
      })
    ),
    tests: Joi.array().items(
      Joi.object({
        weight: Joi.number().min(0).max(1).required(),
        inputs: Joi.array().items(
          Joi.object({
            name: Joi.string().required(),
            value: Joi.number().required(),
          })
        ),
        output: Joi.string().required(),
      })
    ),
  }),
});

export const challengeController = {
  createChallenge: async (req: Request, res: Response) => {
    const { error, value } = challengeSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
  const { title, category, description, level, code } = value;
  const newChallenge: Challenge = {
    _id: challenges.length + 1, // simulate id generation before I have a db
    title,
    category,
    description,
    level,
    code: {
      functionName: code.functionName,
      codeText: {
        language: code.codeText.language,
        content: code.codeText.content,
      },
      inputs: code.inputs.map((input: any) => ({
        name: input.name,
        type: input.type,
      })),
    },
    tests: code.tests.map((test: any) => ({
      weight: test.weight,
      inputs: test.inputs.map((input: any) => ({
        name: input.name,
        value: input.value,
      })),
      output: test.output,
    })),
  };

  challenges.push(newChallenge);
  res.status(201).json({
    message: `Challenge "${title}" created successfully`,
    challenge: newChallenge,
  });
}
  //   try {
  //     const { error, value } = loginSchema.validate(req.body);
  //     const { email, password } = value;

  //     if (error) {
  //       res.status(400).json({ error: error.details[0].message });
  //       return;
  //     }
  //     const coder = coders.find((coder) => coder.email === email);
  //     if (!coder) throw new Error("Invalid Credentials");

  //     const isMatching = await validatePassword(password, coder.password);
  //     if (!isMatching) throw new Error("Invalid Credentials");

  //     const token = createToken(coder);
  //     res.status(200).json({
  //       message: `User ${email} logged in successfully`,
  //       token: token,
  //     });
  //   } catch (error: any) {
  //     res.status(400).json({
  //       message: error.message,
  //     });
  //   }
  // },

  // getInfoCoder: async (req: Request, res: Response) => {
  //   const coderId = req.params.id;
  //   const coder = coders.find((coder) => coder._id === Number(coderId));

  //   if (!coder) {
  //     res.status(404).json({ error: "User not found" });
  //     return;
  //   }
  //   res.status(200).json(coder);
  // },

  // updateInfoCoder: async (req: Request, res: Response) => {
  //   const { error, value } = coderSchema.validate(req.body);
  //   if (error) {
  //     res.status(400).json({ error: error.details[0].message });
  //     return;
  //   }
  //   const { firstName, lastName, avatar, description } = value;
  //   const coderId = req.params.id;
  //   const coder = coders.find((coder) => coder._id === Number(coderId));
  //   if (!coder) {
  //     res.status(404).json({ error: "User not found" });
  //     return;
  //   }
  //   coder.firstName = firstName;
  //   coder.lastName = lastName;
  //   coder.avatar = avatar;
  //   coder.description = description;

  //   res.status(200).json({
  //     message: `${firstName}'s profile updated successfully`,
  //     coder: coder,
  //   });
  // },
};
