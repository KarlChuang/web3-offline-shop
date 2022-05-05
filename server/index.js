const express = require('express');
const path = require('path');

const port = process.env.PORT;

const app = express();

const router = ['/'];
for (let i = 0; i < router.length; i += 1) {
    app.use(router[i], express.static(path.resolve(__dirname, '..', 'public')));
    app.use(router[i], express.static(path.resolve(__dirname, '..', 'dist')));
}

app.listen(port || 5000, async () => {
    console.log(`listening on port ${port || 5000}`);
});
