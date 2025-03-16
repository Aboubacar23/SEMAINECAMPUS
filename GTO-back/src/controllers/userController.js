const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { successResponse, errorResponse } = require('../utils/responseHandler'); // Si tu utilises un gestionnaire de réponses personnalisé
const db = require("../models");
const Courses = db.courses;
const Progress = db.progress;
const Enrollments = db.enrollment;

// Fonction de création d'utilisateur (Inscription)
exports.createUser = async (req, res) => {
    const {email, last_name, first_name, password, role, image, description, specialite} = req.body;
    //const transaction = await sequelize.transaction();
    console.log(req.body);
    try{
        //vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser){
            return res.status(400).json({ message: 'Nom d\'utilisateur déjà existant' });
        }

        //hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password,10);

        //création du nouvelle utilisateur
        const user = await User.create({
            email,
            last_name,
            first_name,
            password: hashedPassword,
            role, 
            image, 
            description, 
            specialite
        });

      //  await transaction.commit();
        successResponse(res, "Utilisateur créé avec succès", user); // On renvoie la réponse de succès
    } catch (err) {
        errorResponse(res, "Erreur lors de la création de l'utilisateur", err.message || err);
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        //cherche le user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User introuvable' });
        }

        // comparer le mpd avec mdp de la base de donnée
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Informations d\'identification non valides' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({token, user });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

// Récupérer tous les users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        successResponse(res, "Liste des users récupérée avec succès", users);
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération des users", err.message || err);
    }
};

// Récupérer un user par ID
exports.getUserID = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Courses,
                    as: "courses",
                    attributes: ["id", "title","description", "image","duration", "price"]
                },
                {
                    model: Enrollments,
                    as: "enrollments",
                    attributes: ["id", "enrolled_at","updated_at"],
                    include:
                        [
                            {
                                model: Courses,
                                as: "course",
                                attributes: ["id", "title","description", "image","duration", "price"],

                            },
                            {
                                model: User,
                                as: "user",
                                attributes: ["id", "image","last_name","first_name", "email"],
                            }
                        ]
                }
            ]
        });
        if (!user) return errorResponse(res, "Inscription non trouvée", null, 404);
        return res.status(200).json({
            status: 'User récupéré avec succès',
            user,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération de l'user", err);
    }
};

// Fonction pour modifier un user
exports.editUser = async (req, res) => {
    const { id } = req.params; // L'ID de l'utilisateur à modifier
    const { email, first_name, last_name, password, role } = req.body; // On récupère les données à modifier

    try {
        // Vérifie si l'utilisateur existe
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Si un mot de passe est fourni, on le hache avant de le mettre à jour
        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

        // Mise à jour des informations de l'utilisateur
        const updatedUser = await user.update({
            email,
            first_name,
            last_name,
            password: hashedPassword,
            role,
        });

        successResponse(res, "Utilisateur mis à jour avec succès", updatedUser);
    } catch (err) {
        errorResponse(res, "Erreur lors de la mise à jour de l'utilisateur", err.message || err);
    }
};



// Supprimer un user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (!deleted) return errorResponse(res, "user non trouvée", null, 404);

        successResponse(res, "User supprimé avec succès", { id });
    } catch (err) {
        errorResponse(res, "Erreur lors de la suppression de l'User", err);
    }
};