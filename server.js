'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
require("dotenv").config();

const init = async () => {

    const server = Hapi.server({
        port: 5001,
        host: '0.0.0.0'
    });

    //connect to Mongodb
    mongoose.connect(process.env.DATABASE).then(() => {
        console.log("Connected to MongoDb");
    }).catch((error) => {
        console.error("Error connecting to database" + error);
    });

    // Model
    const BlogPost = mongoose.model("BlogPost", {
        title: String,
        content: String,
        author: String,
        createdAt: {
            type: Date,
            default: Date.now  
        } 
    });

    server.route([
        {
            method: "GET",
            path: "/blogposts",
            handler: async(request, h) => {
                try {
                    return await BlogPost.find();
                } catch (error) {
                    return h.response("There was an error" + error).code(500);
                }
            }
        }
    ])

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();