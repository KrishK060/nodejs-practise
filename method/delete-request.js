const { write } = require('fs');
const { parse } = require('path');
const url = require('url');
const writeToFile = require('../util/write-to-file');
module.exports = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    if(parsedUrl.pathname === '/api/person'){
        const id = parsedUrl.query.id;
        if(id){
            const personIndex = req.person.findIndex(p => p.id === id);
            if(personIndex !== -1){
                req.person.splice(personIndex, 1);
                writeToFile(req.person);
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: "Person deleted successfully" }));
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
        
    

