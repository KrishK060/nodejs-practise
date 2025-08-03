const url = require('url');
const bodyParser = require('../util/body-parser');
const writeToFile = require('../util/write-to-file');

module.exports = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/api/person') {
        const id = parsedUrl.query.id;
        if (id) {
            const index = req.person.findIndex(p => p.id === id);
            if (index !== -1) {
                try {
                    const body = await bodyParser(req);
                    // Update the person object
                    req.person[index] = { ...req.person[index], ...body };
                    writeToFile(req.person);
                    res.writeHead(200, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ message: "Person updated successfully", person: req.person[index] }));
                } catch (err) {
                    res.writeHead(400, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ message: "Invalid request body" }));
                }
            } else {
                res.writeHead(404, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: "Person not found" }));
            }
        } else {
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: "ID is required" }));
        }
    } else {
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
}