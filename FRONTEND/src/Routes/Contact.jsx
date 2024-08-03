import Peer from "components/Peer";
import React, { useEffect } from "react";
import { useState } from "react";

function Contact() {
  const [peer, setPeer] = useState("");

  const setPeerForCall = (e) => {
    console.log(" coming here on click");
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
      <button name="sender" className={"border m-2"} onClick={setPeerForCall}>
        {"Join as Sender"}
      </button>
      <button className={"border m-2"} name="receiver" onClick={setPeerForCall}>
        {"Join as Receiver"}
      </button>
      {peer && peer !== "" && <Peer peerType={peer} />}
    </div>
  );
}

export default Contact;
