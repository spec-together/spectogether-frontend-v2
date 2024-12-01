import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { SOCKET_URL } from "../../api/config.js";
import VideoCard from "../../components/VideoCard.jsx";

export const MeetroomPage = () => {
  const { meetroomId } = useParams();
  const [videoDevices, setVideoDevices] = useState([]);
  const userVideoRef = useRef();
  const userStream = useRef();
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    const socket = io(SOCKET_URL, { withCredentials: true });

    // Get Video Devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filtered = devices.filter((device) => device.kind === 'videoinput');
      setVideoDevices(filtered);
    });
  
    // Connect Camera & Mic
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;

        socket.emit('BE-join-room', { meetroomId });
        socket.on('FE-user-join', (users) => {
          // all users
          const peers = [];
          users.forEach(({ userId, info }) => {
            let { userName, video, audio } = info;

            if (userName !== currentUser) {
              const peer = createPeer(userId, socket.id, stream);

              peer.userName = userName;
              peer.peerID = userId;

              peersRef.current.push({
                peerID: userId,
                peer,
                userName,
              });
              peers.push(peer);

              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [peer.userName]: { video, audio },
                };
              });
            }
          });

          setPeers(peers);
        });
    });
  }, []);

  function createPeer(userId, caller, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('BE-call-user', {
        userToCall: userId,
        from: caller,
        signal,
      });
    });
    peer.on('disconnect', () => {
      peer.destroy();
    });

    return peer;
  }

  function createUserVideo(peer, index, arr) {
    return (
      <VideoCard key={index} peer={peer} number={arr.length} />
    );
  }

  return (
    <div>
      <video
        ref={userVideoRef}
        muted
        autoPlay
        playInline
      ></video>
      {peers &&
            peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
    </div>
  );
};
