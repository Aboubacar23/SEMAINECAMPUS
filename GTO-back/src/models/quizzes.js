const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Courses = require("./courses");

const Quiz = sequelize.define("Quiz", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "courses",
            key: "id"
        },
        onDelete: "CASCADE"
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: "quizzes",
    timestamps: true
});

// Un Cours peut avoir plusieurs Quizzes
Courses.hasMany(Quiz, {
    foreignKey: "course_id",
    as: "quizzes",
    onDelete: "CASCADE"
});

// Un Quizz appartient à un seul Cours
Quiz.belongsTo(Courses, {
    foreignKey: "course_id",
    as: "course"
});

module.exports = Quiz;
