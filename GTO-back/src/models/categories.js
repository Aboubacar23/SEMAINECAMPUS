const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
}, {
    timestamps: true,
    tableName: 'categories'
});

// Exporter le modèle
module.exports = Category;