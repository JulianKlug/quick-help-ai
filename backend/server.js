import {spawn} from 'child_process';
import answer_question from './src/api';
import http from 'http'
import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './app/routes';

const config = {
    hostname: '0.0.0.0',
    port: '9000'
}

const server = express();
const server = http.createServer(server);

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

routes(server);

server.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the .',
}));

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});


// const input = 'Wie viele Geräte können mit der WLAN Plus Box betrieben werden?';
// // const input = 'Wird bei der Abschaltung das Netzwerk deaktiviert?';
//
// let templated_prompt;
// const python = spawn('python3', ['generate_prompt/main.py', '-q', input]);
// python.stdout.on('data', function (data) {
//     templated_prompt = data.toString();
//  });
//  python.on('close', _ => {
//     const output = answer_question(templated_prompt)
//     output.then(console.log)
//  });



