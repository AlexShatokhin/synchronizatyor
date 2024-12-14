// Middleware для проверки авторизации
module.exports = function ensureAuthenticated(req, res, next) {
    console.log(req.session)
    if (req.session && req.session.userId) {
        return next(); // Если пользователь авторизован, переходим к следующему обработчику
    }
    return res.status(401).json({ message: 'Unauthorized. Please log in first.' });
}
