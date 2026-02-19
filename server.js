'use strict';

require("dotenv").config();
const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
const auth = require('./auth'); 

const init = async () => {

    const server = Hapi.server({
        port: 5001,
        host: '0.0.0.0',
        routes: {
        cors: {
            origin: ['http://localhost:5173', 'https://www.thunderclient.com', 'https://elaborate-beijinho-cbb483.netlify.app'],
            credentials: true,
            maxAge: 86400,
            additionalHeaders: ["Accept", "Content-Type", "Access-Control-Allow-Origin"]
            }
        }
    });

    //connect to Mongodb
    mongoose.connect(process.env.DATABASE).then(() => {
        console.log("Connected to MongoDb");
    }).catch((error) => {
        console.error("Error connecting to database" + error);
    });

    // Register JWT auth strategy
    await auth.register(server);

    // Register routes
    require("./blog-backend/routes/blogpost.route")(server);
    require('./blog-backend/routes/user.route')(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();