import { Request, Response } from "express";
import Joi from "joi";
import { Challenge, challenges } from "../data";

const challengeSchema = Joi.object({
  title: Joi.string().min(2).required(),
  category: Joi.string().min(2).required(),
  description: Joi.string().required(),
  level: Joi.string().required(),
  code: Joi.object({
    functionName: Joi.string().required(),
    codeText: Joi.object({
      language: Joi.string().required(),
      content: Joi.string().required(),
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
  },
  getAllChallenges: async (req: Request, res: Response) => {
    try {
      const { category } = req.query;

      if (!category) {
        res.json({ message: "List of challenges:", data: challenges });
        return;
      }
      const selectedChallenges = challenges.filter(
        (challenge) => challenge.category === category
      );
      res.json({
        message: `List of challenges for category ${category}:`,
        data: selectedChallenges,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  getChallengeById: async (req: Request, res: Response) => {
    try {
      const challengeId = req.params.id;
      if (!challengeId)
        throw new Error(`Challenge with id ${challengeId} does not exist`);
      const selectedChallenge = challenges.filter(
        (challenge) => challenge._id === parseInt(challengeId)
      );
      res.json(selectedChallenge);
      return;
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  getAllCategories: async (req: Request, res: Response) => {

    try {
      const categories = Array.from(
        new Set(challenges.map((challenge) => challenge.category))
      );
      console.log(categories);

      res.status(200).json({
        message: "Challenge categories",
        data: categories,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
