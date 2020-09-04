import answer_question from './src/api'


const input = 'Wie viele Geräte können mit der WLAN Plus Box betrieben werden?';

const output = answer_question(input)
output.then(console.log)

