import answer_question from "./gpt_api";
import {frame_question, reframe_question} from "./utils";

const respond = async (req, res) => {
    const { question } = req.body;

    const framed_question = await frame_question(question)
    const answer = answer_question(framed_question)
    const fallback_answer = 'Darauf kenne ich keine Antwort.'

    answer
        .then(answer => {
                if(!answer) {
                    throw new Error('No answer found on first prompt.')
                }
                res.status(200).send(answer)
            })
        .catch(async _ => {
            const reframed_question = await reframe_question(framed_question)
            const new_answer = answer_question(reframed_question)

            new_answer
                .then(a => {
                    if(!answer) {
                        throw new Error('No answer found on second prompt.')
                    }
                    res.status(200).send(a)
                })
                .catch(_ => {
                    console.log('failed again')
                    res.status(200).send(fallback_answer)
                })
        })
        .catch(_ => res.status(200).send(fallback_answer))
}

export default respond;