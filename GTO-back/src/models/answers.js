const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Question = require("./questions")

const Answer = sequelize.define("Answer", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "questions", 
            key: "id"
        },
        onDelete: "CASCADE"
    },
    answer_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: "answers",
    timestamps: true
});

// Une Question peut avoir plusieurs Answers
Question.hasMany(Answer, {
    foreignKey: "question_id",
    as: "answers",
    onDelete: "CASCADE"
});

// Une Answer appartient à une seule Question
Answer.belongsTo(Question, {
    foreignKey: "question_id",
    as: "question"
});

module.exports = Answer;
