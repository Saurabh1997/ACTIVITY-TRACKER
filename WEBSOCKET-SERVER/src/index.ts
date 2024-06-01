import { WebSocketServer, WebSocket } from "ws";
import * as express from "express";
import { pullFromQueue } from "./subscribers/redisSubscriber";
//import { createServer } from "http";

// const server = createServer((req, res) => {
//   console.log("new request at ", Date.now(), req.url);
//   res.end(" coming from server");
// });

const app = express();

app.get(
  "/getDataFromChatRoom",
  async (req: express.Request, res: express.Response) => {
    const data = await pullFromQueue("chatRoom");
    res.status(200).send(data);
  }
);

const socketServer = app.listen(8080);

const wss = new WebSocketServer({ server: socketServer });

wss.on("connection", function connection(socket) {
  socket.on("error", console.error);
  socket.on("message", function message(data, isBinary) {
    console.log(" here 1 ", data, " jd ", socket);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(" here ", data);
        client.send(data, { binary: isBinary });
      }
    });
  });
  socket.send("Hello! Message From websovket!!");
});

// server.listen(8080, () => {
//   console.log(" web socket server is on");
// });
