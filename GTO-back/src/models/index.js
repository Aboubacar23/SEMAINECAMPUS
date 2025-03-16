const sequilize = require("../config/database");

const db = {};
const enrollment = require('./enrollment');
const user = require('./user');
const certificate = require("./certificate");
const category = require('./categories');
const quizze = require('./quizzes');
const question = require('./questions');
const answers = require('./answers');
const courses = require('./courses');
const courseContent = require('./courseContent');
const progress = require('./progress');

db.sequelize = sequilize;
db.enrollment = enrollment;
db.user = user;
db.certificate = certificate;
db.courseContent = courseContent;
db.progress = progress


db.category = category;
db.quizze = quizze;
db.question = question;
db.answer = answers;
db.courses = courses;

module.exports = db;

