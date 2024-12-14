const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class LogsController {
    async getLogs(req, res){
        const type = req.query.type;
        const id = req.query.id;
        console.log(id, req.session)
        const where = {
            user_id: +id
        };

        if (type !== 'all') {
            where.type = type;
        }

        const logs = await prisma.logs.findMany({where})
        if(logs.length === 0){
            return res.status(404).json({message: 'Logs not found'});
        } else {
            return res.status(200).json({logs});
        }
    }
}

module.exports = new LogsController();