import { Request, Response } from "express";
import { challengeSchema } from "../schema/schemaJoi";
import { ChallengeModel } from "../models/Challenge";
import { CodeModel } from "../models/Code";
import { TestModel } from "../models/TestCase";
import { functionInputDefinitionModel } from "../models/FunctionInputDefinition";
import { CodeTextModel } from "../models/CodeText";
import { FunctionInputValueModel } from "../models/FunctionInputValue";

export const challengeController = {
  createChallenge: async (req: Request, res: Response) => {
    try {
      const { error, value } = challengeSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const { title, category, description, level, code, tests } = value;

      const checkTitle = await ChallengeModel.findOne({ title });
      if (checkTitle) {
        res
          .status(400)
          .json({ message: "title already used for another challenge" });
        return;
      }

      const newInputs = await functionInputDefinitionModel.create(
        code.inputs.map((input: any) => ({
          name: input.name,
          type: input.type,
        }))
      );
      const newCodeTexts = await CodeTextModel.create(
        code.code_text.map((text: any) => ({
          language: text.language,
          content: text.content,
        }))
      );
      const newCode = await CodeModel.create({
        function_name: code.function_name,
        code_text: newCodeTexts,
        inputs: newInputs,
      });

      const newTests = await TestModel.create(
        await Promise.all(
          tests.map(async (test: any) => ({
            weight: test.weight,
            inputs: await FunctionInputValueModel.create(
              test.inputs.map((input: any) => ({
                name: input.name,
                value: input.value,
              }))
            ),
            outputs: test.outputs,
          }))
        )
      );

      const newChallenge = await ChallengeModel.create({
        title,
        category,
        description,
        level,
        code: newCode,
        tests: newTests,
      });
      res.status(201).json({
        message: `"${title}" challenge created successfully`,
        challenge: newChallenge,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  //   getAllChallenges: async (req: Request, res: Response) => {
  //     try {
  //       const { category } = req.query;

  //       if (!category) {
  //         res
  //           .status(200)
  //           .json({ message: "List of challenges:", data: challenges });
  //         return;
  //       }
  //       const selectedChallenges = challenges.filter(
  //         (challenge) => challenge.category === category
  //       );
  //       res.status(200).json({
  //         message: `List of challenges for category ${category}:`,
  //         data: selectedChallenges,
  //       });
  //     } catch (error: any) {
  //       res.status(400).json({
  //         message: error.message,
  //       });
  //     }
  //   },

  //   getChallengeById: async (req: Request, res: Response) => {
  //     try {
  //       const challengeId = req.params.id;
  //       if (!challengeId)
  //         throw new Error(`Challenge with id ${challengeId} does not exist`);
  //       const selectedChallenge = challenges.filter(
  //         (challenge) => challenge._id === parseInt(challengeId)
  //       );
  //       res.status(200).json(selectedChallenge);
  //       return;
  //     } catch (error: any) {
  //       res.status(400).json({
  //         message: error.message,
  //       });
  //     }
  //   },

  //   getAllCategories: async (req: Request, res: Response) => {
  //     try {
  //       const categories = Array.from(
  //         new Set(challenges.map((challenge) => challenge.category))
  //       );
  //       res.status(200).json({
  //         message: "Challenge categories",
  //         data: categories,
  //       });
  //     } catch (error: any) {
  //       res.status(400).json({
  //         message: error.message,
  //       });
  //     }
  //   },
};
