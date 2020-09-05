import axios from 'axios'

const backend = {
    protocol: 'http',
    hostname: '0.0.0.0',
    port: '9000'
}

function respond (question) {
     const body = { question };
     const api_route = `${backend.protocol}://${backend.hostname}:${backend.port}`;
     return axios.post(api_route, body)
            .then(res => {
                // todo change this back to return response
                console.log(res.data)
                return res.data
            })
            .catch(errorHandler);
}

function errorHandler(e) {
    console.error(e)
}

export default respond;