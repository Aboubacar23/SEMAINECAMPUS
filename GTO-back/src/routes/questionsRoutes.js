const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionsController");

// Récupérer toutes les questions
router.get("/", questionController.getAllQuestions);

// Récupérer une question par ID
router.get("/:id", questionController.getQuestionById);

// Créer une nouvelle question
router.post("/", questionController.createQuestion);

// Mettre à jour une question
router.put("/:id", questionController.updateQuestion);

// Supprimer une question
router.delete("/:id", questionController.deleteQuestion);

module.exports = router;
