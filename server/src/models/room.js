import { Model, DataTypes } from 'sequelize';

export class Room extends Model {}

export function RoomFactory(sequelize) {
    Room.init({
        room: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
    }, {
        tableName: 'rooms',
        sequelize,
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });
    return Room;
}