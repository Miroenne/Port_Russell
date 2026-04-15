// Middleware that reads the root README.md file and converts it to HTML.
// Note: this middleware currently returns parsed content, but does not send a response.
const fs = require('node:fs');
const path = require('node:path');
const {marked} = require('marked');

function readme(req, res, next) {
    // Build the path to the repository root README.md file.
    const readmePath = path.join(__dirname, '..', 'README.md');

    // Read the markdown file from disk using UTF-8 encoding.
    fs.readFile(readmePath, 'utf8', (err, data) => {
        if(err){
            return next(err);
        }

        // Parse markdown content to HTML.
        const content = marked.parse(data);
        return content;
    });
}

module.exports = readme;