const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentsController.js");

// Récupérer toutes les inscriptions
router.get("/", enrollmentController.getAllEnrollments);

// Récupérer une inscription par ID
router.get("/:id", enrollmentController.getEnrollmentById);

// Créer une nouvelle inscription
router.post("/", enrollmentController.createEnrollment);

// Mettre à jour une inscription
router.put("/:id", enrollmentController.updateEnrollment);

// Supprimer une inscription
router.delete("/:id", enrollmentController.deleteEnrollment);

module.exports = router;
