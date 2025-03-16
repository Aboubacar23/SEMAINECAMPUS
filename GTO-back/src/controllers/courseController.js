const db = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const CoursesModel = db.courses;
const User = db.user;
const Category = db.category;

exports.getAll = async (req, res) => {    
    try {        
        const courses = await CoursesModel.findAll({
            attributes: { exclude: ["user_id", "category_id"] },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "last_name","first_name", "email","image","description","specialite"]
                },
                {
                    model: Category, // Association avec la catégorie
                    as: "category",
                    attributes: ["id", "name"]
                }
            ]
        });
        return res.status(200).json({
            status: 'success',
            courses,
        });
    } catch (err) {        
        errorResponse(res, "Erreur lors de la récupération des cours", err.message || err);
        console.log(res, "Erreur lors de la récupération des cours", err.message || err);
    }
};

exports.getById = async (req, res) => {
    try {
        const course = await CoursesModel.findByPk(req.params.id, {
            attributes: { exclude: ["user_id", "category_id"] }, // Exclure ces champs de la réponse
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "last_name", "first_name", "email", "image", "description"]
                },
                {
                    model: Category, // Association avec la catégorie
                    as: "category",
                    attributes: ["id", "name"]
                }
            ],
        });

        if (!course) {
            return errorResponse(res, "Cours non trouvé", null, 404);
        }

        return res.status(200).json({
            status: 'success',
            data: course
        });

    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération du cours", err);
    }
};


exports.create = async (req, res) => {    
    try {        
        const { user_id, category_id, title, description, price,image, duration } = req.body;
        console.log(user_id);
        if (!user_id || !category_id)
            return errorResponse(res, "Catégorie et user sont obligatoires", null, 400);

        const certificate = await CoursesModel.create({ user_id, category_id, title, description, price,image, duration });
        successResponse(res, "Cours ajouté avec succès", certificate, 201);

    } catch (err) {        
        errorResponse(res, "Erreur lors de l'ajout d certificat", err);  
    }
};

exports.update = async (req, res) => {    
    try {        
        const { user_id, category_id, title, description, price,image, duration } = req.body;
        const { id } = req.params; 

        const updated = await CoursesModel.update({ user_id, category_id, title, description, price,image, duration }, { where: { id } });

        if (!updated[0])
            return errorResponse(res, "Cours non trouvé", null, 404);     
        
        successResponse(res, "Cours mise à jour avec succès", { title, description, category_id });

    } catch (err) {        
        errorResponse(res, "Erreur lors de la mise à jour du cours", err);
    }
};

exports.delete = async (req, res) => {    
    try {        
        const { id } = req.params;

        const deleted = await CoursesModel.destroy({ where: { id } }); 

        if (!deleted) 
            return errorResponse(res, "Cours non trouvé", null, 404);        
        
        successResponse(res, "Cours supprimé avec succès", { id });

    } catch (err) {        
        errorResponse(res, "Erreur lors de la suppression du cours", err);
    }
};