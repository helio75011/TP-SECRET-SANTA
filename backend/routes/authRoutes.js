const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = new User({ email, password });
    await user.save();

    res.status(201).send('Utilisateur enregistré');
  } catch (error) {
    res.status(500).send("Erreur du serveur");
  }
});

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Email ou mot de passe incorrect');
      }
  
      const token = jwt.sign({ userId: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).send("Erreur du serveur");
    }
  });

module.exports = router;
