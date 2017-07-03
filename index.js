const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

const users = [];
io.on('connection', socket => {
  const id = users.length === 0 ? 0 : users[users.length - 1] + 1;
  users.push(id);
  console.log('user connected', users)
  socket.on('chat message', message => {
    io.emit('chat message', message);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnect', id);
  });
});

http.listen(3000, () => console.log('listening on 3000'));
