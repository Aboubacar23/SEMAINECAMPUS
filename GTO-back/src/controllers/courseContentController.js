const db = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const CourseContents = db.courseContent;
const Courses = db.courses

// Récupérer tous les contenus de cours
exports.getAllCourseContents = async (req, res) => {
    try {
        const courseContents = await CourseContents.findAll({
            attributes: { exclude: ["course_id"] },
            include: [
                {
                    model: Courses,
                    as: "course",
                    attributes: ["id", "title", "description", "image", "duration", "price"]
                }
            ]
        });
        return res.status(200).json({
            status: 'Liste des contenus de cours récupérée avec succès',
            courseContents,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération des contenus de cours", err.message || err);
    }
};

// Récupérer un contenu de cours par ID
exports.getCourseContentById = async (req, res) => {
    try {
        const courseContent = await CourseContents.findByPk(req.params.id, {
            attributes: { exclude: ["course_id"] },
            include: [
                {
                    model: Courses,
                    as: "course",
                    attributes: ["id", "title", "description", "image", "duration", "price"]
                }
            ]
        });
        if (!courseContent) return errorResponse(res, "Contenu de cours non trouvé", null, 404);
        return res.status(200).json({
            status: 'Contenu de cours récupéré avec succès',
            courseContent,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération du contenu de cours", err);
    }
};

// Créer un nouveau contenu de cours
exports.createCourseContent = async (req, res) => {
    try {
        const { course_id, title, content, position } = req.body;
        if (!course_id || !title || !content || !position)
            return errorResponse(res, "course_id, title, content et position requis", null, 400);

        const courseContent = await CourseContents.create({ course_id, title, content, position });
        successResponse(res, "Contenu de cours ajouté avec succès", courseContent, 201);
    } catch (err) {
        errorResponse(res, "Erreur lors de l'ajout du contenu de cours", err);
    }
};

// Mettre à jour un contenu de cours
exports.updateCourseContent = async (req, res) => {
    try {
        const { course_id, title, content, position } = req.body;
        const { id } = req.params;

        const updated = await CourseContents.update({ course_id, title, content, position }, { where: { id } });
        if (!updated[0]) return errorResponse(res, "Contenu de cours non trouvé", null, 404);

        successResponse(res, "Contenu de cours mis à jour avec succès", { id, course_id, title, content, position });
    } catch (err) {
        errorResponse(res, "Erreur lors de la mise à jour du contenu de cours", err);
    }
};

// Supprimer un contenu de cours
exports.deleteCourseContent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CourseContents.destroy({ where: { id } });
        if (!deleted) return errorResponse(res, "Contenu de cours non trouvé", null, 404);

        successResponse(res, "Contenu de cours supprimé avec succès", { id });
    } catch (err) {
        errorResponse(res, "Erreur lors de la suppression du contenu de cours", err);
    }
};
