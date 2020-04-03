const app = require('../app');
const http = require('http');
// const appConfig = require('../config/app');

const server = http.createServer(app);
server.listen(process.env.PORT, err => {
    if (err) {
        console.error('❌ Unable to connect the server: ', err)
    };
    console.log(`🌍 Server listening on port ${process.env.PORT}`);
});