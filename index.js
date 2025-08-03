const http = require('http');
const getReq = require('./method/get-request');
const postReq = require('./method/post-request');
const putReq = require('./method/put-request');
const deleteReq = require('./method/delete-request');
let person = require('./data/person.json'); 
const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
    req.person = person
    switch (req.method) {
        case 'GET':
            getReq(req, res);
            break;
        case 'POST':
            postReq(req, res);
            break;
        case 'PUT':
            putReq(req, res);
            break;
        case 'DELETE':
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 400;
            res.setHeader('Content-type', 'application/json');
            res.write(JSON.stringify({
                message: "Route not found",
                
            }));
            res.end();
    }


});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});