import React from "react";
import { ratio } from "../../constants";
import useScanner, { useScannerProps } from "../../hooks/useScanner";
import AspectRatio from "../aspect-ratio";

export interface ScannerProps extends useScannerProps {
  className?: string;
}

const Scanner = ({ onScanError, onScanSuccess, className = "", allowQR, QRValidationFn }: ScannerProps) => {
  const { videoRef, handleOnPlay } = useScanner({ onScanError, onScanSuccess, allowQR, QRValidationFn });

  return (
    <AspectRatio ratio={ratio} className={className}>
      <video playsInline controls={false} autoPlay ref={videoRef} style={{ width: "100%" }} onPlay={handleOnPlay} />
    </AspectRatio>
  );
};

export default Scanner;
