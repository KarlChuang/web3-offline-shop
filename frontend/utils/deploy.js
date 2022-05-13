const path = require('path');
const ghpages = require('gh-pages');

ghpages.publish(path.resolve(__dirname, '..', 'dist'), function(err) {
    console.log(err)
});