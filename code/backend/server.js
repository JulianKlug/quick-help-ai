import http from 'http'
import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './src/routes';

const config = {
    hostname: '0.0.0.0',
    port: '9000'
}

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});



