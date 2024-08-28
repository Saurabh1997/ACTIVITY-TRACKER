import Receiver from "components/DemoVideoRTC/Receiver";
import Sender from "components/DemoVideoRTC/Sender";
import Peer from "components/Peer";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function Contact() {
  const [peer, setPeer] = useState("");
  const [socket, setSocket] = useState(null);
  const userData = useSelector((RootStore) => RootStore.user);

  // useEffect(() => {
  //   const socketCon = new WebSocket("ws://localhost:4041");
  //   if (socketCon) {
  //     setSocket(socketCon);
  //   }

  //   socketCon.onopen = () => {
  //     console.log(" socket open ");
  //     if (peer === "sender") {
  //       console.log("connection open for sender");
  //       socket.send(JSON.stringify({ type: "sender-candidate" }));
  //     } else if (peer === "receiver") {
  //       console.log("connection open for receiver ");
  //       socket.send(JSON.stringify({ type: "receiver-candidate" }));
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (socket !== null && peer !== "") {
  //   }
  // }, [socket, peer]);

  const setPeerForCall = (e) => {
    let peerCandidate = e.target.name;
    if (peerCandidate === "sender") setPeer("sender");
    else setPeer("receiver");
  };

  return (
    <div
      className={
        "flex flex-col w-3/5 p-8 border rounded-md bg-teal-300 xl:w-1/3 lg:w-1/2 md:w-3/4 sm:w-full"
      }
    >
      {peer === "" && (
        <>
          <button
            name="sender"
            className={"border m-2"}
            onClick={setPeerForCall}
          >
            {"Join as Sender"}
          </button>
          <button
            className={"border m-2"}
            name="receiver"
            onClick={setPeerForCall}
          >
            {"Join as Receiver"}
          </button>
        </>
      )}
      {/* {peer && peer !== "" && socket && socket !== null && (
        <Peer peerType={peer} socket={socket} />
      )} */}
      {peer === "sender" ? (
        <Sender />
      ) : peer === "receiver" ? (
        <Receiver />
      ) : null}
    </div>
  );
}

export default Contact;
