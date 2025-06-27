// Temp data until db implementation !

export type User = {
  _id: number; // removed upon db implementation
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
};

type Coder = User & {
  description?: string;
  score: number;
};

type Manager = User;

export type Challenge = {
  _id: number; // removed upon db implementation
  title: string;
  category: string;
  description: string;
  level: string;
  code: Code;
  tests: Test[];
};

type Code = {
  functionName: string;
  codeText: CodeText;
  inputs: Input[];
};

type CodeText = {
  language: string;
  content: string;
};

export type Input = {
  inputName: string;
  inputType: string;
};
export type Test = {
  weight: number;
  testInputs: TestInput[];
  testOutputs: string;
};
export type TestInput = {
  testInputName: string;
  testInputValue: string;
};

export const coders: Coder[] = [
  {
    _id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    password: "password123",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    description: "Full-stack developer with a passion for open source.",
    score: 95,
  },
  {
    _id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    password: "securepass456",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    description: "Backend specialist and database enthusiast.",
    score: 88,
  },
  {
    _id: 3,
    firstName: "Clara",
    lastName: "Lee",
    email: "clara.lee@example.com",
    password: "clara789",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    description: "Frontend developer and UI/UX designer.",
    score: 92,
  },
  {
    _id: 4,
    firstName: "David",
    lastName: "Nguyen",
    email: "david.nguyen@example.com",
    password: "davidpass321",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    description: "DevOps engineer with cloud experience.",
    score: 85,
  },
  {
    _id: 5,
    firstName: "Eva",
    lastName: "Martinez",
    email: "eva.martinez@example.com",
    password: "evapass654",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    description: "Mobile app developer and tech blogger.",
    score: 90,
  },
];
export const managers: Manager[] = [
  {
    _id: 1,
    firstName: "Sophie",
    lastName: "Dupont",
    email: "sophie.dupont@example.com",
    password: "sophiepass123",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    _id: 2,
    firstName: "Lucas",
    lastName: "Martin",
    email: "lucas.martin@example.com",
    password: "lucaspass456",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    _id: 3,
    firstName: "Emma",
    lastName: "Schmidt",
    email: "emma.schmidt@example.com",
    password: "emmapass789",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

export const challenges: Challenge[] = [
  {
    _id: 1,
    title: "fibonacci",
    category: "Math",
    description:
      "### Problem Statement:\nCompute the nth Fibonacci number. The Fibonacci sequence is defined as follows: `F(0) = 0`, `F(1) = 1`, and `F(n) = F(n-1) + F(n-2)` for `n > 1`.\n\n### Example:\nFor example, the 6th Fibonacci number is `F(6) = 8`.\n\n### Constraints:\n- The input `n` is a non-negative integer.\n- `0 <= n <= 30`.\n\n### Approach:\nA simple approach is to use recursion. Define a function `fibonacci(n)` that returns the nth Fibonacci number. The base cases are when `n` is `0` or `1`.\n\n### Implementation:\nDefine a recursive function `fibonacci(n)` that handles the base cases and recursively computes the sum of the previous two Fibonacci numbers.",
    level: "Medium",
    code: {
      functionName: "fibonacci",
      codeText: {
        language: "js",
        content: "function fibonacci(n) {\n    return 0;\n}",
      },
      inputs: [
        {
          inputName: "n",
          inputType: "number",
        },
      ],
    },
    tests: [
      {
        weight: 0.8,
        testInputs: [
          {
            testInputName: "n",
            testInputValue: "6",
          },
        ],
        testOutputs: "8",
      },
    ],
  },
  {
    _id: 2,
    title: "is_prime",
    category: "Math",
    description:
      "### Problem Statement:\nDetermine if a given integer `n` is a prime number. A prime number is a number greater than 1 that has no positive divisors other than 1 and itself.\n\n### Example:\nFor example, `7` is prime, but `8` is not.\n\n### Constraints:\n- The input `n` is an integer.\n- `2 <= n <= 1000`.\n\n### Approach:\nCheck if `n` is divisible by any integer from `2` to `sqrt(n)`. If it is, then `n` is not prime.\n\n### Implementation:\nDefine a function `is_prime(n)` that returns `True` if `n` is prime, otherwise `False`.",
    level: "Easy",
    code: {
      functionName: "is_prime",
      codeText: {
        language: "js",
        content: "function is_prime(n) {\n    return false;\n}",
      },
      inputs: [
        {
          inputName: "n",
          inputType: "number",
        },
      ],
    },
    tests: [
      {
        weight: 0.8,
        testInputs: [
          {
            testInputName: "n",
            testInputValue: "7",
          },
        ],
        testOutputs: "true",
      },
    ],
  },
  {
    _id: 3,
    title: "reverse_string",
    category: "String",
    description:
      '### Problem Statement:\nReverse a given string `s`.\n\n### Example:\nFor example, the reverse of `"hello"` is `"olleh"`.\n\n### Constraints:\n- The input `s` is a string.\n- `1 <= len(s) <= 100`.\n\n### Approach:\nConvert the string to a list, reverse it, and join it back to a string.\n\n### Implementation:\nDefine a function `reverse_string(s)` that returns the reversed string.',
    level: "Easy",
    code: {
      functionName: "reverse_string",
      codeText: {
        language: "js",
        content: 'function reverse_string(s) {\n    return "";\n}',
      },
      inputs: [
        {
          inputName: "s",
          inputType: "string",
        },
      ],
    },
    tests: [
      {
        weight: 0.8,
        testInputs: [
          {
            testInputName: "s",
            testInputValue: "hello",
          },
        ],
        testOutputs: "olleh",
      },
    ],
  },
];
