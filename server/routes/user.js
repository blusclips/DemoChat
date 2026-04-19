const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/User');

const MAX_USERNAME_LENGTH = 64;
const MAX_PASSWORD_LENGTH = 128;

router.get('/test', (req, res) => res.json({ msg: 'User route works' }));

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (
      typeof username !== 'string' ||
      !username.trim() ||
      username.length > MAX_USERNAME_LENGTH
    ) {
      return res.status(400).json({ error: 'Invalid username' });
    }
    if (
      typeof password !== 'string' ||
      !password ||
      password.length > MAX_PASSWORD_LENGTH
    ) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: 'Server is not configured' });
    }

    const user = await User.findOne({ username: username.trim() }).exec();
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const otherUser = await User.findOne({
      username: { $ne: user.username },
    })
      .select('-password')
      .exec();

    const token = jwt.sign({ sub: user._id.toString(), username: user.username }, jwtSecret, {
      expiresIn: '7d',
    });

    const safeUser = { _id: user._id, username: user.username };
    const safeOtherUser = otherUser
      ? { _id: otherUser._id, username: otherUser.username }
      : {};

    return res.json({
      token,
      data: { user: safeUser, otherUser: safeOtherUser },
    });
  } catch (err) {
    console.error('Login failed', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
