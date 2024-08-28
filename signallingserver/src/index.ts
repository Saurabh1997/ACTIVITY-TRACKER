import { WebSocketServer, WebSocket } from "ws";

// THIS IS TO MAINTAIN A GLOBAL SENDER AND RECEIVER SO THAT WE CAN SEND MESSAGES TO EACH OTHER IN SAME CODE.
// this is to ensure that sender won't get his messages and receiver won't get his messages.
let senderWebSocket: WebSocket | null = null;
let receiverWebSocket: WebSocket | null = null;

const wss = new WebSocketServer({ port: 4041 });

wss.on("connection", (ws) => {
  ws.on("error", (error) => {
    console.log(" error ", error);
  });

  ws.on("message", (data) => {
    const message = JSON.parse(data.toString());
    console.log("cominh here ", message.type);

    switch (message.type) {
      case "send-offer":
        console.log("rece", receiverWebSocket);
        if (!receiverWebSocket) return;
        else
          receiverWebSocket.send(
            JSON.stringify({ type: "send-offer", data: message.data })
          );
        break;
      case "send-answer":
        console.log(" sending answer");

        if (!senderWebSocket) return;
        else
          senderWebSocket.send(
            JSON.stringify({ type: "send-answer", data: message.data })
          );
        break;
      case "sender-candidate":
        senderWebSocket = ws;
        console.log(" sender is set");
        break;
      case "receiver-candidate":
        receiverWebSocket = ws;
        console.log(" receiver is set");
        break;
      case "addIceCandidate":
        if (ws === senderWebSocket) {
          receiverWebSocket?.send(
            JSON.stringify({
              type: "addIceCandidate",
              candidate: message.candidate,
            })
          );
        } else {
          senderWebSocket?.send(
            JSON.stringify({
              type: "addIceCandidate",
              candidate: message.candidate,
            })
          );
        }
        break;
      default:
        break;
    }
  });
});
