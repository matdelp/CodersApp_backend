import axios from "axios";
import { Request, Response } from "express";
import { ChallengeModel } from "../models/Challenge";
import { CoderModel } from "../models/Coder";
import { SubmissionModel } from "../models/Submission";
import { coderSchema, loginSchema } from "../schema/schemaJoi";
import { ComputePostBody } from "../types";
import {
  createToken,
  createTokenForRegistration,
  encryptPasword,
  sendMail,
  validatePassword,
} from "../utils";
const CODE_RUNNER_URL = "https://runlang-v1.onrender.com/run";

export const coderController = {
  createCoder: async (req: Request, res: Response) => {
    try {
      const { error, value } = coderSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const { firstName, lastName, email, password, avatar, description } =
        value;
      const checkEmail = await CoderModel.findOne({ email });
      if (checkEmail) {
        res.status(400).json({ message: "email already used to register" });
        return;
      }
      const hashedPswd = await encryptPasword(password);
      const newCoder = await CoderModel.create({
        firstName,
        lastName,
        email,
        password: hashedPswd,
        avatar,
        description,
        score: 0,
        is_verified: false,
        submission: [],
      });
      const regId = newCoder._id.toString();
      const token = createTokenForRegistration(regId, "coder");

      sendMail(email, firstName, token);
      res.status(201).json({
        message: `User ${firstName} ${lastName} created successfully`,
        data: newCoder._id,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  loginCoder: async (req: Request, res: Response) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      const { email, password } = value;

      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const coder = await CoderModel.findOne({ email });
      if (!coder) throw new Error("Invalid Credentials");
      if (!coder.is_verified) throw new Error("Email has not been verified");
      const isMatching = await validatePassword(password, coder.password);
      if (!isMatching) throw new Error("Invalid Credentials");

      const token = createToken(coder._id.toString(), email, "coder");
      res.status(200).json({
        message: `User ${email} logged in successfully`,
        token: token,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  submitCode: async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      const { challengeId, code, lang, func_name } = req.body;
      if (role === "manager") {
        res.status(403).json("User must be coder to submit a solution");
        return;
      }

      const coder = await CoderModel.findById(userId).populate("submission");
      if (!coder) return res.status(404).json({ message: "Coder not found" });

      const challengeSolved = coder.submission.find(
        (submissionItem: any) =>
          submissionItem.challenge_id.toString() === challengeId &&
          submissionItem.status === "passed"
      );
      if (challengeSolved) {
        return res.status(409).json({ message: "Challenge already solved" });
      }

      const selectedChallenge = await ChallengeModel.findById(
        challengeId
      ).populate({
        path: "test",
        populate: {
          path: "inputs",
          model: "FunctionInputValue",
        },
      });

      if (!selectedChallenge)
        return res.status(404).json({ message: "Challenge not found" });
      const submission = await SubmissionModel.create({
        status: "submitted",
        lang,
        code,
        challenge_id: challengeId,
        coder_id: userId,
      });
      await CoderModel.findByIdAndUpdate(userId, {
        $push: { submission: submission._id },
      });

      await ChallengeModel.findByIdAndUpdate(challengeId, {
        $push: { submission: submission._id },
      });
      const subBody: ComputePostBody = {
        lang,
        code,
        func_name,
        tests: selectedChallenge.test.map((test: any) => ({
          _id: test._id.toString(),
          inputs: test.inputs.map((input: any) => ({
            value: Number(input.value),
          })),
          output: Number(test.outputs),
        })),
      };

      let runnerRes;
      try {
        runnerRes = await axios.post(CODE_RUNNER_URL, subBody);
      } catch (error: any) {
        return res.status(418).json({ message: error.message });
      }
      const { status, test_results } = runnerRes!.data;

      await SubmissionModel.findByIdAndUpdate(submission._id, {
        status: status,
      });
      if (status === "passed") {
        const score = selectedChallenge.test.reduce((acc, test: any) => {
          return acc + 100 * test.weight;
        }, 0);

        await CoderModel.findByIdAndUpdate(coder._id, {
          score: score + coder.score,
        });
      }

      return res.status(200).json({
        message: `Challenge sumbmitted, result: ${status}`,
        data: test_results,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
  getCoderProfile: async (req: Request, res: Response) => {
    const { id: userId } = (req as any).user;

    const coder = await CoderModel.findById(userId);

    if (!coder) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const scores = await CoderModel.find({}, "score").sort({ score: -1 });
    const rank =
      scores.findIndex((c) => c._id.toString() === coder._id.toString()) + 1;

    res.status(200).json({
      ...coder.toObject(),
      rank,
    });
  },

  //not updated yet
  // updateInfoCoder: async (req: Request, res: Response) => {
  //   const { error, value } = updateSchema.validate(req.body);
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
