const fs = require('node:fs');
const path = require('node:path');
const {marked} = require('marked');

function readme(req, res, next) {
    const readmePath = path.join(__dirname, '..', 'README.md');

    fs.readFile(readmePath, 'utf8', (err, data) => {
        if(err){
            return next(err);
        }

        const content = marked.parse(data);
        return content;
    });
}

module.exports = readme;