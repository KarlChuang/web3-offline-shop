const cron = require('node-cron');
const db = require('../models');

// This task run every 10 minutes
async function runScheduler() {
  cron.schedule('*/15 * * * *', () => {
    // TODO: Iterate through Redis and repost transaction

    const signatures = db.Signature.findAll({});
    console.log('unhandled signatures: ', signatures);
  });
}
module.exports = runScheduler;
