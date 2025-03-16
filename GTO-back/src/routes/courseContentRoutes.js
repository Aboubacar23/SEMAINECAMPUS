const express = require("express");
const router = express.Router();
const courseContentController = require("../controllers/courseContentController");

// Récupérer tous les contenus de cours
router.get("/", courseContentController.getAllCourseContents);

// Récupérer un contenu de cours par ID
router.get("/:id", courseContentController.getCourseContentById);

// Créer un nouveau contenu de cours
router.post("/", courseContentController.createCourseContent);

// Mettre à jour un contenu de cours
router.put("/:id", courseContentController.updateCourseContent);

// Supprimer un contenu de cours
router.delete("/:id", courseContentController.deleteCourseContent);

module.exports = router;
