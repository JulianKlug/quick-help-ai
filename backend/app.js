import {spawn} from 'child_process';
import answer_question from './src/api';


const input = 'Wie viele Geräte können mit der WLAN Plus Box betrieben werden?';
// const input = 'Wird bei der Abschaltung das Netzwerk deaktiviert?';

let templated_prompt;
const python = spawn('python3', ['generate_prompt/main.py', '-q', input]);
python.stdout.on('data', function (data) {
    templated_prompt = data.toString();
 });
 python.on('close', _ => {
    const output = answer_question(templated_prompt)
    output.then(console.log)
 });



