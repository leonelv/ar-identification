import React from "react";
import { ratio } from "../../constants";
import useDNIScanner, { useDNIScannerProps } from "../../hooks/useDNIScanner";
import AspectRatio from "../aspect-ratio";

export interface DNIScannerProps extends useDNIScannerProps {
  className?: string;
}

const DNIScanner = ({ onScanError, onScanSuccess, className = "" }: DNIScannerProps) => {
  const { videoRef, handleOnPlay } = useDNIScanner({ onScanError, onScanSuccess });

  return (
    <AspectRatio ratio={ratio} className={className}>
      <video
        playsInline
        controls={false}
        autoPlay
        ref={videoRef}
        style={{ width: "100%" }}
        onPlay={handleOnPlay}
      ></video>
    </AspectRatio>
  );
};

export default DNIScanner;
