import { useEffect, useRef, useState } from "react";
import { DNI, dniDecoder } from "@ar-identification/decode";
import { BrowserPDF417Reader } from "@zxing/browser/esm/readers/BrowserPDF417Reader.js";

import { videoConstraints } from "../constants";

const reader = new BrowserPDF417Reader();

export interface useDNIScannerProps {
  onScanSuccess: (dni: DNI) => void;
  onScanError: (error: Error) => void;
}

const useDNIScanner = ({ onScanSuccess, onScanError }: useDNIScannerProps) => {
  const [mediaStream, setMediaStream] = useState<MediaProvider>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const getUserMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });

      setMediaStream(mediaStream);
    } catch (error) {
      onScanError(error);
    }
  };

  const startDecode = async () => {
    const data = await reader.decodeOnceFromVideoElement(videoRef.current as HTMLVideoElement);
    const text = data.getText();

    try {
      const dni = await dniDecoder(text);
      onScanSuccess(dni);
    } catch (error) {
      onScanError(error);
    }
  };

  const handleOnPlay = () => {
    startDecode();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream as MediaProvider;
    }
  }, [mediaStream, videoRef]);

  useEffect(() => {
    getUserMedia();
  }, []);

  return { handleOnPlay, videoRef };
};

export default useDNIScanner;
