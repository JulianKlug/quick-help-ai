import axios from 'axios'

const backend = {
    protocol: 'http',
    hostname: '0.0.0.0',
    port: '9000'
}

const api_route = `${backend.protocol}://${backend.hostname}:${backend.port}`;

function join_question_and_feed(question, feed, memory_size) {
    let final_prompt = '';
    for (const qa_pair of feed.reverse().slice(0, memory_size)) {
        final_prompt += `Q: ${qa_pair.q}\n`;
        final_prompt += `A: ${qa_pair.a}\n\n`;
    }
    final_prompt += `Q: ${question}`;
    return final_prompt;

}

function respond (question, feed = [], memory_size = 3) {
    const joined_prompt = join_question_and_feed(question, feed, memory_size)
    console.log(joined_prompt)
    const body = { question: joined_prompt };
    return axios.post(api_route, body)
        .then(res => process_answer(res.data))
        .catch(errorHandler);
}

function process_answer(answer) {
    return answer.split('A: ')[1]
}

function errorHandler(e) {
    console.error(e)
}

export default respond;