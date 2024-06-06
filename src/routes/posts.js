const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostById, updatePost, deletePost, upvotePost, downvotePost } = require('../controllers/postController');
const { createComment, getComments, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);


router.post('/:postId/comments', authMiddleware, createComment);
router.get('/:postId/comments', getComments);
router.delete('/comments/:id', authMiddleware, deleteComment);


router.post('/:id/upvote', authMiddleware, upvotePost);
router.post('/:id/downvote', authMiddleware, downvotePost);

module.exports = router;
