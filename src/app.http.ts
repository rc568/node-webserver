import fs from 'fs';
import http from 'http'

const data = {
    name: 'Isaac R',
    age: 27,
    country: 'Peru'
}

const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end(htmlFile)
    } else if (req.url === '/api') {
        res.writeHead(200, {
            "content-type": 'application/json'
        })
        res.end(JSON.stringify(data));
    } else if (req.url?.endsWith('.css')) {
        const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8')
        res.writeHead(200, { 'content-type': 'text/css' })
        res.end(cssFile)
    } else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.end()
    }


})

server.listen(3000, () => {
    console.log(`Server running on port 3000`);
})