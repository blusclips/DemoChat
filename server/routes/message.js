const express = require('express');

const router = express.Router();

// Load Message Model
const User = require('../models/User');

router.get('/test', (req, res) => res.json({ msg: 'User route works' })) 

// api for for fetching users (userA, userB)
// api/v1/messages/

router.post('/send', async (req, res) => {
    req.app.io.to('demo').emit('recieve_text_message', req.body.message);
    console.log(req.body.message);
    console.log(req.app.io.rooms)
    res.json({ success: true })
})

module.exports = router