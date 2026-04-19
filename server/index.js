require('dotenv/config');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const http = require('http').Server(app);

const users = require('./routes/user');
const Message = require('./models/Message');

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 2000;
const jwtSecret = process.env.JWT_SECRET;
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

if (!uri || !jwtSecret) {
  console.error('Missing required env: MONGODB_URI and JWT_SECRET must be set');
  process.exit(1);
}

const CHAT_ROOM = 'Demo';
const OFFLINE_MESSAGE_TTL_MS = 24 * 60 * 60 * 1000;

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
    credentials: true,
  }),
);
app.use(bodyParser.urlencoded({ extended: false, limit: '100kb' }));
app.use(bodyParser.json({ limit: '100kb' }));

const io = require('socket.io')(http, {
  cors: {
    origin: allowedOrigins.length > 0 ? allowedOrigins : false,
    credentials: true,
  },
});

io.use((socket, next) => {
  const token =
    (socket.handshake.auth && socket.handshake.auth.token) ||
    (socket.handshake.query && socket.handshake.query.token);
  if (!token) {
    return next(new Error('Unauthorized'));
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    socket.userId = decoded.sub;
    socket.username = decoded.username;
    return next();
  } catch (err) {
    return next(new Error('Unauthorized'));
  }
});

function isValidObjectId(value) {
  return typeof value === 'string' && mongoose.Types.ObjectId.isValid(value);
}

function sanitizeMessage(rawData, senderId) {
  if (!rawData || typeof rawData !== 'object') return null;
  const receiver = rawData.reciever;
  if (!receiver || !isValidObjectId(String(receiver._id))) return null;
  const hasText = typeof rawData.text === 'string' && rawData.text.length > 0;
  const hasImage = typeof rawData.image === 'string' && rawData.image.length > 0;
  if (!hasText && !hasImage) return null;
  return {
    _id: typeof rawData._id === 'string' ? rawData._id : undefined,
    text: hasText ? String(rawData.text).slice(0, 2000) : '',
    image: hasImage ? String(rawData.image).slice(0, 2048) : undefined,
    image_secure_url:
      typeof rawData.image_secure_url === 'string' ? rawData.image_secure_url : undefined,
    image_thumbnail:
      typeof rawData.image_thumbnail === 'string' ? rawData.image_thumbnail : undefined,
    createdAt: rawData.createdAt,
    user: {
      _id: senderId,
      name: rawData.user && typeof rawData.user.name === 'string' ? rawData.user.name : '',
      avatar:
        rawData.user && typeof rawData.user.avatar === 'string' ? rawData.user.avatar : '',
    },
    reciever: {
      _id: String(receiver._id),
      name: typeof receiver.name === 'string' ? receiver.name : '',
      avatar: typeof receiver.avatar === 'string' ? receiver.avatar : '',
    },
    select: rawData.select || false,
    refer: Boolean(rawData.refer),
  };
}

io.on('connection', (socket) => {
  console.info('socket connected', socket.userId);

  socket.join(CHAT_ROOM);

  socket.on('send_message', async (rawData, ack) => {
    try {
      const data = sanitizeMessage(rawData, socket.userId);
      if (!data) {
        if (typeof ack === 'function') ack({ error: 'Invalid message' });
        return;
      }

      const room = io.sockets.adapter.rooms[CHAT_ROOM];
      const roomSize = room ? Object.keys(room.sockets || room).length : 0;

      if (roomSize <= 1) {
        const saved = new Message({
          user_id: data.reciever._id,
          message: JSON.stringify(data),
          status: false,
        });
        await saved.save();
      } else {
        socket.to(CHAT_ROOM).emit('recieved_message', data);
      }

      if (typeof ack === 'function') ack({ ok: true });
    } catch (err) {
      console.error('send_message failed', err);
      if (typeof ack === 'function') ack({ error: 'Internal error' });
    }
  });

  socket.on('get_new_messages', async (data, fn) => {
    try {
      const requestedId = data && data.obj ? String(data.obj) : '';
      if (requestedId !== socket.userId) {
        if (typeof fn === 'function') fn({ data: [] });
        return;
      }
      const messages = await Message.find({ user_id: socket.userId }).exec();
      if (typeof fn === 'function') {
        fn({ data: Array.isArray(messages) ? messages : [] });
      }
    } catch (err) {
      console.error('get_new_messages failed', err);
      if (typeof fn === 'function') fn({ data: [] });
    }
  });

  socket.on('remove_old_messages', async () => {
    try {
      const cutoff = new Date(Date.now() - OFFLINE_MESSAGE_TTL_MS);
      await Message.deleteMany({
        user_id: socket.userId,
        created_on: { $lt: cutoff },
      });
    } catch (err) {
      console.error('remove_old_messages failed', err);
    }
  });

  socket.on('disconnect', () => {
    console.info('socket disconnected', socket.userId);
  });
});

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.info('Mongoose default connection open');
});

mongoose.connection.on(
  'error',
  console.error.bind(console, 'Mongoose default connection error:'),
);

mongoose.connection.on('disconnected', () => {
  console.info('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

app.use('/api/v1/users', users);

app.get('/', (req, res) => {
  res.send('Demo Chat Server. Yayyks !');
});

http.listen(port, () => console.info(`Demo app listening on port ${port}!`));
