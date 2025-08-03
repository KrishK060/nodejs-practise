const bodyParser = require('../util/body-parser');
const crypto = require('crypto');
const writeToFile = require('../util/write-to-file');

module.exports = async (req, res) => {
    if (req.url === '/api/person') {
        try {
            let body = await bodyParser(req);
            //console.log(body);
            body.id = crypto.randomUUID();
            req.person.push(body);
            writeToFile(req.person);
            res.writeHead(201, { 'Content-type': 'application/json' });
            res.end();

        } catch (err) {
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.end(
                console.log(err),
                res.writeHead(400, { 'Content-type': 'application/json' }),
                res.end(
                    JSON.stringify({
                        title: "validation error",
                        message: "request body is not valid",
                    }))
            )


        }
    }
}
