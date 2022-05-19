const cron = require('node-cron');

// This task run every 10 minutes
async function runScheduler() {
  cron.schedule('*/15 * * * *', () => {
    // TODO: Iterate through Redis and repost transaction
  });
}
export default runScheduler;
