const { DataTypes } = require('sequelize');
const sequilize = require("../config/database");
const User = require("./user");
const Category = require("./categories");

const Courses = sequilize.define("Courses", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true  
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: "id"
        },
        onDelete: "CASCADE"
    },
}, {
    tableName: "courses",
    timestamps: true
});

// ✅ Définition des associations
Courses.belongsTo(User, { foreignKey: "user_id", as: "user" });
Courses.belongsTo(Category, { foreignKey: "category_id", as: "category" });

// Un Utilisateur peut avoir plusieurs Cours
User.hasMany(Courses, {
    foreignKey: "user_id",
    as: "courses",
    onDelete: "CASCADE"
});

// Une Catégorie peut avoir plusieurs Cours
Category.hasMany(Courses, {
    foreignKey: "category_id",
    as: "courses",
    onDelete: "CASCADE"
});


module.exports = Courses;