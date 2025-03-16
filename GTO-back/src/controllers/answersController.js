const db = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const Answers = db.answer; 
const Question = db.question;

// Récupérer toutes les réponses
exports.getAllAnswers = async (req, res) => {
    try {
        const answers = await Answers.findAll({
            attributes: { exclude: ["question_id"] },
            include: [
                {
                    model: Question,
                    as: "question",
                    attributes: ["id", "question_text"]
                }
            ]
        });
        return res.status(200).json({
            status: 'Liste des réponses récupérée avec succès',
            answers,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération des réponses", err.message || err);
    }
};

// Récupérer une réponse par ID
exports.getAnswerById = async (req, res) => {
    try {
        const answer = await Answers.findByPk(req.params.id,{
            attributes: { exclude: ["question_id"] },
            include: [
                {
                    model: Question,
                    as: "question",
                    attributes: ["id", "question_text"]
                }
            ]
        } );
        if (!answer) return errorResponse(res, "Réponse non trouvée", null, 404);
        return res.status(200).json({
            status: 'Réponse récupérée avec succès',
            answer,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération de la réponse", err);
    }
};

// Créer une nouvelle réponse
exports.createAnswer = async (req, res) => {
    try {
        const { question_id, answer_text, is_correct } = req.body;
        if (!question_id || !answer_text || is_correct === undefined) 
            return errorResponse(res, "question_id, answer_text et is_correct requis", null, 400);

        const answer = await Answers.create({ question_id, answer_text, is_correct });
        successResponse(res, "Réponse ajoutée avec succès", answer, 201);
    } catch (err) {
        errorResponse(res, "Erreur lors de l'ajout de la réponse", err);
    }
};

// Mettre à jour une réponse
exports.updateAnswer = async (req, res) => {
    try {
        const { answer_text, is_correct } = req.body;
        const { id } = req.params;

        const updated = await Answers.update({ answer_text, is_correct }, { where: { id } });
        if (!updated[0]) return errorResponse(res, "Réponse non trouvée", null, 404);

        successResponse(res, "Réponse mise à jour avec succès", { id, answer_text, is_correct });
    } catch (err) {
        errorResponse(res, "Erreur lors de la mise à jour de la réponse", err);
    }
};

// Supprimer une réponse
exports.deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Answers.destroy({ where: { id } });
        if (!deleted) return errorResponse(res, "Réponse non trouvée", null, 404);

        successResponse(res, "Réponse supprimée avec succès", { id });
    } catch (err) {
        errorResponse(res, "Erreur lors de la suppression de la réponse", err);
    }
};
