import { WebSocketServer, WebSocket } from "ws";

// THIS IS TO MAINTAIN A GLOBAL SENDER AND RECEIVER SO THAT WE CAN SEND MESSAGES TO EACH OTHER IN SAME CODE.
// this is to ensure that sender won't get his messages and receiver won't get his messages.
let senderWebSocket: WebSocket | null = null;
let receiverWebSocket: WebSocket | null = null;

const wss = new WebSocketServer({ port: 4041 });

wss.on("connection", (ws) => {
  console.log(" da\ta ");
  ws.on("error", (error) => {
    console.log(" error ", error);
  });

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());
    console.log(" msg ", message);
    switch (message.type) {
      case "send-offer":
        if (!receiverWebSocket) return;
        else
          receiverWebSocket.send(
            JSON.stringify({ type: "send-offer", data: message.data })
          );
        break;
      case "send-answer":
        if (!senderWebSocket) return;
        else
          senderWebSocket.send(
            JSON.stringify({ type: "send-answer", data: message.data })
          );
        break;
      case "sender-candidate":
        senderWebSocket = ws;
        break;
      case "receiver-candidate":
        receiverWebSocket = ws;
        break;
      default:
        break;
    }
  });
});
