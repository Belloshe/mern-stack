const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
  const { body } = req.body;
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comment({ body, user: req.user.id, post: req.params.postId });
    const comment = await newComment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('user', ['username']);
    res.json(comments);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Comment.deleteOne({ _id: req.params.id });
    res.json({ message: 'Comment removed' });
  } catch (err) {
    console.error('Error removing comment:', err); 
    res.status(500).send('Server error');
  }
};