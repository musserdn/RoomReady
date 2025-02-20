import { User } from '../src/models/user.js';

export const seedUsers = async () => {
  const users = [
    { email: 'nat@gmail.com', name: 'Nat', password: 'password', type: 'G', room: 1 },
    { email: 'dan@gmail.com', name: 'Dan', password: 'password', type: 'G', room: 2 },
    { email: 'kevin@gmail.com', name: 'Kevin', password: 'password', type: 'G', room: 3 },
    { email: 'eric@gmail.com', name: 'Eric', password: 'password', type: 'H', room: null },
    { email: 'austin@gmail.com', name: 'Austin', password: 'password', type: 'H', room: null },
    { email: 'kim@gmail.com', name: 'Kim', password: 'password', type: 'G', room: 4 },
  ];

  await User.bulkCreate(users, { individualHooks: true });
};