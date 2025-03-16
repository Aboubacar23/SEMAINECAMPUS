const db = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const CertificateModel = db.certificate;

const User = db.user;
const Courses = db.courses;

exports.getAllCertificates = async (req, res) => {    
    try {        
        const certificates = await CertificateModel.findAll({
            attributes: { exclude: ["user_id", "course_id"] },
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
                }
            ]
        });       
        return res.status(200).json({
            status: 'Liste des certificats récupérée avec succès',
            certificates,
        });
    } catch (err) {        
        errorResponse(res, "Erreur lors de la récupération des certificats", err.message || err);
        console.log(res, "Erreur lors de la récupération des certificats", err.message || err);
    }
};

exports.getCertificateById = async (req, res) => {    
    try {        
        const certificate = await CertificateModel.findByPk(req.params.id, {
            attributes: { exclude: ["user_id", "course_id"] },
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
                }
            ]
        });     

        if (!certificate) 
            return errorResponse(res, "Certificat non trouvé", null, 404);

        return res.status(200).json({
            status: 'Certificat récupéré avec succès',
            certificate,
        });
    } catch (err) {        
        errorResponse(res, "Erreur lors de la récupération du certificat", err); 
        //console.log(res, "Erreur lors de la récupération du certificat", err);   
    }
};

exports.createCertificate = async (req, res) => {    
    try {        
        const { user_id, course_id } = req.body;        
        
        if (!user_id || !course_id) 
            return errorResponse(res, "Utilisateur et cours requis", null, 400);
            //return console.log(res, "Utilisateur et cours requis", null, 400);   

        const certificate = await CertificateModel.create({ user_id, course_id });        
        successResponse(res, "Certificat ajouté avec succès", certificate, 201);
        //console.log(res, "Certificat ajouté avec succès", certificate, 201);

    } catch (err) {        
        errorResponse(res, "Erreur lors de l'ajout d certificat", err);
        //console.log(res, "Erreur lors de l'ajout d certificat", err);  
    }
};

exports.updateCertificate = async (req, res) => {    
    try {        
        const { user_id, course_id } = req.body;        
        const { id } = req.params; 

        const updated = await CertificateModel.update({ user_id, course_id }, { where: { id } });

        if (!updated[0])
            return errorResponse(res, "Certificat non trouvé", null, 404);
            //return console.log(res, "Certificat non trouvé", null, 404);       
        
        successResponse(res, "Certificat mise à jour avec succès", { id, user_id, course_id });
        //console.log(res, "Certificat mise à jour avec succès", { id, user_id, course_id });

    } catch (err) {        
        errorResponse(res, "Erreur lors de la mise à jour du certificat", err);
        //console.log(res, "Erreur lors de la mise à jour du certificat", err);  
    }
};

exports.deleteCertificate = async (req, res) => {    
    try {        
        const { id } = req.params;

        const deleted = await CertificateModel.destroy({ where: { id } }); 

        if (!deleted) 
            return console.log(res, "Certificat non trouvé", null, 404);//errorResponse(res, "Certificat non trouvé", null, 404);        
        
        successResponse(res, "Certificat supprimé avec succès", { id });
        //console.log(res, "Certificat supprimé avec succès", { id });

    } catch (err) {        
        errorResponse(res, "Erreur lors de la suppression du certificat", err);
        //console.log(res, "Erreur lors de la suppression du certificat", err); 
    }
};