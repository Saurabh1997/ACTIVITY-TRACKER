import React, { useEffect, useState, useRef } from "react";
import { attachIceCandidateToPeer } from "utils/commonFunctions";

function Sender() {
  const senderVideoRef = useRef(null);
  const receiverVideoRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    const socketCon = new WebSocket("ws://192.168.1.105:4041");
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
      audio: true,
      video: true,
    });
    if (senderVideoRef.current) {
      console.log(" stream 2 ", stream);

      senderVideoRef.current.srcObject = stream;
      setHideButton(true);
    }

    for (const track of stream.getTracks()) {
      peerConnection.addTrack(track, stream);
    }

    //peerConnection.addTrack(stream.getVideoTracks()[0]);
    // peerConnection.addTrack(stream.getAudioTracks()[0]);

    peerConnection.ontrack = async (event) => {
      console.log(" sending ", event.streams);

      //  if (senderVideoRef.current) {
      console.log(" coming here for setting src Object");
      receiverVideoRef.current.srcObject = event.streams[0];
      //senderVideoRef.current.srcObject = new MediaStream([event.track]);
      //}
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div>Sender</div>
      {!hideButton && (
        <button className="border m-2" onClick={initVideoForSender}>
          Call Receiver
        </button>
      )}
      {/* {hideButton && ( */}
      <div className="bg-transparent">
        <video ref={senderVideoRef} autoPlay muted></video>
      </div>

      <div className="bg-transparent">
        <video ref={receiverVideoRef} autoPlay></video>
      </div>
      {/* )} */}
    </div>
  );
}

export default Sender;
