const BlogPost = require("../models/blogpost.model");

exports.getAllBlogPosts = async(request, h) => {
    try {
            return await BlogPost.find();
        } catch (error) {
            return h.response("There was an error" + error).code(500);
        }
}

exports.addBlogPost = async(request, h) => {
    try {
            const blogpost = new BlogPost(request.payload);
            return await blogpost.save();
        } catch (error) {
            return h.response("There was an error" + error).code(500);
        }
}