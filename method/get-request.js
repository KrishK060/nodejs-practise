const url = require('url');
module.exports = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);

    if (parsedUrl.pathname === '/api/person') {
        const id = parsedUrl.query.id;
        if (id) {
            const person = req.person.find(p => p.id === id);
            if (person) {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.write(JSON.stringify(person));
                res.end();
            } else {
                res.statusCode = 404;
                res.setHeader('Content-type', 'application/json');
                res.write(JSON.stringify({
                    message: "Person not found",
                }));
                res.end();
            }
        } else {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify(req.person));
            res.end();
        }

    } else {
        res.writeHead(404, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({
            message: "Route not found",
        }));
    }
}
