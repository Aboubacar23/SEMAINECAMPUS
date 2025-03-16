const db = require("../models");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const nodemailer = require("nodemailer");

const Enrollments = db.enrollment;
const User = db.user;
const Courses = db.courses;

// Récupérer toutes les inscriptions
exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollments.findAll({
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
            status: 'Liste des inscriptions récupérée avec succès',
            enrollments,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération des inscriptions", err.message || err);
    }
};

// Récupérer une inscription par ID
exports.getEnrollmentById = async (req, res) => {
    try {
        const enrollment = await Enrollments.findByPk(req.params.id,{
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
        if (!enrollment) return errorResponse(res, "Inscription non trouvée", null, 404);
        return res.status(200).json({
            status: 'Inscription récupérée avec succès',
            enrollment,
        });
    } catch (err) {
        errorResponse(res, "Erreur lors de la récupération de l'inscription", err);
    }
};

// Créer une nouvelle inscription
exports.createEnrollment = async (req, res) => {
    try {
        const { user_id, course_id } = req.body;
        if (!user_id || !course_id) 
            return errorResponse(res, "user_id et course_id requis", null, 400);

        const enrollment = await Enrollments.create({ user_id, course_id });

        const user = await User.findByPk(user_id);
        const course = await Courses.findByPk(course_id);
        const userData = user.toJSON();
        const courseData = course.toJSON();

        const user_email = userData.email;
        const user_name = userData.last_name+' '+userData.first_name;
        const title_course = courseData.title;
        //const categorie_course = courseData.category.name;
        console.log("Email : "+user_email);
        // Envoi d'email de confirmation
        //const user_email = "aboubacarsidikiconde23@gmail.com";
        await sendConfirmationEmail(user_email, user_name, title_course);
        successResponse(res, "Inscription ajoutée avec succès", enrollment, 201);
    } catch (err) {
        errorResponse(res, "Erreur lors de l'ajout de l'inscription", err);
    }
};

// Mettre à jour une inscription
exports.updateEnrollment = async (req, res) => {
    try {
        const { user_id, course_id } = req.body;
        const { id } = req.params;

        const updated = await Enrollments.update({ user_id, course_id }, { where: { id } });
        if (!updated[0]) return errorResponse(res, "Inscription non trouvée", null, 404);

        successResponse(res, "Inscription mise à jour avec succès", { id, user_id, course_id });
    } catch (err) {
        errorResponse(res, "Erreur lors de la mise à jour de l'inscription", err);
    }
};

// Supprimer une inscription
exports.deleteEnrollment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Enrollments.destroy({ where: { id } });
        if (!deleted) return errorResponse(res, "Inscription non trouvée", null, 404);

        successResponse(res, "Inscription supprimée avec succès", { id });
    } catch (err) {
        errorResponse(res, "Erreur lors de la suppression de l'inscription", err);
    }
};


// Fonction pour envoyer un email avec Gmail
async function sendConfirmationEmail(user_email, user_name, title_course) {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        let mailOptions = {
            from: process.env.SMTP_USER,
            to: user_email,
            subject: "Confirmation d'inscription au cours",
            html: `
                <h3>Bonjour,</h3>
                <p>Vous avez une inscription sur le cours : <strong>${title_course}</strong></p>
                <h5>Etudiant/Participant :</h5><strong>${user_name}</strong>
                <p>Merci de nous faire confiance !</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email envoyé avec succès à :", user_email);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
    }
}
