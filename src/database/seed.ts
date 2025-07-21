import { ChallengeModel } from "../models/Challenge";
import { CodeModel } from "../models/Code";
import { CoderModel } from "../models/Coder";
import { CodeTextModel } from "../models/CodeText";
import { functionInputDefinitionModel } from "../models/FunctionInputDefinition";
import { FunctionInputValueModel } from "../models/FunctionInputValue";
import { ManagerModel } from "../models/Manager";
import { SubmissionModel } from "../models/Submission";
import { TestModel } from "../models/Test";
import { challenge, coders, managers } from "../seedData";

const createCoders = async () => {
  for (const coder of coders) {
    await CoderModel.create(coder);
  }
};

const createManagers = async (challenge_id: String[]) => {
  let first = true;
  for (const manager of managers) {
    if (first) {
      await ManagerModel.create({ ...manager, challenges: challenge_id });
      first = false;
    } else {
      await ManagerModel.create({ ...manager, challenges: [] });
    }
  }
};

const createChallenge = async () => {
<<<<<<< HEAD
  const challengeIds = [];
  for (const challenge of challenges) {
    const texts = [];
    for (const text of challenge.code.code_text || []) {
      const newCodeText = await CodeTextModel.create(text);
      texts.push(newCodeText);
    }

    const inputs = [];
    for (const input of challenge.code.inputs || []) {
      const newInput = await functionInputDefinitionModel.create(input);
      inputs.push(newInput);
    }
    const code = await CodeModel.create({
      function_name: challenge.code.function_name,
      code_text: texts,
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
=======
  const challenge_id = [];
  const newCode = await CodeModel.create(
    await Promise.all(
      challenge.code.map(async (c: any) => ({
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
      challenge.test.map(async (test: any) => ({
>>>>>>> feature/Eservice-ContentManagement
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

  const challengDb = await ChallengeModel.create({
    title: challenge.title,
    category: challenge.category,
    description: challenge.description,
    level: challenge.level,
    code: newCode,
    test: newTests,
  });

  challenge_id.push(challengDb._id);
  return challenge_id;
};

export const seed = async () => {
  await createCoders();
  const ids = await createChallenge();
  await createManagers(ids.map((id) => id.toString()));
};
