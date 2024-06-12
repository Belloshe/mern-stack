const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { title, body } = req.body;
  try {
    const newPost = new Post({ title, body, user: req.user.id });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', ['username']);
    res.json(posts);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', ['username']);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updatePost = async (req, res) => {
  const { title, body } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    post.title = title;
    post.body = body;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.votes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.downvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.votes -= 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
