const http = require('http');
const port = process.env.PORT;
const app = require('./app');

const server =http.createServer();

console.log(port)
server.listen(port);