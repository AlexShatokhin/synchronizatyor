const cron = require("node-cron");
const cuid = require("cuid");
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const DatabaseController = require('./DatabaseController');
const SerializationController = require('./SerializationController');

class ScheduleController {
    scheduledTasks = {};

    generateId = () => {
        return parseInt(cuid().slice(-6), 36);
    }

    removeSchedule = async (req, res) => {
        const { taskID } = req.body;
        console.log(this.scheduledTasks);

        if (this.scheduledTasks[req.session.userId]) {
            const task = this.scheduledTasks[req.session.userId].find(task => task.taskID === taskID);
            task.cron.stop();
            this.scheduledTasks[req.session.userId] = this.scheduledTasks[req.session.userId].filter(task => task.taskID !== taskID);
            await prisma.tasks.deleteMany({
                where: {
                    id: taskID
                },
            })
            // this.scheduledTasks[sourceType].stop();
            // delete this.scheduledTasks[sourceType];

            return res.status(200).json({ message: `Schedule removed for ${taskID}` });
        } else {
            return res.status(404).json({ message: `No schedule found for ${taskID}` });
        }
    }
    setSchedule = async (req, res) => {
        const { sourceType, cronExpression, isSingular, name, ...args } = req.body;
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
                controllerMethod = SerializationController.handleXML;
                break;
            case 'json':
                controllerMethod = SerializationController.handleJSON;
                break;
            default:
                return res.status(400).json({ message: 'Invalid source type' });
        }
    
        // Создать задачу cron
        if(!isSingular){
            if(this.scheduledTasks[req.session.userId] === undefined)
                this.scheduledTasks[req.session.userId] = [];

            const taskID = this.generateId();
            this.scheduledTasks[req.session.userId].push({
                taskID,
                cron: cron.schedule(cronExpression, async () => {
                    console.log(`Executing task for ${sourceType}`);
                    try {
                        await controllerMethod(req, res);
                    } catch (error) {
                        console.error(`Error executing task for ${sourceType}:`, error.message);
                    }
        
                    //this.scheduledTasks[sourceType].stop();
                })
            })
            await prisma.tasks.create({
                data: {
                    id: taskID,
                    name,
                    cron_expression: cronExpression,
                    source: sourceType,
                    user_id: req.session.userId, 
                },
            });
            res.status(200).json({ message: `Schedule set for ${sourceType}`, cronExpression });

        } else{
            try{
                await controllerMethod(req, res);

            } catch (error) {
                res.status(400).json({message: `Error executing task for ${sourceType}:`, error: error.message});
            }
        }
    }

    getSchedule = async (req, res) => {
        const tasks = await prisma.tasks.findMany({
            where: {
                user_id: req.session.userId
            }
        });
        res.status(200).json(tasks);
    }
}

module.exports = new ScheduleController();