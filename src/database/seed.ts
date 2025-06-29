import { ChallengeModel } from "../models/Challenge";
import { CodeModel } from "../models/Code";
import { CoderModel } from "../models/Coder";
import { CodeTextModel } from "../models/CodeText";
import { functionInputDefinitionModel } from "../models/FunctionInputDefinition";
import { FunctionInputValueModel } from "../models/FunctionInputValue";
import { ManagerModel } from "../models/Manager";
import { SubmissionModel } from "../models/Submission";
import { TestModel } from "../models/TestCase";
import { challenges, coders, managers, submissions } from "../seedData";

const createCoders = async () => {
  for (const coder of coders) {
    await CoderModel.create(coder);
  }
};

const createManagers = async (challengeIds: String[]) => {
  let first = true;
  for (const manager of managers) {
    if (first) {
      await ManagerModel.create({ ...manager, challenges: challengeIds });
      first = false;
    } else {
      await ManagerModel.create({ ...manager, challenges: [] });
    }
  }
};

const createChallenge = async () => {
  const challengeIds = [];
  for (const challenge of challenges) {
    const codeText = await CodeTextModel.create(challenge.code.codeText);
    const inputs = [];
    for (const input of challenge.code.inputs || []) {
      const newInput = await functionInputDefinitionModel.create(input);
      inputs.push(newInput);
    }
    const code = await CodeModel.create({
      function_name: challenge.code.function_name,
      codeText: codeText,
      inputs: inputs,
    });

    const testInputs = [];
    for (const test of challenge.tests || []) {
      for (const input of test.inputs || []) {
        const newTestInput = await FunctionInputValueModel.create(input);
        testInputs.push({ _id: newTestInput._id });
      }
    }
    const tests = [];
    for (const test of challenge.tests || []) {
      const newTest = await TestModel.create({
        weight: test.weight,
        inputs: testInputs,
        outputs: test.outputs,
      });
      tests.push(newTest);
    }

    const challengDb = await ChallengeModel.create({
      title: challenge.title,
      category: challenge.category,
      description: challenge.description,
      level: challenge.level,
      code: code,
      tests: tests,
    });
    challengeIds.push(challengDb._id);
  }
  return challengeIds;
};

const createSubmission = async (challengeIds: String[]) => {
  for (const submission of submissions) {
    await SubmissionModel.create({
      challenge_id: challengeIds[0],
      status: submission.status,
      lang: submission.lang,
      code: submission.code,
    });
  }
};

export const seed = async () => {
  await createCoders();
  const ids = await createChallenge();
  await createManagers(ids.map((id) => id.toString()));
  await createSubmission(ids.map((id) => id.toString()));
};
