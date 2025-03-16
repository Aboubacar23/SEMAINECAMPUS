const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Quizz = require("./quizzes")

const Question = sequelize.define("Question", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "quizzes",  
            key: "id"
        },
        onDelete: "CASCADE"
    },
    question_text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "questions",
    timestamps: true
});

// Un Quizz peut avoir plusieurs Questions 
Quizz.hasMany(Question, {
    foreignKey: "quiz_id",
    as: "questions",
    onDelete: "CASCADE"
});

// Une Question appartient à un seul Quizz
Question.belongsTo(Quizz, {
    foreignKey: "quiz_id",
    as: "quizz"
});

module.exports = Question;
