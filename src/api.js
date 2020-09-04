import axios from 'axios';
import fs from 'fs';
import auth from "../auth";

const template = fs.readFileSync('./templates/FAQ.txt', 'utf8');

const url = 'https://api.openai.com/v1/engines/davinci/completions';

// const temp = "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \\"
// Unknown\\".\\n\\nQ: What is human life expectancy in the United States?\\nA: Human life expectancy in the United States is 78 years.\\n\\nQ: Who was president of the United States in 1955?\\nA: Dwight D. Eisenhower was president of the United States in 1955.\\n\\nQ: Which party did he belong to?\\nA: He belonged to the Republican Party.\\n\\nQ: What is the square root of banana?\\nA: Unknown\\n\\nQ: How does a telescope work?\\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\\n\\nQ: Where were the 1992 Olympics held?\\nA: The 1992 Olympics were held in Barcelona, Spain.\\n\\nQ: How many squigs are in a bonk?\\nA: Unknown\\n\\nQ: Do monkeys like bananas?\\n\""

const answer_question = async (input) => {
    const question = 'Q: ' + input;
    const templated_prompt = template + '\n\n' + question + '\n'
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