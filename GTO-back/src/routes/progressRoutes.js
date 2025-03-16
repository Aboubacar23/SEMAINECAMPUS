const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");

// Récupérer tous les progrès
router.get("/", progressController.getAllProgress);

// Récupérer un progrès par ID
router.get("/:id", progressController.getProgressById);

// Créer un nouveau progrès
router.post("/", progressController.createProgress);

// Mettre à jour un progrès
router.put("/:id", progressController.updateProgress);

// Supprimer un progrès
router.delete("/:id", progressController.deleteProgress);

module.exports = router;
