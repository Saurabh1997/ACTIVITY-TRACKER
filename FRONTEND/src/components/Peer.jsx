import React, { useRef } from "react";
import { useEffect } from "react";
import { attachIceCandidateToPeer } from "utils/commonFunctions";

function Peer({ peerType, socket }) {
  const senderVideoRef = useRef(null);
  const receiverVideoRef = useRef(null);
  useEffect(() => {
    if (socket !== null && peerType) {
      if (peerType === "sender") {
        initVideoForSender();
      } else if (peerType === "receiver") {
        initVideoForReceiver();
      } else {
      }
    }
  }, [peerType, socket]);

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
      audio: false,
      video: true,
    });
    console.log(" stream ", stream);
    peerConnection.addTrack(stream.getVideoTracks()[0]);
  };

  const initVideoForReceiver = async () => {
    if (!socket) {
      alert("Socket not connected");
      return;
    }
    // Creating answer
    const ReceiverPeerConnection = new RTCPeerConnection();
    console.log(" coming after connection ");
    socket.onmessage = async (message) => {
      const data = JSON.parse(message.data);
      console.log(" coming here 5");
      console.log("message received by receiver", message.data);
      if (data.type === "send-offer") {
        await ReceiverPeerConnection.setRemoteDescription(data.data);
        attachIceCandidateToPeer(ReceiverPeerConnection, socket);
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
    ReceiverPeerConnection.ontrack = async (event) => {
      console.log(" track here ", event, " vide p ", senderVideoRef);
      if (senderVideoRef.current) {
        senderVideoRef.current.srcObject = new MediaStream([event.track]);
      }
    };
  };

  return (
    <div>
      {peerType}
      <div className="flex">
        <video ref={senderVideoRef}></video>
        <video ref={receiverVideoRef}></video>
      </div>
    </div>
  );
}

export default Peer;
