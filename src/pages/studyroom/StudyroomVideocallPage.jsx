import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import { SOCKET_URL_VIDEO } from "../../api/config.js";
import { Loading } from "../Loading.jsx";
import { useParams } from "react-router-dom";
import { Video } from "../../components/studyroom/video/VideoCard.jsx";

export const StudyroomVideocallPage = () => {
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [cameras, setCameras] = useState([]);
  // const [roomName, setRoomName] = useState("");
  const [inCall, setInCall] = useState(false);
  const [users, setUsers] = useState([]);

  const myFaceRef = useRef(); // 내 화면
  const socketRef = useRef(); // 소캣
  const myPeerConnections = useRef({}); // 피어 연결
  const myStream = useRef();
  const camerasSelectRef = useRef();

  const [isCalling, setIsCalling] = useState(false);

  const { studyroomId } = useParams();

  useEffect(() => {
    console.log("통화에 접속한 사용자가 변동되었습니다.", users);
  }, [users]);

  useEffect(() => {
    if (!isCalling) {
      return;
    }
    console.log("이거 실행됬어요 ~");
    socketRef.current = io(SOCKET_URL_VIDEO);
    // 이 방에 있는 모든 사용자의 socket.id를 리턴받고,
    // 각각의 socket.id에 대해 peer connection을 생성
    socketRef.current.on("all-users", (sockets) => {
      sockets.forEach((opponentSocketId) => {
        createPeerConnection(opponentSocketId, true);
      });
    });

    // 사용자가 새로 들어올 경우, 들어온 사용자에 대해 peer connection을 생성
    socketRef.current.on("user-joined", (joinedUserSocketId) => {
      createPeerConnection(joinedUserSocketId, false);
    });

    // offer를 받는 경우
    // offer로 받은 socket.id에 대해서 peer connection을 생성하고,
    // 해당 peer connection을 remote description으로 설정
    // 그리고 answer를 생성하여 local description으로 설정 후 전송
    socketRef.current.on("offer", async (socketId, offer) => {
      const pc = await createPeerConnection(socketId, false);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socketRef.current.emit("answer", socketId, answer);
    });

    // answer를 받는 경우 해당 socket.id에 대한 부분을
    // remote description으로 설정
    socketRef.current.on("answer", async (socketId, answer) => {
      const pc = myPeerConnections.current[socketId];
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    // ice candidate를 전달받은 경우에 해당 부분을 추가해주기
    // myPeerConnections는 내 모든 연결을 가지고 있는 것
    socketRef.current.on("ice-candidate", (socketId, candidate) => {
      const pc = myPeerConnections.current[socketId];
      if (pc) {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socketRef.current.on("user-left", (socketId) => {
      if (myPeerConnections.current[socketId]) {
        myPeerConnections.current[socketId].close();
        delete myPeerConnections.current[socketId];
        setUsers((prevUsers) =>
          // socket.id와 일치하는 사용자를 users에서 제거
          prevUsers.filter((user) => user.id !== socketId)
        );
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [isCalling]);

  const createPeerConnection = async (socketId, isInitiator) => {
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

    myPeerConnections.current[socketId] = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log(`[onicecandidate] event`, event);
        socketRef.current.emit("ice-candidate", socketId, event.candidate);
      }
    };

    pc.ontrack = (event) => {
      console.log(`[ontrack] event`, event);
      setUsers((prevUsers) => {
        // 이미 해당 사용자가 존재하는 경우에는 추가하지 않음
        if (!prevUsers.some((socket) => socket.id === socketId)) {
          return [...prevUsers, { id: socketId, stream: event.streams[0] }];
        }
        return prevUsers;
      });
    };

    myStream.current.getTracks().forEach((track) => {
      console.log(`[createPeerConnection] myStream getTracks`, track);
      pc.addTrack(track, myStream.current);
    });

    if (isInitiator) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socketRef.current.emit("offer", socketId, offer);
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

  const handleWelcomeSubmit = async () => {
    // event.preventDefault();
    await initCall();
  };

  useEffect(() => {
    if (!isCalling) return;
    handleWelcomeSubmit();
  }, [isCalling]);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex justify-center mb-4">
        {isCalling ? (
          <button
            onClick={() => {
              // 진짜 골 떄리네 이거 ㅋㅋ
              // 통화에서 나갈 땐 users도 초기화해주어야 함!
              setIsCalling(false);
              setInCall(false);
              setUsers([]);
              socketRef.current.disconnect();
            }}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            End Call
          </button>
        ) : (
          <button
            onClick={() => setIsCalling(true)}
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Start Call
          </button>
        )}
      </div>
      {!inCall ? (
        // <Loading />
        <div>waiting...</div>
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
