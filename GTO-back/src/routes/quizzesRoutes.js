const express = require("express");
const router = express.Router();
const quizzesController = require("../controllers/quizzesController");

// Récupérer tous les quizzes
router.get("/", quizzesController.getAllQuizzes);

// Récupérer un quiz par ID
router.get("/:id", quizzesController.getQuizById);

// Créer un nouveau quiz
router.post("/", quizzesController.createQuiz);

// Mettre à jour un quiz
router.put("/:id", quizzesController.updateQuiz);

// Supprimer un quiz
router.delete("/:id", quizzesController.deleteQuiz);

module.exports = router;
