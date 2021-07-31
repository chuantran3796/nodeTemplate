import http from "http";
import Debug from "debug";
import app from "./app";
import dotenv from "dotenv";
// import { socket } from "./socket";

const server = http.createServer(app);

dotenv.config();
const debug = Debug("MyApp");

const port = process.env.PORT || "8080";

var io = require("socket.io")(server, { pingTimeout: 30000 });
// io.on("connection", socket);

io.on("connection", (socket: any) => {
  socket.on("disconnect", function () {});

  socket.on("message", (message: any, id: number) => {
    socket.to(id).emit("message", message);
  });
  socket.on("typing", (member: any, id: number) => {
    socket.to(id).emit("typing", member);
  });
  socket.on("typingOff", (member: any, id: number) => {
    socket.to(id).emit("typingOff", member);
  });
  socket.on("ping", () => {});
  socket.on("connect", function () {
    console.log("Client is Connected");
  });

  socket.on("pong", function (data: any) {
    console.log("Received Pong: ", data);
  });
});

server.listen(port);

server.on("error", onError);
server.on("listening", onListening);

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr: any = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);

  console.log(`Server listen on port ${port}`);
}
