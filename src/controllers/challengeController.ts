import { Request, Response } from "express";
import { ChallengeModel } from "../models/Challenge";
import { CodeModel } from "../models/Code";
import { CodeTextModel } from "../models/CodeText";
import { functionInputDefinitionModel } from "../models/FunctionInputDefinition";
import { FunctionInputValueModel } from "../models/FunctionInputValue";
import { ManagerModel } from "../models/Manager";
import "../models/Submission";
import { TestModel } from "../models/Test";
import { challengeSchema } from "../schema/schemaJoi";

export const challengeController = {
  createChallenge: async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      if (role === "coder") {
        res.status(403).json("User must be manager to create Challenges");
        return;
      }
      const { error, value } = challengeSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const { title, category, description, level, code, test } = value;

      const checkTitle = await ChallengeModel.findOne({ title });
      if (checkTitle) {
        res
          .status(400)
          .json({ message: "title already used for another challenge" });
        return;
      }

      const newCode = await CodeModel.create(
        await Promise.all(
          code.map(async (c: any) => ({
            function_name: c.function_name,
            code_text: await CodeTextModel.create(
              c.code_text.map((text: any) => ({
                language: text.language,
                content: text.content,
              }))
            ),
            inputs: await functionInputDefinitionModel.create(
              c.inputs.map((input: any) => ({
                name: input.name,
                type: input.type,
              }))
            ),
          }))
        )
      );

      const newTests = await TestModel.create(
        await Promise.all(
          test.map(async (test: any) => ({
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
        test: newTests,
        submissions: [],
      });

      const challengeId = newChallenge._id;
      await ManagerModel.findByIdAndUpdate(userId, {
        $push: { challenges: challengeId },
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

  getAllChallenges: async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      const { category } = req.query;
      const filter = category ? { category } : {};
      if (role === "coder") {
        const challenges = await ChallengeModel.find(filter);
        res.status(200).json(challenges);
        return;
      }
      const manager = await ManagerModel.findById(userId);
      if (!manager) {
        res.status(404).json({ message: "Manager not found" });
        return;
      }

      const challenges = await ChallengeModel.find({
        _id: { $in: manager.challenges },
        ...filter,
      }).populate({
        path: "submission",
        select: "status _id",
      });

      //  for (const challenge of challenges) {
      //     const submissions = await SubmissionModel.find({
      //       _id: { $in: challenge.submission },
      //     });
      //     const numpassed = submissions.filter(
      //       (e) => e.status === "Passed"
      //     ).length;
      //     const rate=numpassed/submissions.length
      //   }

      res.status(200).json(challenges);
      return;
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

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

  getAllCategories: async (req: Request, res: Response) => {
    try {
      const categories = await ChallengeModel.distinct("category");
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
