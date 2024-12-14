const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class LogsController {
    getConvertedStatus = (status) => {
        switch (status) {
            case 'COMPLETE':
                return 'success';
            case 'FAIL':
                return 'error';
            default:
                return 'error';
        }
    }
    getLogs = async (req, res) => {
        const type = req.query.type;
        const status = req.query.status;
        const id = req.query.id;
        const where = {
            user_id: +id
        };

        if (type !== 'all') {
            where.type = type;
        }
        if(status !== 'all'){
            where.status = this.getConvertedStatus(status);
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