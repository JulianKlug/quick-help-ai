import answer_question from './src/api'


// const input = 'Wie viele Geräte können mit der WLAN Plus Box betrieben werden?';
const input = 'Wird bei der Abschaltung das Netzwerk deaktiviert?';

const output = answer_question(input)
output.then(console.log)

