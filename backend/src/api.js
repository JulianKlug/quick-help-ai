import axios from 'axios';
import fs from 'fs';
import auth from "../auth";

const faq_template = fs.readFileSync('./templates/FAQ.txt', 'utf8');
const intent = fs.readFileSync('./templates/intent_specification.txt', 'utf8');
const good_behaviour = fs.readFileSync('./templates/good_behaviour_examples.txt', 'utf8');

const url = 'https://api.openai.com/v1/engines/davinci/completions';

const answer_question = async (input) => {
    const question = 'Q: ' + input;
    const separator = '\n\n'
    const ending = '\n'
    const templated_prompt = intent + separator
        + faq_template + separator
        + good_behaviour + separator
        + question + ending
    const data = {
      prompt: templated_prompt,
      temperature:0,
      max_tokens:100,
      top_p:1,
      stop:["\n"]
    }

    const config = { headers: { Authorization: `Bearer ${auth.openAISecretKey}`}};
    const response = await axios.post(url, data, config)
            .then(res => res.data)
            .catch(errorHandler);

    return response
}

function errorHandler(e) {
    console.error(e)
}

export default answer_question;