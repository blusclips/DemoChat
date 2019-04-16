const express = require('express');
const socket = require('socket.io')

const router = express.Router();

// Load User model
const User = require('../models/User');

router.get('/test', (req, res) => res.json({ msg: 'User route works' })) 

// api for for fetching users (userA, userB)
// api/v1/users/

router.post('/', async (req, res) => {
   const users = await User.find({ _id: { $ne: req.body._id } }).exec();
   (await users)
      ? res.json({ status: 200, data: users })
      : res.json({ status: 200, data: [] });
})

// api for loggin in user (UserA or userB)
// joining the demo room

router.post('/login', async (req, res) => {
   const user = await User.findOne({ username: req.body.username}).exec();
   // check if user exists
   if(user){
      req.app.io.join('demo')
      await res.json({ status: 200, data: user })
   } else {
    res.json({ status: 200, data: {} });
   } 
})

module.exports = router