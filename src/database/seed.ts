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
