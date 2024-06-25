import { WebSocketServer, WebSocket } from "ws";
import * as express from "express";
import RedisConnector from "./core/connectToRedis";
import { createClient } from "redis";

//import { createServer } from "http";

// const server = createServer((req, res) => {
//   console.log("new request at ", Date.now(), req.url);
//   res.end(" coming from server");
// });

const app = express();
app.use(express.json());

// app.get(
//   "/getDataFromChatRoom",
//   async (req: express.Request, res: express.Response) => {
//     const data = await pullFromQueue("chatRoom");
//     res.status(200).send(data);
//   }
// );

const pullDataFromRedisQueue = async () => {
  while (1) {
    try {
      const data = await RedisConnector.getClientInstance().pullFromQueue(
        "chatRoom"
      );
      // Implement pub sub here.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("process done", data);
    } catch (error) {
      console.log("error ", error);
    }
  }
};

const startServer = async () => {
  await RedisConnector.getClientInstance();
  const socketServer = app.listen(8080);

  await RedisConnector.getClientInstance().subscribeUsersToActivity(
    "coding",
    "saurabhpatil@.com"
  );

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
  // pullDataFromRedisQueue();
};

app.post(
  "/subscribeToUsersList",
  async (req: express.Request, res: express.Response) => {
    const { user_id, activityName } = req.body;
    const result =
      await RedisConnector.getClientInstance().subscribeUsersToActivity(
        activityName,
        user_id
      );
    res.send({
      data: "User is added to subscribed to the activity",
    });
  }
);

// app.post(
//   "/unsubscribeToUsersList",
//   async (req: express.Request, res: express.Response) => {
//     const { user_id, activityName } = req.body;
//     const result =
//       await RedisConnector.getClientInstance().unSubscribeUsersFromActivity(
//         activityName,
//         user_id
//       );
//     res.send({
//       data: "User is added to subscribed to the activity",
//     });
//   }
// );

startServer();

// server.listen(8080, () => {
//   console.log(" web socket server is on");
// });
