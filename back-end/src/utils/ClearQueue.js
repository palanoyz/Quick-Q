const cron = require('node-cron');
const { QueueModel } = require("../model/Schema");

const ClearQueue = async () => {
    try {
        await QueueModel.deleteMany({});
        console.log('Queue cleared at', new Date());
    } catch (error) {
        console.error('Error clearing queue:', error);
    }
};

// Schedule the task to run at midnight every day
cron.schedule('0 0 * * *', () => {
    console.log('Running clear queue task...');
    ClearQueue();
});

module.exports = { ClearQueue };
