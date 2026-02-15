const blogPostController = require("../controllers/blogpost.controller");

module.exports = (server) => {
    server.route([
        {
            method: "GET",
            path: "/blogposts",
            handler: blogPostController.getAllBlogPosts,
            options: { auth: false }
        },
        {
            method: "POST",
            path: "/blogposts",
            handler: blogPostController.addBlogPost,
            options: { auth: 'session' }
        },
        {
            method: "GET",
            path: "/blogposts/{id}",
            handler: blogPostController.getBlogPostById,
            options: { auth: false }
        },
        {
            method: "PUT",
            path: "/blogposts/{id}",
            handler: blogPostController.updateBlogPost,
            options: { auth: 'session' }
        },
        {
            method: "DELETE",
            path: "/blogposts/{id}",
            handler: blogPostController.deleteBlogPost,
            options: { auth: 'session' }
        }
    ])
}