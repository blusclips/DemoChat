require('dotenv/config')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const users = require('./routes/user')
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 2000;

app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load Message model
const Message = require('./models/Message');

// connection succesfull
io.on('connection', (socket) => { console.log('conected users')
    socket.on('send_message', async (data ) => {
       if(!data.image) {
           data.text = data.text.toUpperCase()
       }
       const chatRoom = io.sockets.adapter.rooms['Demo'];
       if (chatRoom.length <= 1 ) {
           const saveMessage = new Message({
              user_id: data.reciever._id,
              message: JSON.stringify(data),
              status: false
           })
           const newsavedMessage = await saveMessage.save();
       } else {
          socket.broadcast.emit('recieved_message', data);
       }
    })

    socket.on('get_new_messages', async (data, fn) => {
      socket.join('Demo')
      const messages = await Message.find({ user_id: data.obj}).exec();
      (await messages)
      ? fn({ data: messages })
      : fn({ data: [] });
    })

    socket.on('remove_old_messages', async (data) => {
       const old = await Message.deleteMany();
    })

    socket.on('disconnect', () => {
      console.log('user diconnected')
    })
 })

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true });

// Connection successful
mongoose.connection.on('connected', () => {
  console.info(`Mongoose default connection open to ${uri}`);
});

// Connection throws an error
mongoose.connection.on(
  'error',
  console.error.bind(console, 'Mongoose default connection error:')
);

// Connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.info('Mongoose default connection disconnected');
});

// Close the connection if the node process is terminated
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});

// Routes
app.use('/api/v1/users', users);

http.listen(port, () =>
  console.info(`Demo app listening on port ${port}!`)
);