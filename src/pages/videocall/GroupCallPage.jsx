// GroupCall.js
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { GROUPCALL_SOCKET_URL } from "../../api/config.js";

export const GroupCallPage = () => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const peersRef = useRef([]);
  const userVideo = useRef();
  const roomId = "some-room-id"; // 고유 방 ID 설정

  useEffect(() => {
    socketRef.current = io(GROUPCALL_SOCKET_URL);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join-room", roomId, socketRef.current.id);

        socketRef.current.on("user-connected", (userId) =>
          handleNewUser(userId, stream)
        );
        socketRef.current.on("user-disconnected", handleUserDisconnect);
      });

    return () => socketRef.current.disconnect();
  }, []);

  const handleNewUser = (userId, stream) => {
    const peerConnection = new RTCPeerConnection();
    peerConnection.addStream(stream);

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", {
          userId,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      const peerVideo = document.createElement("video");
      peerVideo.srcObject = event.streams[0];
      document.body.append(peerVideo);
    };

    peersRef.current.push({ peerId: userId, peerConnection });
    setPeers((prevPeers) => [...prevPeers, peerConnection]);
  };

  const handleUserDisconnect = (userId) => {
    const peerObj = peersRef.current.find((peer) => peer.peerId === userId);
    if (peerObj) {
      peerObj.peerConnection.close();
      peersRef.current = peersRef.current.filter(
        (peer) => peer.peerId !== userId
      );
      setPeers(peersRef.current);
    }
  };

  return (
    <div>
      <video ref={userVideo} autoPlay muted />
    </div>
  );
};
