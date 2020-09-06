import axios from 'axios';
import auth from "../auth";

const url = 'https://api.openai.com/v1/engines/davinci/completions';

const answer_question = async (input) => {
    const data = {
      prompt: input,
      temperature:0,
      max_tokens:100,
      top_p:1,
      stop:["\n\n"]
    }

    const config = { headers: { Authorization: `Bearer ${auth.openAISecretKey}`}};
    const response = await axios.post(url, data, config)
            .then(res => res.data.choices[0].text)
            .catch(errorHandler);

    return response
}

function errorHandler(e) {
    console.error(e)
}

export default answer_question;