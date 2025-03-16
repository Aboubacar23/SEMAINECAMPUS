const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Courses = require("./courses");
const CourseContent = require("./courseContent");
const User = require("./user")

const Progress = sequelize.define("Progress", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",  
            key: "id"
        },
        onDelete: "CASCADE"
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
    course_content_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "course_content",  
            key: "id"
        },
        onDelete: "CASCADE"
    },
    complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: "progress",  
    timestamps: true
});

// Un Cours peut avoir plusieurs Progression
Courses.hasMany(Progress, {
    foreignKey: "course_id",
    as: "progresses",
    onDelete: "CASCADE"
});

// Une Progression appartient à un seul Cours
Progress.belongsTo(Courses, {
    foreignKey: "course_id",
    as: "course"
});

// Un Contenur de cours peut avoir plusieurs Progression
CourseContent.hasMany(Progress, {
    foreignKey: "course_content_id",
    as: "progresses",
    onDelete: "CASCADE"
});

// Une Progression appartient à un seul contenu de cours
Progress.belongsTo(CourseContent, {
    foreignKey: "course_content_id",
    as: "courseContent"
});

// Un Utilisateur peut avoir plusieurs Progression
User.hasMany(Progress, {
    foreignKey: "user_id",
    as: "progresses",
    onDelete: "CASCADE"
});

// Une Progression appartient à un seul Utilisateur
Progress.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

module.exports = Progress;
