import { Room } from '../src/models/room.js';

export const seedRooms = async () => {
    const rooms = [
        { room: 1, status: 'Clean' },
        { room: 2, status: 'Scheduled' },
        { room: 3, status: 'Scheduled' },
        { room: 4, status: 'Scheduled' },
        { room: 5, status: 'In Progress' },
        { room: 6, status: 'Clean' },
        { room: 7, status: 'Skipped' },
        { room: 8, status: 'Clean' },
        { room: 9, status: 'Clean' },
        { room: 10, status: 'Clean' },
        { room: 11, status: 'Scheduled' },
        { room: 12, status: 'Scheduled' }
    ];

    await Room.bulkCreate(rooms, { individualHooks: true });
};