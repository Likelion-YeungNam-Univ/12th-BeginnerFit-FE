const cors = require('cors');

const corsOptions = {
    origin: VITE_SERVER_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

const configureCors = () => cors(corsOptions);

module.exports = configureCors;
