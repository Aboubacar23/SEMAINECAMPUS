const db = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const Quizzes = db.quizze;
const Courses = db.courses;
const Questions = db.question;
const Answers = db.answer;

// Récupérer tous les quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quizzes.findAll({
            attributes: { exclude: ["course_id"] },
            include: [
                {
                    model: Questions,
                    as: "questions",
                    attributes: ["id", "question_text"],
                    include: [ // Ajout de l'inclusion des réponses
                        {
                            model: Answers,
                            as: "answers",
                            attributes: ["id", "answer_text", "is_correct"]
                        }
                    ]                    
                },
                {
                    model: Courses,
                    as: "course",
                    attributes: ["id", "title", "description", "image", "duration", "price"]
                }
            ]
        });
        return res.status(200).json({
            status: 'Liste des quizzes récupérée avec succès',
            quizzes,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération des quizzes", err.message || err);
    }
};

// Récupérer un quiz par ID
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quizzes.findByPk(req.params.id, {
            attributes: { exclude: ["course_id"] },
            include: [
                {
                    model: Questions,
                    as: "questions",
                    attributes: ["id", "question_text"],
                    include: [ 
                        {
                            model: Answers,
                            as: "answers",
                            attributes: ["id", "answer_text", "is_correct"]
                        }
                    ]                    
                },
                {
                    model: Courses,
                    as: "course",
                    attributes: ["id", "title", "description", "image", "duration", "price"]
                }
            ]
        });
        if (!quiz) return errorResponse(res, "Quiz non trouvé", null, 404);
        return res.status(200).json({
            status: 'Quiz récupéré avec succès',
            quiz,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération du quiz", err);
    }
};

// Créer un nouveau quiz
exports.createQuiz = async (req, res) => {
    try {
        const { course_id, title } = req.body;
        if (!course_id || !title) 
            return errorResponse(res, "course_id et title sont requis", null, 400);

        const quiz = await Quizzes.create({ course_id, title });
        successResponse(res, "Quiz ajouté avec succès", quiz, 201);
    } catch (err) {
        errorResponse(res, "Erreur lors de l'ajout du quiz", err);
    }
};

// Mettre à jour un quiz
exports.updateQuiz = async (req, res) => {
    try {
        const { title } = req.body;
        const { id } = req.params;

        const updated = await Quizzes.update({ title }, { where: { id } });
        if (!updated[0]) return errorResponse(res, "Quiz non trouvé", null, 404);

        successResponse(res, "Quiz mis à jour avec succès", { id, title });
    } catch (err) {
        errorResponse(res, "Erreur lors de la mise à jour du quiz", err);
    }
};

// Supprimer un quiz
exports.deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Quizzes.destroy({ where: { id } });
        if (!deleted) return errorResponse(res, "Quiz non trouvé", null, 404);

        successResponse(res, "Quiz supprimé avec succès", { id });
    } catch (err) {
        errorResponse(res, "Erreur lors de la suppression du quiz", err);
    }
};
