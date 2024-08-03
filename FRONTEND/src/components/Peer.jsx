import React from "react";
import { useEffect, useState } from "react";

function Peer({ peerType }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log(" coming ");
    const socketCon = new WebSocket("ws://localhost:4041");
    if (socketCon) {
      setSocket(socket);
    }
  }, []);

  useEffect(() => {
    if (socket && peerType) {
      console.log(" coming here in peer ", peerType, "socke - ", socket);

      socket.onopen = () => {
        if (peerType === "sender") {
          socket.send(JSON.stringify({ type: "sender-candidate" }));
        } else {
          socket.send(JSON.stringify({ type: "receiver-candidate" }));
        }
      };

      if (peerType === "sender") {
        initVideoForSender();
      } else if (peerType === "receiver") {
        initVideoForReceiver();
      } else {
      }
    }
  }, [peerType, socket]);

  const initVideoForSender = async () => {
    // Creating offer
    console.log(" coming here for sending");
    const peerConnection = new RTCPeerConnection();
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    socket.send(
      JSON.stringify({
        type: "send-offer",
        data: peerConnection.localDescription,
        offer: offer,
      })
    );

    socket.onmessage = async (message) => {
      const data = JSON.parse(message);
      console.log(
        "message received by sender after getting answer",
        message.data
      );
      if (data.type === "send-answer") {
        //   const ReceiverPeerConnection = new RTCPeerConnection();
        //   await ReceiverPeerConnection.setRemoteDescription(data.data);
        //   const answer = await ReceiverPeerConnection.createAnswer();
        //   await ReceiverPeerConnection.setLocalDescription(answer);
        peerConnection.setRemoteDescription(data.data);
        // socket.send(
        //   JSON.stringify({
        //     type: "send-answer",
        //     data: answer,
        //   })
        // );
      }
    };
  };

  const initVideoForReceiver = async () => {
    // Creating answer
    console.log(" coming here for receiving");
    socket.onmessage = async (message) => {
      console.log(" coming here 2");
      const data = JSON.parse(message.data);
      console.log(" coming here 5");
      console.log("message received by receiver", message.data);
      if (data.type === "send-offer") {
        const ReceiverPeerConnection = new RTCPeerConnection();
        await ReceiverPeerConnection.setRemoteDescription(data.data);
        const answer = await ReceiverPeerConnection.createAnswer();
        await ReceiverPeerConnection.setLocalDescription(answer);
        socket.send(
          JSON.stringify({
            type: "send-answer",
            data: answer,
          })
        );
      }
    };
    // socket.send(
    //   JSON.stringify({
    //     type: "send-offer",
    //     data: peerConnection.localDescription,
    //     answer,
    //   })
    // );
  };

  return <div></div>;
}

export default Peer;
