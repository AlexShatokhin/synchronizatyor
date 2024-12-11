const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware для проверки авторизации
module.exports = async function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        try {
            // Найдите пользователя в базе данных по userId
            const user = await prisma.users.findUnique({
                where: { id: req.session.userId },
            });

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized. User not found.' });
            }

            // Добавьте информацию о пользователе в req.user
            req.user = user;
            return next(); // Если пользователь авторизован, переходим к следующему обработчику
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    return res.status(401).json({ message: 'Unauthorized. Please log in first.' });
};