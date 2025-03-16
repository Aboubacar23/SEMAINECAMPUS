const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Courses = require("./courses");
const User = require("./user");

const Enrollment = sequelize.define("Enrollment", {
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
    enrolled_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "enrollments",
    timestamps: false
});

// Un Cours peut avoir plusieurs Inscription
Courses.hasMany(Enrollment, {
    foreignKey: "course_id",
    as: "enrollments",
    onDelete: "CASCADE"
});

// Une Inscription appartient à un seul Cours
Enrollment.belongsTo(Courses, {
    foreignKey: "course_id",
    as: "course"
});

// Un Utilisateur peut avoir plusieurs Inscription
User.hasMany(Enrollment, {
    foreignKey: "user_id",
    as: "enrollments",
    onDelete: "CASCADE"
});

// Une Inscription appartient à un seul Utilisateur
Enrollment.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});



module.exports = Enrollment;
