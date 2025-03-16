const { DataTypes } = require('sequelize');
const sequilize = require("../config/database");

const User = require("./user");
const Courses = require("./courses");

const Certificate = sequilize.define("Certificate",
    {    
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
            allowNull: false ,
            references: {
                model: "courses",
                key: "id"
            },
            onDelete: "CASCADE"  
        }
    }, 
    {    
        tableName: "certificates",    
        timestamps: true
    }
);

// Un Cours peut avoir plusieurs Certification
Courses.hasMany(Certificate, {
    foreignKey: "course_id",
    as: "certificates",
    onDelete: "CASCADE"
});

// Une Certification appartient à un seul Cours
Certificate.belongsTo(Courses, {
    foreignKey: "course_id",
    as: "course"
});

// Un Utilisateur peut avoir plusieurs Certification
User.hasMany(Certificate, {
    foreignKey: "user_id",
    as: "certificates",
    onDelete: "CASCADE"
});

// Une Certification appartient à un seul Utilisateur
Certificate.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

module.exports = Certificate;