const express = require('express');
const router = express.Router();
const { createComment, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/:postId', authMiddleware, createComment);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
