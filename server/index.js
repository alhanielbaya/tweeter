const express = require('express');
require('dotenv').config();

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const IN_PROD = process.env.NODE_ENV === 'production' ? true : false;

const userModel = require('./Models/User');
userModel.connect();

// Body Parser
app.use(express.json());

// Express session

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = require('./database/options');
const connection = require('./database/connect');

var sessionStore = new MySQLStore(options, connection);
app.use(
  session({
    secret: 'secret shh',
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 86400000 // one day
    }
  })
);

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/tweets', require('./routes/tweets'));

const port = process.env.PORT || port;

if (IN_PROD) {
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

io.on('connection', function(socket) {
  const followModel = require('./Models/Follow');

  socket.on('follow user', function(data) {
    const { uid, uidToFollow } = data;
    followModel.followUser(uidToFollow, uid).then(() => {
      followModel.queryFollowedUsers(uid).then(followedUsers => {
        socket.emit('follow success', followedUsers);
      });
    });
  });
  socket.on('unfollow user', function(data) {
    const { uid, uidToUnFollow } = data;
    followModel.unFollowUser(uidToUnFollow, uid).then(() => {
      followModel.queryFollowedUsers(uid).then(followedUsers => {
        socket.emit('unfollow success', followedUsers);
      });
    });
  });
});
server.listen(port, () => console.log(`Server running on port ${port}`));
