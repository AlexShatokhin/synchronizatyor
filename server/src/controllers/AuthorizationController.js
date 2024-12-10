const bcrypt = require("bcryptjs");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class AuthrizationController {
    async login(req, res){
        const { email, password } = req.body;
        try {
            // Проверка пользователя в базе данных
            const userCheck = await prisma.users.findUnique({
                where: {
                    email,
                }
            })
            //const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            if (!userCheck) 
                return res.status(400).json({ message: 'Invalid username or password' });
    
            const userPassword = userCheck.password;
    
            // Проверка пароля
            const isPasswordValid = await bcrypt.compare(password, userPassword);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }
    
            // Установка сессии
            req.session.userId = userCheck.id;
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            console.error('Error logging in user:', error);
            res.status(500).json({ message: 'Failed to log in', error: error.message });
        }
    }

    async register(req, res){
        const { email, password } = req.body;

        try {
            // Проверка существования пользователя
            const userCheck = await prisma.users.findUnique({
                where: {
                    email
                }
            })
            if (userCheck) return res.status(400).json({ message: 'User already exists' });
    
            // Хэширование пароля
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Сохранение пользователя в базе данных
            await prisma.users.create({
                data: {
                    email,
                    password: hashedPassword
                }
            })
    
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Failed to register user', error: error.message });
        }
    }
}

module.exports = new AuthrizationController();