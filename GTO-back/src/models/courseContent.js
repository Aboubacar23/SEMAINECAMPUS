const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Courses = require("./courses")

const CourseContent = sequelize.define("CourseContent", {
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
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "course_content",
    timestamps: true
});

// Un Cours peut avoir plusieurs Contenues
Courses.hasMany(CourseContent, {
    foreignKey: "course_id",
    as: "courseContents",
    onDelete: "CASCADE"
});

// Un Contenu de cours appartient à un seul Cours
CourseContent.belongsTo(Courses, {
    foreignKey: "course_id",
    as: "course"
});


module.exports = CourseContent;
