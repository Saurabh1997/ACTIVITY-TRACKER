import React from "react";
import { useEffect } from "react";

function Peer({ peerType, socket }) {
  useEffect(() => {
    console.log(" coming gere ", socket, " peer ", peerType);
    if (socket !== null && socket.readyState === 1 && peerType) {
      console.log(" coming here in peer 2", peerType, "socke - ", socket);

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

  const attachIceCandidateToPeer = (peerConnection) => {
    peerConnection.onicecandidate = (event) => {
      console.log(" ice candidate", event.candidate);
      if (event.candidate) {
        socket.send({
          type: "addIceCandidate",
          candidate: event.candidate,
        });
      }
    };
  };

  const initVideoForSender = async () => {
    if (!socket) {
      alert("Socket not connected");
      return;
    }
    // Creating offer
    console.log(" coming here for sending", socket);
    const peerConnection = new RTCPeerConnection();
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    attachIceCandidateToPeer(peerConnection);

    socket.onmessage = async (message) => {
      const data = JSON.parse(message.data);
      console.log(
        "message received by sender after getting answer",
        message.data
      );
      if (data.type === "send-answer") {
        peerConnection.setRemoteDescription(data.data);
      } else if (data.type === "addIceCandidate") {
        peerConnection.addIceCandidate(data.candidate);
      }
    };

    socket?.send(
      JSON.stringify({
        type: "send-offer",
        data: peerConnection.localDescription,
        offer: offer,
      })
    );
  };

  const initVideoForReceiver = async () => {
    if (!socket) {
      alert("Socket not connected");
      return;
    }
    // Creating answer
    console.log(" coming here for receiving");
    let ReceiverPeerConnection;
    socket.onmessage = async (message) => {
      console.log(" coming here 2");
      const data = JSON.parse(message.data);
      console.log(" coming here 5");
      console.log("message received by receiver", message.data);
      if (data.type === "send-offer") {
        ReceiverPeerConnection = new RTCPeerConnection();
        await ReceiverPeerConnection.setRemoteDescription(data.data);
        attachIceCandidateToPeer(ReceiverPeerConnection);
        const answer = await ReceiverPeerConnection.createAnswer();
        await ReceiverPeerConnection.setLocalDescription(answer);
        socket.send(
          JSON.stringify({
            type: "send-answer",
            data: answer,
          })
        );
      } else if (data.type === "addIceCandidate") {
        ReceiverPeerConnection.addIceCandidate(data.candidate);
      }
    };
  };

  return <div>{peerType}</div>;
}

export default Peer;
