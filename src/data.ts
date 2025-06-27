type User = {
  id: number
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
};

type Coder = User & {
  description: string;
  score: number;
};

// Temp data until db implementation !
type Manager = User;
export const coders: Coder[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    password: "password123",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    description: "Full-stack developer with a passion for open source.",
    score: 95,
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    password: "securepass456",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    description: "Backend specialist and database enthusiast.",
    score: 88,
  },
  {
    id: 3,
    firstName: "Clara",
    lastName: "Lee",
    email: "clara.lee@example.com",
    password: "clara789",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    description: "Frontend developer and UI/UX designer.",
    score: 92,
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Nguyen",
    email: "david.nguyen@example.com",
    password: "davidpass321",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    description: "DevOps engineer with cloud experience.",
    score: 85,
  },
  {
    id: 5,
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
    id: 1,
    firstName: "Sophie",
    lastName: "Dupont",
    email: "sophie.dupont@example.com",
    password: "sophiepass123",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    id: 2,
    firstName: "Lucas",
    lastName: "Martin",
    email: "lucas.martin@example.com",
    password: "lucaspass456",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 3,
    firstName: "Emma",
    lastName: "Schmidt",
    email: "emma.schmidt@example.com",
    password: "emmapass789",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];
