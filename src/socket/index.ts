export default function socket(app: any) {
  const server = require("https").createServer(app);
  const io = require("socket.io")(server);
  let numUsers = 0;

  io.on("connection", (socket: any) => {
    let addedUser = false;
    // when the client emits 'new message', this listens and executes
    socket.on("new message", (data: any) => {
      // we tell the client to execute 'new message'
      socket.broadcast.emit("new message", {
        username: socket.username,
        message: data,
      });
    });

    // when the client emits 'add user', this listens and executes
    socket.on("add user", (username: string) => {
      if (addedUser) return;

      // we store the username in the socket session for this client
      socket.username = username;
      ++numUsers;
      addedUser = true;
      socket.emit("login", {
        numUsers: numUsers,
      });
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit("user joined", {
        username: socket.username,
        numUsers: numUsers,
      });
    });

    socket.on("typing", () => {
      socket.broadcast.emit("typing", {
        username: socket.username,
      });
    });

    socket.on("stopTyping", () => {
      socket.broadcast.emit("stop Typing", {
        username: socket.username,
      });
    });

    socket.on("disconnect", () => {
      if (addedUser) {
        --numUsers;
        // echo globally that this client has left
        socket.broadcast.emit("user left", {
          username: socket.username,
          numUsers: numUsers,
        });
      }
    });
  });
}
