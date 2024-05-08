const { DataTypes } = require('sequelize');
const { AlldbServices } = require('../services/indexServices')

const { dbServices } = AlldbServices;

const MyFriend = dbServices.config.define('my_friends', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'my_friends',
    timestamps: false,
    freezeTableName: true,
});

export default MyFriend;
