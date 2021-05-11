const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

// creates a very basic minimal server object using an
// existing http.server class. It takes a request handler callback function
// as a param, which will be written as an arrow function. This request handler is called every time
// the server receives a  request , and this object takes two objects as params,
// (request and response). These object are called streams.
const server = http.createServer((req, res) => {
	console.log(`Request for ${req.url} by method ${req.method}`);

	if (req.method === 'GET') {
		let fileUrl = req.url;
		if (fileUrl === '/') {
			fileUrl = '/index.html';
		}

		const filePath = path.resolve('./public' + fileUrl);
		const fileExt = path.extname(filePath);

		if (fileExt === '.html') {
			fs.access(filePath, (err) => {
				if (err) {
					res.statusCode = 404;
					res.setHeader('Content-Type', 'text/html');
					res.end(
						`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`
					);
					return;
				}
				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/html');

				fs.createReadStream(filePath).pipe(res);
			});
		} else {
			res.statusCode = 404;
			res.setHeader('Content-Type', 'text/html');
			res.end(
				`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`
			);
		}
	} else {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/html');
		res.end(
			`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`
		);
	}
});
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
