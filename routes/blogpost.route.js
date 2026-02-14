const BlogPost = require("../models/blogpost.model");

module.exports = (server) => {
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
        },
        {
            method: "POST",
            path: "/blogposts",
            handler: async(request, h) => {
                try {
                    const blogpost = new BlogPost(request.payload);
                    return await blogpost.save();
                } catch (error) {
                    return h.response("There was an error" + error).code(500);
                }
            }
        }
    ])
}