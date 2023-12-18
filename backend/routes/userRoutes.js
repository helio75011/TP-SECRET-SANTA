const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Assurez-vous que le chemin est correct

router.get('/some-protected-route', authMiddleware, (req, res) => {
  res.send('Cette route est protégée par JWT');
});

module.exports = router;
