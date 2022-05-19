import router from './routes';
import contractEventHandler from './utils/eventHandler';
import runScheduler from './utils/scheduler';

const express = require('express');
const path = require('path');

const port = process.env.PORT;

contractEventHandler();
runScheduler();

const app = express();
app.use(express.json());
app.use(router);

app.get('*/bundle.js', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'bundle.js')));
app.use('*', express.static(path.resolve(__dirname, '..', 'frontend', 'dist')));

app.listen(port || 5000, async () => {
  console.log(`listening on port ${port || 5000}`);
});
