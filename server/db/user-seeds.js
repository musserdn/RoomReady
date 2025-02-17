import { User } from '../src/models/user.js';

export const seedUsers = async () => {
  const users = [
    { email: 'nat@gmail.com', password: 'password', type: 'G', room_id: 1 },
    { email: 'dan@gmail.com', password: 'password', type: 'G', room_id: 2 },
    { email: 'kevin@gmail.com', password: 'password', type: 'G', room_id: 3 },
    { email: 'eric@gmail.com', password: 'password', type: 'H', room_id: null },
    { email: 'austin@gmail.com', password: 'password', type: 'H', room_id: null },
  ];

  await User.bulkCreate(users, { individualHooks: true });
};