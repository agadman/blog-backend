const blogPostController = require("../controllers/blogpost.controller");

module.exports = (server) => {
    server.route([
        {
            method: "GET",
            path: "/blogposts",
            handler: blogPostController.getAllBlogPosts
        },
        {
            method: "POST",
            path: "/blogposts",
            handler: blogPostController.addBlogPost
        }
    ])
}