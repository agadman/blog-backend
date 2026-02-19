const BlogPost = require("../models/blogpost.model");

exports.getAllBlogPosts = async(request, h) => {
  try {
    return await BlogPost.find().populate('author', 'username'); 
  } catch (error) {
    return h.response("There was an error" + error).code(500);
  }
}

exports.getBlogPostById = async (request, h) => {
  try {
    const post = await BlogPost.findById(request.params.id).populate('author', 'username');
    if (!post) return h.response("Not found").code(404);
    return post;
  } catch (error) {
    return h.response("Invalid ID").code(400);
  }
};

exports.getMyBlogPosts = async (request, h) => {
  try {
    const userId = request.auth.credentials.id;
    const posts = await BlogPost.find({ author: userId }).populate('author', 'username');
    return posts;
  } catch (error) {
    return h.response("Det gick inte att hämta dina bloggar: " + error).code(500);
  }
};

exports.addBlogPost = async(request, h) => {
  try {
    const { title, content } = request.payload;

    const author = request.auth.credentials.id; 

    const blogpost = new BlogPost({ title, content, author });
    const savedPost = await blogpost.save();

    return h.response(savedPost).code(201);
  } catch (error) {
    return h.response("There was an error: " + error).code(500);
  }
}

exports.updateBlogPost = async (request, h) => {
  const post = await BlogPost.findById(request.params.id);
  if (!post) return h.response("Not found").code(404);

  if (post.author.toString() !== request.auth.credentials.id)
    return h.response("Forbidden").code(403);

  return await BlogPost.findByIdAndUpdate(
    request.params.id,
    request.payload,
    { new: true, runValidators: true }
  );
};

exports.deleteBlogPost = async (request, h) => {
  try {
    const post = await BlogPost.findById(request.params.id);

    if (!post) {
      return h.response({ message: "Not found" }).code(404);
    }
    
    if (post.author.toString() !== request.auth.credentials.id) {
      return h.response({ message: "Forbidden" }).code(403);
    }

    await BlogPost.findByIdAndDelete(request.params.id);
    return h.response({ message: "Blogpost deleted" }).code(200);

  } catch (error) {
    console.error(error);
    return h.response({ message: "Invalid ID" }).code(400);
  }
};