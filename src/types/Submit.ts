export type ComputePostBody = {
  lang: string;
  code: string;
  func_name: string;
  tests: ComputeTest[];
};

export type ComputeTest = {
  _id: string;
  inputs: { value: number }[];
  output: number;
};
