import { Request, Response } from "express";
import Joi from "joi";
import { challenges, Submission, submissions } from "../data";

const submissionSchema = Joi.object({
  challenge_id: Joi.number().required(),
  lang: Joi.string().valid("py", "js").required(),
  code: Joi.string().required(),
});

export const submissionController = {
  createSubmission: async (req: Request, res: Response) => {
    try {
      const { error, value } = submissionSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const { challenge_id, lang, code } = value;
      const challenge = challenges.find(
        (challenge) => challenge._id === Number(challenge_id)
      );
      if (!challenge) {
        res.status(404).json({ error: "Challenge not found" });
        return;
      }

      const newSubmission: Submission = {
        _id: submissions.length + 1, // simulate id generation before I have a db
        challenge_id,
        lang,
        code,
      };

      submissions.push(newSubmission);
      res.status(201).json({
        message: `Submission created successfully`,
        data: newSubmission,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
