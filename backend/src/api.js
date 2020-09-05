import answer_question from "./gpt_api";
import frame_question from "./utils";

const respond = async (req, res) => {
    const { question } = req.body;
    // figure out if first question or continued discussion

    const framed_question = await frame_question(question)
    const answer = answer_question(framed_question)

    answer
        .then(answer => {
                if(!answer) {
                    return res.status(400).send({
                    message: 'Darauf kenne ich keine Antwort.',
                });
              }
                res.status(200).send(answer)
            })
        .catch(error => res.status(400).send(error))
}

export default respond;