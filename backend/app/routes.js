

export default (app) => {
    app.get('/', (req, res) => res.status(200).send({
        message: 'Welcome to QAI!',
    }));
};
