import { useEffect, useRef, useState } from "react";
import { DNI, dniDecoder } from "@ar-identification/decode";
import { BrowserPDF417Reader, BrowserQRCodeReader } from "@zxing/browser";

import { videoConstraints } from "../constants";

const PDF417Reader = new BrowserPDF417Reader();
const QRReader = new BrowserQRCodeReader();

export interface SuccessEvent {
  data: DNI | string;
  type: "DNI" | "OTHER";
}

export interface useScannerProps {
  onScanSuccess: (data: SuccessEvent) => void;
  onScanError: (error: Error) => void;
  allowQR?: boolean;
  QRValidationFn?: (data: string) => Promise<boolean>;
}

const useScanner = ({ onScanSuccess, onScanError, allowQR, QRValidationFn }: useScannerProps) => {
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

  const startPDF417Decode = async () => {
    const data = await PDF417Reader.decodeOnceFromVideoElement(videoRef.current as HTMLVideoElement);
    const text = data.getText();

    try {
      const dni = await dniDecoder(text);
      onScanSuccess({ type: "DNI", data: dni });
    } catch (error) {
      onScanError(error);
    }
  };

  const startQRDecode = async () => {
    const data = await QRReader.decodeOnceFromVideoElement(videoRef.current as HTMLVideoElement);
    const text = data.getText();

    if (QRValidationFn) {
      const isValid = await QRValidationFn(text);

      if (isValid) {
        onScanSuccess({ type: "OTHER", data: text });
      } else {
        onScanError(new Error("invalid qr"));
      }
    } else {
      onScanSuccess({ type: "OTHER", data: text });
    }
  };

  const handleOnPlay = () => {
    startPDF417Decode();

    if (allowQR) {
      startQRDecode();
    }
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

export default useScanner;
