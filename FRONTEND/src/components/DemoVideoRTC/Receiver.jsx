import React, { useEffect, useState, useRef } from "react";
import { attachIceCandidateToPeer } from "utils/commonFunctions";

function Receiver() {
  const [socket, setSocket] = useState(null);
  const senderVideoRef = useRef(null);
  const receiverVideoRef = useRef(null);

  useEffect(() => {
    const socketCon = new WebSocket("ws://localhost:4041");
    if (socketCon) {
      setSocket(socketCon);
    }
    socketCon.onopen = () => {
      console.log(" socket open ");
      socketCon.send(JSON.stringify({ type: "receiver-candidate" }));
    };
    initVideoForReceiver(socketCon);
  }, []);

  const initVideoForReceiver = async (socketCon) => {
    let socket = socketCon;
    if (!socket) {
      alert("Socket not connected");
      return;
    }
    // Creating answer
    const ReceiverPeerConnection = new RTCPeerConnection();
    console.log(" coming after connection ");
    socket.onmessage = async (message) => {
      console.log(" coming here 4");
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
        if (ReceiverPeerConnection !== null) {
          console.log("coming ice candidate");
          ReceiverPeerConnection.addIceCandidate(data.candidate);
        }
      }
    };
    ReceiverPeerConnection.ontrack = async (event) => {
      const stream = event.streams[0];
      console.log(
        " track here ",
        event,
        " vide p ",
        senderVideoRef,
        " stream",
        event.streams
      );
      //  if (senderVideoRef.current) {
      console.log(" coming here for setting src Object");
      senderVideoRef.current.srcObject = event.streams[0];
      //senderVideoRef.current.srcObject = new MediaStream([event.track]);
      //}
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div>Receiver</div>
      {/* <button className="border m-2">Receive the call</button> */}
      {senderVideoRef !== null && (
        <div className="bg-transparent">
          <video ref={senderVideoRef} autoPlay></video>
          {/* <video ref={receiverVideoRef}></video> */}
        </div>
      )}
    </div>
  );
}

export default Receiver;
