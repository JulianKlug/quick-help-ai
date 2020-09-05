import axios from 'axios'

const backend = {
    protocol: 'http',
    hostname: '0.0.0.0',
    port: '9000'
}

const api_route = `${backend.protocol}://${backend.hostname}:${backend.port}`;

function join_question_and_feed(question, feed) {
    let final_prompt = '';
    for (const qa_pair of feed) {
        final_prompt += `Q: ${qa_pair.q}\n`;
        final_prompt += `A: ${qa_pair.a}\n\n`;
    }
    final_prompt += `Q: ${question}`;
    return final_prompt;

}

function respond (question, feed = []) {
    const joined_prompt = join_question_and_feed(question, feed)
    const body = { question: joined_prompt };
    return axios.post(api_route, body)
        .then(res => res.data)
        .catch(errorHandler);
}

function errorHandler(e) {
    console.error(e)
}

export default respond;