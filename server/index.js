require('dotenv/config')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const users = require('./routes/user')
const messages = require('./routes/message')
const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 2000;

app.set('socket', io)
app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// connection succesfull
io.on('connection', (socket) =>{
  app.io = socket
  socket.join('demo')
  console.log('a user is connected')
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
app.use('/api/v1/message', messages);

http.listen(port, () =>
  console.info(`Demo app listening on port ${port}!`)
);