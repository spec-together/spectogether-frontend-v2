import { useEffect, useRef } from "react";

export const Video = ({ stream }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.srcObject = stream;
  }, [stream]);

  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      className="w-full h-full rounded-lg"
    ></video>
  );
};
