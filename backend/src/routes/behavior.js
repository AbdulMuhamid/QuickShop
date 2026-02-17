const express = require('express');
const { trackBehavior, getUserBehavior } = require('../controllers/behaviorController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, trackBehavior);
router.get('/', authMiddleware, getUserBehavior);

module.exports = router;
