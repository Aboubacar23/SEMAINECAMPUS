const db = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const Questions = db.question;
const Answer = db.answer;
const Quizz = db.quizze

// Récupérer toutes les questions
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Questions.findAll({
            attributes: { exclude: ["quiz_id"] },
            include: [
                {
                    model: Answer,
                    as: "answers",
                    attributes: ["id", "answer_text", "is_correct"]
                },
                {
                    model: Quizz,
                    as: "quizz",
                    attributes: ["id", "title"]
                }
            ]
        });
        return res.status(200).json({
            status: 'Liste des questions récupérée avec succès',
            questions,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération des questions", err.message || err);
    }
};

// Récupérer une question par ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Questions.findByPk(req.params.id,{
            attributes: { exclude: ["quiz_id"] },
            include: [
                {
                    model: Answer,
                    as: "answers",
                    attributes: ["id", "answer_text", "is_correct"]
                },
                {
                    model: Quizz,
                    as: "quizz",
                    attributes: ["id", "title"]
                }
            ]
        });
        if (!question) return errorResponse(res, "Question non trouvée", null, 404);
        return res.status(200).json({
            status: 'Question récupérée avec succès',
            question,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération de la question", err);
    }
};

// Créer une nouvelle question
exports.createQuestion = async (req, res) => {
    try {
        const { quiz_id, question_text } = req.body;
        if (!quiz_id || !question_text) 
            return errorResponse(res, "quiz_id et question_text sont requis", null, 400);

        const question = await Questions.create({ quiz_id, question_text });
        successResponse(res, "Question ajoutée avec succès", question, 201);
    } catch (err) {
        errorResponse(res, "Erreur lors de l'ajout de la question", err);
    }
};

// Mettre à jour une question
exports.updateQuestion = async (req, res) => {
    try {
        const { quiz_id, question_text } = req.body;
        const { id } = req.params;

        const updated = await Questions.update({ quiz_id, question_text }, { where: { id } });
        if (!updated[0]) return errorResponse(res, "Question non trouvée", null, 404);

        successResponse(res, "Question mise à jour avec succès", { id, quiz_id, question_text });
    } catch (err) {
        errorResponse(res, "Erreur lors de la mise à jour de la question", err);
    }
};

// Supprimer une question
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Questions.destroy({ where: { id } });
        if (!deleted) return errorResponse(res, "Question non trouvée", null, 404);

        successResponse(res, "Question supprimée avec succès", { id });
    } catch (err) {
        errorResponse(res, "Erreur lors de la suppression de la question", err);
    }
};
