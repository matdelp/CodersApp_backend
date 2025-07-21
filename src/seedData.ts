// Temp data until db implementation !

import mongoose from "mongoose";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  is_verified: boolean;
};
type Manager = User & {
  challenges: Challenge[];
};
export type Coder = User & {
  description?: string;
  score: number;
  submission: String[];
};

type Challenge = {
  title: string;
  category: string;
  description: string;
  level: "Easy" | "Moderate" | "Hard";
  code: Code[];
  test: Test[];
  submission: String[];
};

type Code = {
  function_name: string;
  code_text: CodeText[];
  inputs: Input[];
};

type CodeText = {
  language: "py" | "js";
  content: string;
};

type Input = {
  name: string;
  type: string;
};
type Test = {
  weight: number;
  inputs: TestInput[];
  outputs: string;
};
type TestInput = {
  name: string;
  value: string;
};

type Submission = {
  status: string;
  lang: "py" | "js";
  code: string;
};

export const coders: Coder[] = [
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    password: "$2b$10$UOeCWZOJQ1Uypvon77pIVembJlt7P12L.MC5EYvkvQ2uongbwd4om", //password123
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    description: "Full-stack developer with a passion for open source.",
    score: 95,
    is_verified: true,
    submission: [],
  }, //token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjM3N2MyYWJhNDdiNjk4MGQ5MTQ4OCIsImVtYWlsIjoiYWxpY2Uuam9obnNvbkBleGFtcGxlLmNvbSIsInJvbGUiOiJjb2RlciIsImlhdCI6MTc1MTM1MDQzNywiZXhwIjoxNzUzOTQyNDM3fQ.mjfjhw0FsPsrs3sE6RQLMqfjif_K7_valZ_gVGy7ess
  {
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    password: "$2b$10$UOeCWZOJQ1Uypvon77pIVembJlt7P12L.MC5EYvkvQ2uongbwd4om",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    description: "Backend specialist and database enthusiast.",
    score: 88,
    is_verified: true,
    submission: [],
  },
];

export const challenge: Challenge = {
  title: "factorial",
  category: "Math",
  description: `### Problem Statement:\nCompute the factorial of a
non-negative integer \`n\`, denoted as \`n!\`. The factorial of \`n\` is the product
of all positive integers less than or equal to \`n\`.\n\n### Example:\nFor
example, the factorial of \`5\` is \`5! = 5 * 4 * 3 * 2 * 1 = 120\`.\n\n###
Constraints:\n- The input \`n\` is a non-negative integer.\n- \`0 <= n <=
20\`.\n\n### Approach:\nA simple approach to compute the factorial of \`n\` is to
use recursion. We define a recursive function \`factorial(n)\` that returns the
factorial of \`n\`. The base case of the recursion is when \`n\` is \`0\` or \`1\`, in
which case the factorial is \`1\`. Otherwise, we recursively compute the
factorial of \`n-1\` and multiply it by \`n\`.\n\n### Implementation:\nTo implement
this, we can define a recursive function \`factorial(n)\` that takes a
non-negative integer \`n\` as input and returns its factorial. In the function,
we handle the base case when \`n\` is \`0\` or \`1\`, and recursively call
\`factorial(n-1)\` for other values of \`n\`. Finally, we return the product of \`n\`
and the factorial of \`n-1\`.`,
  level: "Hard",
  code: [
    {
      function_name: "factorial",
      code_text: [
        {
          language: "py",
          content: "def factorial(n):\n return 1",
        },
        {
          language: "js",
          content: "function factorial(n) {\n return 1\n}",
        },
      ],
      inputs: [
        {
          name: "n",
          type: "number",
        },
      ],
    },
  ],
  test: [
    {
      weight: 0.8,
      inputs: [
        {
          name: "n",
          value: "5",
        },
      ],
      outputs: "120",
    },
  ],
  submission: [],
};

export const managers: Manager[] = [
  {
    firstName: "Sophie",
    lastName: "Dupont",
    email: "sophie.dupont@example.com",
    password: "$2b$10$UOeCWZOJQ1Uypvon77pIVembJlt7P12L.MC5EYvkvQ2uongbwd4om",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    challenges: [],
    is_verified: true,
    //"token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjIzY2JlNDZiZWMxYTNhODYyNTdjOCIsImVtYWlsIjoic29waGllLmR1cG9udEBleGFtcGxlLmNvbSIsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzUxMjcwMjUzLCJleHAiOjE3NTM4NjIyNTN9.fImwNOQPG0jMgKLaJXULDVFFwVnl7bL06yA9SmjEAcs
  },
  {
    firstName: "Lucas",
    lastName: "Martin",
    email: "lucas.martin@example.com",
    password: "$2b$10$UOeCWZOJQ1Uypvon77pIVembJlt7P12L.MC5EYvkvQ2uongbwd4om",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    challenges: [],
    is_verified: true,
    //"token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjIzY2JlNDZiZWMxYTNhODYyNTdjYSIsImVtYWlsIjoibHVjYXMubWFydGluQGV4YW1wbGUuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE3NTEyNzAzOTksImV4cCI6MTc1Mzg2MjM5OX0.JduzbYSVrO2LFTCFZ9GvNYTqNi4P5ElIWyg7GdXU29o
  },
];
// export const submissions: Submission[] = [
//   {
//     status: "Passed",
//     lang: "py",
//     code: "def factorial(n):\n\tif n == 0: return 2 \n\treturn n *factorial(n-1)",
//   },
//   {
//     status: "Failed",
//     lang: "js",
//     code: "def factorial(n):\n\tif n == 0: return 2 \n\treturn n *factorial(n-1)",
//   },
// ];

export const leaderboard: Coder[] = [];

type TopKCoders = {
  name: string;
  k: number;
};
export const topKcoders: TopKCoders[] = [];

export const solvedChallenges = [];

export const trendingCategories = [];

export const heatmap = [];
