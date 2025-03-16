const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answersController");

// Récupérer toutes les réponses
router.get("/", answerController.getAllAnswers);

// Récupérer une réponse par ID
router.get("/:id", answerController.getAnswerById);

// Créer une nouvelle réponse
router.post("/", answerController.createAnswer);

// Mettre à jour une réponse
router.put("/:id", answerController.updateAnswer);

// Supprimer une réponse
router.delete("/:id", answerController.deleteAnswer);

module.exports = router;
