// src/routes/index.js
const express = require("express");
const router = express.Router();

const enrollmentRoutes = require("./enrollmentsRoutes");
const userRoutes = require("./userRoutes");
const certicateRoutes = require("./certificateRoutes");
const categoryRoutes = require("./categoriesRoutes");
const quizzeRoutes = require("./quizzesRoutes");
const questionRoutes = require("./questionsRoutes");
const answerRoutes = require("./answersRoutes");
const coursesRoutes = require("./coursesRoutes");
const courseContentRoutes = require("./courseContentRoutes");
const progressRoutes = require("./progressRoutes");

router.use("/enrollments", enrollmentRoutes);  // Route pour les inscriptions
router.use("/users", userRoutes);  // Route pour les utilisateurs
router.use("/certificates", certicateRoutes); // Route pour les certificats
router.use("/categories", categoryRoutes);  // Route pour les catégories
router.use("/quizzes", quizzeRoutes);  // Route pour les quizzes
router.use("/questions", questionRoutes);  // Route pour les questions
router.use("/answers", answerRoutes);  // Route pour les réponses
router.use("/courses", coursesRoutes);  // Route pour les cours
router.use("/courseContents", courseContentRoutes);  // Route pour les contenues de cours
router.use("/progress", progressRoutes);  // Route pour les progrès sur les leçons

module.exports = router;  // On exporte ce router pour l'utiliser dans app.js
