const cron = require("node-cron");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const DatabaseController = require('./DatabaseController');
const SerializationController = require('./SerializationController');

class ScheduleController {
    scheduledTasks = {};
    removeSchedule = async (req, res) => {
        const { taskID } = req.body;
        if (this.scheduledTasks[sourceType]) {
            this.scheduledTasks[sourceType].stop();
            delete this.scheduledTasks[sourceType];
            await prisma.tasks.deleteMany({
                where: {
                    id: taskID
                },
            })
            return res.status(200).json({ message: `Schedule removed for ${sourceType}` });
        } else {
            return res.status(404).json({ message: `No schedule found for ${sourceType}` });
        }
    }
    setSchedule = async (req, res) => {
        const { sourceType, cronExpression, isSingular, ...args } = req.body;
        console.log(sourceType, cronExpression, isSingular, args);
        // Проверка валидности cron-выражения
        if (cronExpression && !cron.validate(cronExpression)) {
            return res.status(400).json({ message: 'Invalid cron expression' });
        }
    
        // Определить метод контроллера для источника
        let controllerMethod;
        switch (sourceType) {
            case 'mysql':
                controllerMethod = DatabaseController.handleMySQL;
                break;
            case 'postgres':
                controllerMethod = DatabaseController.handlePostgres;
                break;
            case 'xml':
                controllerMethod = SerializationController.handleXml;
                break;
            case 'json':
                controllerMethod = SerializationController.handleJSON;
                break;
            default:
                return res.status(400).json({ message: 'Invalid source type' });
        }
    
        // Создать задачу cron
        if(!isSingular){
            this.scheduledTasks[sourceType] = cron.schedule(cronExpression, async () => {
                console.log(`Executing task for ${sourceType}`);
                try {
                    await controllerMethod(req, res);
                } catch (error) {
                    console.error(`Error executing task for ${sourceType}:`, error.message);
                }
    
                //this.scheduledTasks[sourceType].stop();
            });
            await prisma.tasks.create({
                data: {
                    source: sourceType,
                    user_id: req.session.userId, 
                },
            });
        
        } else{
            try{
                await controllerMethod(req, res);

            } catch (error) {
                res.status(400).json({message: `Error executing task for ${sourceType}:`, error: error.message});
            }
        }
        //res.status(200).json({ message: `Schedule set for ${sourceType}`, cronExpression });
    }
}

module.exports = new ScheduleController();