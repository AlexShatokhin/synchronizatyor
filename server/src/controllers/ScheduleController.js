const cron = require("node-cron");

const DatabaseController = require('./DatabaseController');
const SerializationController = require('./SerializationController');

class ScheduleController {
    scheduledTasks = {};
    setSchedule = (req, res) => {
        const { sourceType, cronExpression, isSingular, ...args } = req.body;

        // Проверка валидности cron-выражения
        if (!cron.validate(cronExpression)) {
            return res.status(400).json({ message: 'Invalid cron expression' });
        }
    
        // Остановить предыдущую задачу для этого источника, если она существует
        if (this.scheduledTasks[sourceType]) {
            this.scheduledTasks[sourceType].stop();
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
        this.scheduledTasks[sourceType] = cron.schedule(cronExpression, async () => {
            console.log(`Executing task for ${sourceType}`);
            try {
                await controllerMethod({body: args}, res);
            } catch (error) {
                console.error(`Error executing task for ${sourceType}:`, error.message);
            }
            if(isSingular)
                this.scheduledTasks[sourceType].stop();
        });
    
        res.status(200).json({ message: `Schedule set for ${sourceType}`, cronExpression });
    }
}

module.exports = new ScheduleController();