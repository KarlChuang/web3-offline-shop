const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');
const contractEventHandler = require('./utils/eventHandler');
// const runScheduler = require('./utils/scheduler');

const port = process.env.PORT;

contractEventHandler();
// runScheduler();

const app = express();
app.use(express.json());
app.use('/api/v1', apiRouter);

app.get('*/bundle.js', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'bundle.js')));
app.use('*', express.static(path.resolve(__dirname, '..', 'frontend', 'dist')));

app.listen(port || 5000, async () => {
  console.log(`listening on port ${port || 5000}`);
});
