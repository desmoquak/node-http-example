const http = require('http');

const hostname = 'localhost';
const port = 3000;

// creates a very basic minimal server object using an
// existing http.server class. It takes a request handler callback function
// as a param, which will be written as an arrow function. This request handler is called every time
// the server receives a  request , and this object takes two objects as params,
// (request and response). These object are called streams.
const server = http.createServer((req, res) => {
	console.log(req.headers);
	res.statusCode = 200; //Status
	res.setHeader('Content-Type', 'text/html'); // What kind of data to expect in the response body
	res.end('<html><body><h1>Hello World!</h1></body></html>'); //Close the response stream with the res.end() method.
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
