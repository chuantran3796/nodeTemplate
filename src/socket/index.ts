export default function socket(app: any) {
  const server = require("https").createServer(app);
  const io = require("socket.io")(server);
  let broadcaster: any;
  let id: any;

  io.on("connection", (socket: any) => {
    socket
      .on("init", async () => {
        id = await users.create(socket);
        socket.emit("init", { id });
      })
      .on("request", (data: any) => {
        const receiver = users.get(data.to);
        if (receiver) {
          receiver.emit("request", { from: id });
        }
      })
      .on("call", (data: any) => {
        const receiver = users.get(data.to);
        if (receiver) {
          receiver.emit("call", { ...data, from: id });
        } else {
          socket.emit("failed");
        }
      })
      .on("end", (data: any) => {
        const receiver = users.get(data.to);
        if (receiver) {
          receiver.emit("end");
        }
      });

    socket.on("broadcaster", () => {
      broadcaster = socket.id;
      socket.broadcast.emit("broadcaster");
    });
    socket.on("watcher", () => {
      socket.to(broadcaster).emit("watcher", socket.id);
    });
    socket.on("offer", (id: number, message: string) => {
      socket.to(id).emit("offer", socket.id, message);
    });
    socket.on("answer", (id: number, message: string) => {
      socket.to(id).emit("answer", socket.id, message);
    });
    socket.on("candidate", (id: number, message: string) => {
      socket.to(id).emit("candidate", socket.id, message);
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
}
