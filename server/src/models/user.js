import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export class User extends Model {
    async setPassword(password) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}

export function UserFactory(sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(1),
            allowNull: false,
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'rooms',
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
    }, {
        tableName: 'users',
        sequelize,
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        hooks: {
            beforeCreate: async (user) => {
                await user.setPassword(user.password);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    await user.setPassword(user.password);
                }
            },
        },
    });
    return User;
}
