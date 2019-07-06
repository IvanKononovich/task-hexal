const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((request, response) => {
    if (request.method == 'POST') {
        let body = '';

        request.on('data', function (data) {
            body += data;
            body = JSON.parse(body);

            let text = '----------------------';

            for(const key in body) {
                text += `\n ${key}: ${body[key]}`;
            }

            fs.readFile(path.join(__dirname, 'log.txt'), 'utf-8', (err, file) => {
                if (file) {
                    text += '\n'+file;
                }
                
                fs.writeFile(path.join(__dirname, 'log.txt'), text, (errWriteFile) => errWriteFile);

                response.writeHead(200, { 'Content-type': 'text/plain' });
                response.end('true');
            });
        });
    }  
}).listen(8080, () => console.log('listen: 8080'))