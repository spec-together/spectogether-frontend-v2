import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { VIDEO_SOCKET_URL } from "../api/config";

const StudyroomVideocallPage = () => {
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [inCall, setInCall] = useState(false);

  const myFaceRef = useRef();
  const peerFaceRef = useRef();
  const socketRef = useRef();
  const myPeerConnectionRef = useRef();
  const myDataChannelRef = useRef();

  const myStream = useRef();

  useEffect(() => {
    socketRef.current = io(VIDEO_SOCKET_URL);

    socketRef.current.on("welcome", async () => {
      // 필요없는 부분, datachannel
      myDataChannelRef.current =
        myPeerConnectionRef.current.createDataChannel("chat");
      myDataChannelRef.current.addEventListener("message", (event) =>
        console.log(event.data)
      );
      console.log("made data channel");

      const offer = await myPeerConnectionRef.current.createOffer();
      myPeerConnectionRef.current.setLocalDescription(offer);
      console.log("sent the offer");
      socketRef.current.emit("offer", offer, roomName);
    });

    socketRef.current.on("offer", async (offer) => {
      myPeerConnectionRef.current.addEventListener("datachannel", (event) => {
        myDataChannelRef.current = event.channel;

        myDataChannelRef.current.addEventListener("message", (event) =>
          console.log(event.data)
        );
      });

      console.log("received the offer");
      myPeerConnectionRef.current.setRemoteDescription(offer);
      const answer = await myPeerConnectionRef.current.createAnswer();
      myPeerConnectionRef.current.setLocalDescription(answer);
      socketRef.current.emit("answer", answer, roomName);
      console.log("sent the answer");
    });

    socketRef.current.on("answer", (answer) => {
      console.log("received the answer");
      myPeerConnectionRef.current.setRemoteDescription(answer);
    });

    socketRef.current.on("ice", (ice) => {
      console.log("received candidate");
      myPeerConnectionRef.current.addIceCandidate(ice);
    });
  }, [roomName]);

  // 1번째로 실행, 카메라 정보 가져오기
  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoCameras = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setCameras(videoCameras);
    } catch (e) {
      console.log(e);
    }
  };

  // 2번째로 실행,
  const getMedia = async (deviceId) => {
    const initialConstrains = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      // deviceId가 있으면 그 deviceId에 해당하는 기기를, 아니면 default로 가져옴
      const stream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstrains
      );
      // 내가 볼 때 여기가 문제긴 함 비동기라
      // setMyStream.current(stream);
      myStream.current = stream;
      myFaceRef.current.srcObject = stream;
      if (!deviceId) {
        await getCameras();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleMuteClick = () => {
    myStream.current
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setMuted((prev) => !prev);
  };

  const handleCameraClick = () => {
    myStream.current
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setCameraOff((prev) => !prev);
  };

  const handleCameraChange = async () => {
    await getMedia(camerasSelectRef.current.value);
    if (myPeerConnectionRef.current) {
      const videoTrack = myStream.current.getVideoTracks()[0];
      const videoSender = myPeerConnectionRef.current
        .getSenders()
        .find((sender) => sender.track.kind === "video");
      videoSender.replaceTrack(videoTrack);
    }
  };

  const handleWelcomeSubmit = async (event) => {
    event.preventDefault();
    await initCall();
    socketRef.current.emit("join_room", roomName);
  };

  const initCall = async () => {
    setInCall(true);
    await getMedia();
    makeConnection();
  };

  const makeConnection = () => {
    myPeerConnectionRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    myPeerConnectionRef.current.addEventListener("icecandidate", handleIce);
    myPeerConnectionRef.current.addEventListener("addstream", handleAddStream);
    myStream.current
      .getTracks()
      .forEach((track) =>
        myPeerConnectionRef.current.addTrack(track, myStream.current)
      );
  };

  const handleIce = (data) => {
    console.log("sent candidate");
    socketRef.current.emit("ice", data.candidate, roomName);
  };

  const handleAddStream = (data) => {
    peerFaceRef.current.srcObject = data.stream;
  };

  const camerasSelectRef = useRef();

  return (
    <div>
      {!inCall ? (
        <div id="welcome">
          <form onSubmit={handleWelcomeSubmit}>
            <input
              placeholder="room name"
              required
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button type="submit">Enter room</button>
          </form>
        </div>
      ) : (
        <div id="call">
          <div id="myStream.current">
            <video
              id="myFace"
              ref={myFaceRef}
              autoPlay
              playsInline
              width="400"
              height="400"
            ></video>
            <button id="mute" onClick={handleMuteClick}>
              {muted ? "Unmute" : "Mute"}
            </button>
            <button id="camera" onClick={handleCameraClick}>
              {cameraOff ? "Turn Camera On" : "Turn Camera Off"}
            </button>
            <select
              id="cameras"
              ref={camerasSelectRef}
              onChange={handleCameraChange}
            >
              {cameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label}
                </option>
              ))}
            </select>
            <video
              id="peerFace"
              ref={peerFaceRef}
              autoPlay
              playsInline
              width="400"
              height="400"
            ></video>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyroomVideocallPage;
