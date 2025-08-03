module.exports = (request) => {
    return new Promise((resolve, reject) => {
        try{
            let body = '';
        request.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
        request.on('end', () => {
 resolve(JSON.parse(body)); // Parse the JSON string into an object
        });
        }
        catch(error){
            reject(error);
        }
    });
}