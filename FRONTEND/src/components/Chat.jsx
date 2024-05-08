import React from "react";
import useSocketStatus from "utils/hooks/useSocketStatus";
import { useState } from "react";

function Chat() {
  const [isActive, socketMessaages] = useSocketStatus();
  const [chatMessage, setChatMessage] = useState("");
  console.log(" is active ", isActive, " msg ", socketMessaages);

  const handleSendChatMessage = () => {
    if (isActive) {
      isActive.send(chatMessage);
    }
  };

  return (
    <div className="border">
      <div>chat</div>
      <div>
        <div>Send Message</div>
        <input
          type="text"
          onChange={(e) => setChatMessage(e.target.value)}
          value={chatMessage}
        ></input>
        <button onClick={handleSendChatMessage}>Send Message</button>
      </div>
      <div>{socketMessaages.data && socketMessaages.data}</div>
    </div>
  );
}

export default Chat;
