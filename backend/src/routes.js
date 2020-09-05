import respond from "./api";

export default (app) => {
    app.get('*', (req, res) => res.status(200).send({
        message: 'Welcome to QAI API!',
    }));

    app.post('/', respond)
};
