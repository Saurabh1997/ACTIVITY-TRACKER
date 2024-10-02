import React, { useEffect, useState, useRef } from "react";
import { attachIceCandidateToPeer } from "utils/commonFunctions";

function Sender() {
  const senderVideoRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketCon = new WebSocket("ws://localhost:4041");
    if (socketCon) {
      setSocket(socketCon);
    }
    socketCon.onopen = () => {
      console.log(" socket open ");
      socketCon.send(JSON.stringify({ type: "sender-candidate" }));
    };
  }, []);

  const initVideoForSender = async () => {
    if (!socket) {
      alert("Socket not connected");
      return;
    }
    // Creating offer
    console.log(" coming here for sending", socket);
    const peerConnection = new RTCPeerConnection();

    peerConnection.onnegotiationneeded = async () => {
      console.log(" on negotiation needed - ");
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.send(
        JSON.stringify({
          type: "send-offer",
          data: peerConnection.localDescription,
          offer: offer,
        })
      );
    };

    attachIceCandidateToPeer(peerConnection, socket);

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
    const stream = await navigator.mediaDevices.getUserMedia({
      // audio: true,
      video: true,
    });
    console.log(" stream ", stream);
    peerConnection.addTrack(stream.getVideoTracks()[0]);
    // peerConnection.addTrack(stream.getAudioTracks()[0]);
  };

  return (
    <div className="flex flex-col items-center">
      <div>Sender</div>
      <button className="border m-2" onClick={initVideoForSender}>
        Call Receiver
      </button>
    </div>
  );
}

export default Sender;
