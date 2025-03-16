const db = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const Progress = db.progress;
const CourseContent = db.courseContent;
const Courses = db.courses;
const User = db.user;

// Récupérer tous les progrès
exports.getAllProgress = async (req, res) => {
    try {
        const progress = await Progress.findAll(
            {
                attributes: { exclude: ["user_id", "course_id", "course_content_id"] },
                include: [
                    {
                        model: User,
                        as: "user",
                        attributes: ["id", "last_name","first_name", "email","image","description","specialite"]
                    },
                    {
                        model: Courses,
                        as: "course",
                        attributes: ["id", "title", "description", "image", "duration", "price"]
                    },
                    {
                        model: CourseContent,
                        as: "courseContent",
                        attributes: ["id", "title", "content", "position"]
                    }
                ]
            });
        return res.status(200).json({
            status: 'Liste des progrès récupérée avec succès',
            progress,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération des progrès", err.message || err);
    }
};

// Récupérer un progrès par ID
exports.getProgressById = async (req, res) => {
    try {
        const progress = await Progress.findByPk(req.params.id,{
            attributes: { exclude: ["user_id", "course_id", "course_content_id"] },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "last_name","first_name", "email"]
                },
                {
                    model: Courses,
                    as: "course",
                    attributes: ["id", "title", "description", "image", "duration", "price"]
                },
                {
                    model: CourseContent,
                    as: "courseContent",
                    attributes: ["id", "title", "content", "position"]
                }
            ]
        });
        if (!progress) return errorResponse(res, "Progrès non trouvé", null, 404);
        return res.status(200).json({
            status: 'Progrès récupéré avec succès',
            progress,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération du progrès", err);
    }
};

// Créer un nouveau progrès
exports.createProgress = async (req, res) => {
    try {
        const { user_id, course_id, lesson_id, complete } = req.body;
        if (!user_id || !course_id || !lesson_id || complete === undefined) 
            return errorResponse(res, "user_id, course_id, lesson_id et complete requis", null, 400);

        const progress = await Progress.create({ user_id, course_id, lesson_id, complete });
        successResponse(res, "Progrès ajouté avec succès", progress, 201);
    } catch (err) {
        errorResponse(res, "Erreur lors de l'ajout du progrès", err);
    }
};

// Mettre à jour un progrès
exports.updateProgress = async (req, res) => {
    try {
        const { user_id, course_id, lesson_id, complete } = req.body;
        const { id } = req.params;

        const updated = await Progress.update({ user_id, course_id, lesson_id, complete }, { where: { id } });
        if (!updated[0]) return errorResponse(res, "Progrès non trouvé", null, 404);

        successResponse(res, "Progrès mis à jour avec succès", { id, user_id, course_id, lesson_id, complete });
    } catch (err) {
        errorResponse(res, "Erreur lors de la mise à jour du progrès", err);
    }
};

// Supprimer un progrès
exports.deleteProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Progress.destroy({ where: { id } });
        if (!deleted) return errorResponse(res, "Progrès non trouvé", null, 404);

        successResponse(res, "Progrès supprimé avec succès", { id });
    } catch (err) {
        errorResponse(res, "Erreur lors de la suppression du progrès", err);
    }
};
