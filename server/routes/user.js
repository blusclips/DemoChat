const express = require('express');
const socket = require('socket.io')

const router = express.Router();

// Load User model
const User = require('../models/User');

router.get('/test', (req, res) => res.json({ msg: 'User route works' })) 

// api for loggin in user (UserA or userB)
// joining the demo room

router.post('/login', async (req, res) => {
   const user = await User.findOne({ username: req.body.username}).exec();
   const otherUser = await User.findOne({ username: { $ne: req.body.username }})
   // check if user exists
   if(user){
      await res.json({ status: 200, data: { user, otherUser } })
   } else {
    res.json({ status: 200, data: {} });
   } 
})

module.exports = router