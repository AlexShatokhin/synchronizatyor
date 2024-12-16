const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware для проверки авторизации
module.exports = function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized. Please log in first.' });
};