import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 4041 });

wss.on("connection", (ws) => {
  ws.on("error", (error) => {
    console.error();
  });

  ws.on("message", (message) => {
    console.log(" msg ", message);
  });
});
