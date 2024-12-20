import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { SOCKET_URL_VIDEO } from "../api/config";
import { Loading } from "./Loading";
import { useParams } from "react-router-dom";

export const StudyroomVideocallPage = () => {
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [cameras, setCameras] = useState([]);
  // const [roomName, setRoomName] = useState("");
  const [inCall, setInCall] = useState(false);
  const [users, setUsers] = useState([]);

  const myFaceRef = useRef();
  const socketRef = useRef();
  const myPeerConnections = useRef({});
  const myStream = useRef();
  const camerasSelectRef = useRef();

  const { studyroomId } = useParams();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL_VIDEO);

    socketRef.current.on("all-users", (users) => {
      users.forEach((userId) => {
        createPeerConnection(userId, true);
      });
    });

    socketRef.current.on("user-joined", (userId) => {
      createPeerConnection(userId, false);
    });

    socketRef.current.on("offer", async (userId, offer) => {
      const pc = await createPeerConnection(userId, false);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socketRef.current.emit("answer", userId, answer);
    });

    socketRef.current.on("answer", async (userId, answer) => {
      const pc = myPeerConnections.current[userId];
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socketRef.current.on("ice-candidate", (userId, candidate) => {
      const pc = myPeerConnections.current[userId];
      if (pc) {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socketRef.current.on("user-left", (userId) => {
      if (myPeerConnections.current[userId]) {
        myPeerConnections.current[userId].close();
        delete myPeerConnections.current[userId];
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const createPeerConnection = async (userId, isInitiator) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            // 필요한 경우 다른 STUN/TURN 서버 추가
          ],
        },
      ],
    });

    myPeerConnections.current[userId] = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", userId, event.candidate);
      }
    };

    pc.ontrack = (event) => {
      setUsers((prevUsers) => {
        if (!prevUsers.some((user) => user.id === userId)) {
          return [...prevUsers, { id: userId, stream: event.streams[0] }];
        }
        return prevUsers;
      });
    };

    myStream.current.getTracks().forEach((track) => {
      pc.addTrack(track, myStream.current);
    });

    if (isInitiator) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socketRef.current.emit("offer", userId, offer);
    }

    return pc;
  };

  const getMedia = async (deviceId) => {
    const initialConstraints = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstraints
      );
      myStream.current = stream;
      myFaceRef.current.srcObject = stream;
      if (!deviceId) {
        await getCameras();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoCameras = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setCameras(videoCameras);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMuteClick = () => {
    myStream.current.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setMuted((prev) => !prev);
  };

  const handleCameraClick = () => {
    myStream.current.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setCameraOff((prev) => !prev);
  };

  const handleCameraChange = async () => {
    await getMedia(camerasSelectRef.current.value);
    Object.values(myPeerConnections.current).forEach((pc) => {
      const videoTrack = myStream.current.getVideoTracks()[0];
      const sender = pc.getSenders().find((s) => s.track.kind === "video");
      if (sender) {
        sender.replaceTrack(videoTrack);
      }
    });
  };

  const initCall = async () => {
    setInCall(true);
    console.log(`[initCall] studyroomId: ${studyroomId}`);
    await getMedia();
    socketRef.current.emit("join-room", studyroomId);
  };

  const handleWelcomeSubmit = async (event) => {
    // event.preventDefault();
    await initCall();
  };

  useEffect(() => {
    handleWelcomeSubmit();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {!inCall ? (
        // <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
        //   <form onSubmit={handleWelcomeSubmit} className="space-y-4">
        //     <input
        //       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       placeholder="Enter room name"
        //       required
        //       type="text"
        //       value={roomName}
        //       onChange={(e) => setRoomName(e.target.value)}
        //     />
        //     <button
        //       type="submit"
        //       className="w-full px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
        //     >
        //       Enter Room
        //     </button>
        //   </form>
        // </div>
        <Loading />
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <video
                id="myFace"
                ref={myFaceRef}
                autoPlay
                playsInline
                className="w-full mb-4 rounded-lg"
              ></video>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleMuteClick}
                  className={`px-4 py-2 rounded-lg ${
                    muted ? "bg-red-500" : "bg-green-500"
                  } text-white hover:opacity-90`}
                >
                  {muted ? "Unmute" : "Mute"}
                </button>
                <button
                  onClick={handleCameraClick}
                  className={`px-4 py-2 rounded-lg ${
                    cameraOff ? "bg-red-500" : "bg-green-500"
                  } text-white hover:opacity-90`}
                >
                  {cameraOff ? "Turn Camera On" : "Turn Camera Off"}
                </button>
                <select
                  ref={camerasSelectRef}
                  onChange={handleCameraChange}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {cameras.map((camera) => (
                    <option key={camera.deviceId} value={camera.deviceId}>
                      {camera.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="p-4 bg-white rounded-lg shadow-lg"
                >
                  <Video stream={user.stream} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Video = ({ stream }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = stream;
  }, [stream]);

  return (
    <video ref={ref} autoPlay playsInline width="400" height="300"></video>
  );
};{}
