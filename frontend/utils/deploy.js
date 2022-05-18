const path = require('path');
const ghpages = require('gh-pages');

ghpages.publish(path.resolve(__dirname, '..', 'dist'), (err) => {
  console.log(err);
});
