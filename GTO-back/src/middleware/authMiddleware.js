// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // On extrait le token du header Authorization
    if (!token) {
        return res.status(403).json({ message: 'Token requis' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide ou expiré' });
        }
        req.userId = decoded.userId; // Stocke l'ID de l'utilisateur dans la requête
        next();
    });
};

module.exports = { verifyToken };
