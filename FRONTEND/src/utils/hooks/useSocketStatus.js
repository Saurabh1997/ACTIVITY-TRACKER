import { useState, useEffect } from "react";

const useSocketStatus = () => {
  const [socketStatus, setSocketStatus] = useState(null);
  const [socketMessages, setSocketMessages] = useState([]);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      //   console.log(" connected to server ");
      socket.send("Connected to socket server");
      setSocketStatus(socket);
    };

    socket.onmessage = (message) => {
      //   console.log(" message received ", message);
      setSocketMessages(message);
    };

    return () => socket.close();
  }, []);

  return [socketStatus, socketMessages];
};

export default useSocketStatus;
