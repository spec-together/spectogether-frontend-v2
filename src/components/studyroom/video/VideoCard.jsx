import { useEffect, useRef } from "react";

export const Video = ({ stream }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = stream;
  }, [stream]);

  return (
    <video ref={ref} autoPlay playsInline width="400" height="300"></video>
  );
};
