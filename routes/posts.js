const express = require('express');
const router = express.Router();
const { getTags } = require('../controllers/posts');

router.get('/posts/:tags/:sortBy?/:direction?', getTags);

module.exports = router;