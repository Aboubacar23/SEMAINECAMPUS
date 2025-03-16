const db = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const Categories = db.category;
const Courses = db.courses;

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            include: [
                {
                    model: Courses,
                    as: "courses",
                    attributes: ["id", "title","description", "image","duration", "price"]
                }
            ]
        });
        return res.status(200).json({
            status: 'Liste des catégories récupérée avec succès',
            data: categories,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération des catégories", err.message || err);
    }
};

// Récupérer une catégorie par ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Categories.findByPk(req.params.id, {
            include: [
                {
                    model: Courses,
                    as: "courses",
                    attributes: ["id", "title","description", "image","duration", "price"]
                }
            ]
        });
        if (!category) return errorResponse(res, "Catégorie non trouvée", null, 404);
        return res.status(200).json({
            status: 'Catégorie récupérée avec succès',
            category,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération de la catégorie", err);
    }
};

// Créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return errorResponse(res, "Le nom de la catégorie est requis", null, 400);

        const category = await Categories.create({ name });
        successResponse(res, "Catégorie ajoutée avec succès", category, 201);
    } catch (err) {
        errorResponse(res, "Erreur lors de l'ajout de la catégorie", err);
    }
};

// Mettre à jour une catégorie
exports.updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const updated = await Categories.update({ name }, { where: { id } });
        if (!updated[0]) return errorResponse(res, "Catégorie non trouvée", null, 404);

        successResponse(res, "Catégorie mise à jour avec succès", { id, name });
    } catch (err) {
        errorResponse(res, "Erreur lors de la mise à jour de la catégorie", err);
    }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Categories.destroy({ where: { id } });
        if (!deleted) return errorResponse(res, "Catégorie non trouvée", null, 404);

        successResponse(res, "Catégorie supprimée avec succès", { id });
    } catch (err) {
        errorResponse(res, "Erreur lors de la suppression de la catégorie", err);
    }
};
