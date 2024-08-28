export const attachIceCandidateToPeer = (peerConnection, socket) => {
  peerConnection.onicecandidate = (event) => {
    console.log(" ice candidate", event.candidate);
    if (event.candidate) {
      socket.send(
        JSON.stringify({
          type: "addIceCandidate",
          candidate: event.candidate,
        })
      );
    }
  };
};
