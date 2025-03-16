const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoriesController");

// Récupérer toutes les catégories
router.get("/", categoriesController.getAllCategories);

// Récupérer une catégorie par ID
router.get("/:id", categoriesController.getCategoryById);

// Créer une nouvelle catégorie
router.post("/", categoriesController.createCategory);

// Mettre à jour une catégorie
router.put("/:id", categoriesController.updateCategory);

// Supprimer une catégorie
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
