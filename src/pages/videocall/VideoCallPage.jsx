import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { VIDEO_SOCKET_URL } from "../../api/config.js";

const socket = io(VIDEO_SOCKET_URL); // 서버 URL에 맞게 변경

export const VideoCallPage = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [isCaller, setIsCaller] = useState(false);

  const iceServers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("서버에 연결되었습니다.");
    });

    socket.on("disconnect", () => {
      console.log("서버와의 연결이 끊어졌습니다.");
    });

    socket.on("offer", async (data) => {
      console.log("Offer 수신:", data);
      if (!isCaller) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data)
        );
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit("answer", answer);
      }
    });

    socket.on("answer", (data) => {
      console.log("Answer 수신:", data);
      peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data)
      );
    });

    socket.on("candidate", (data) => {
      console.log("Candidate 수신:", data);
      peerConnection.current.addIceCandidate(new RTCIceCandidate(data));
    });

    startWebRTC();

    return () => {
      socket.disconnect();
    };
  }, []);

  const startWebRTC = async () => {
    peerConnection.current = new RTCPeerConnection(iceServers);

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("candidate", event.candidate);
      }
    };

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = stream;

      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });
    } catch (error) {
      console.error("로컬 미디어 스트림 가져오기 실패:", error);
    }
  };

  const callUser = async () => {
    setIsCaller(true);
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.emit("offer", offer);
  };

  return (
    <div>
      <div>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="local-video"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="remote-video"
        />
      </div>
      <button onClick={callUser}>통화 시작</button>
    </div>
  );
};
