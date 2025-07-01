const express = require('express');
const router = express.Router();
const logger = require('../middleware/logger');
const timing = require('../middleware/timing');
const auth = require('../middleware/auth');
const validateBody = require('../middleware/validateBody');
const attachTimestamp = require('../middleware/attachTimestamp');

// Use mock data
let posts = require('../data/posts');
let idCounter = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;

// GET /posts → logger → timing
router.get('/', logger, timing, (req, res) => {
  res.json(posts);
});

// POST /posts → logger → auth('editor') → validateBody(['title','content']) → attachTimestamp
router.post('/', logger, auth('editor'), validateBody(['title', 'content']), attachTimestamp, (req, res) => {
  const { title, content, author } = req.body;
  const post = { id: idCounter++, title, content, author: author || 'Unknown', timestamp: req.timestamp };
  posts.push(post);
  res.status(201).json(post);
});

// PUT /posts/:id → logger → auth('editor') → validateBody(['title']) → attachTimestamp
router.put('/:id', logger, auth('editor'), validateBody(['title']), attachTimestamp, (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) {
    const err = new Error('Post not found');
    err.status = 404;
    return next(err);
  }
  post.title = req.body.title;
  post.timestamp = req.timestamp;
  res.json(post);
});

// DELETE /posts/:id → logger → auth('admin') → attachTimestamp
router.delete('/:id', logger, auth('admin'), attachTimestamp, (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) {
    const err = new Error('Post not found');
    err.status = 404;
    return next(err);
  }
  const deleted = posts.splice(index, 1)[0];
  res.json({ deleted });
});

module.exports = router; 