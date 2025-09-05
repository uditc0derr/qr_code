import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { FiDownload } from "react-icons/fi";

export default function App() {
  const [text, setText] = useState("");
  const qrRef = useRef(null);
  const qrCode = useRef(
    new QRCodeStyling({
      width: 250,
      height: 250,
      type: "svg",
      data: "https://example.com",
      margin: 10,
      qrOptions: { errorCorrectionLevel: "H" },
      dotsOptions: { color: "#000000", type: "rounded" },
      backgroundOptions: { color: "#D9D9D9" },
      cornersSquareOptions: { color: "#000000", type: "extra-rounded" },
      cornersDotOptions: { color: "#FF6600" },
    })
  ).current;

  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  useEffect(() => {
    qrCode.update({ data: text || " " });
  }, [text, qrCode]);

  const download = (ext) => {
    qrCode.download({ name: "qr-code", extension: ext });
  };

  return (
    <div
      style={{ backgroundColor: "#0C0C0C" }}
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
    >
      <h1
        style={{ color: "#FFFFFF", fontWeight: 600 }}
        className="text-xl sm:text-2xl mb-6 text-center"
      >
        Design QR Codes
      </h1>


      <div
        style={{
          backgroundColor: "#111111",
          border: "1px solid #2A2A2A",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.45)",
        }}
        className="w-full max-w-md p-6 sm:p-12 flex flex-col items-center"
      >

        <div
          ref={qrRef}
          style={{
            backgroundColor: "#1A1A1A",
            borderRadius: "16px",
          }}
          className="flex justify-center items-center w-full max-w-[250px] aspect-square p-4 sm:p-8"
        />


        <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full">
          <button
            onClick={() => download("svg")}
            style={{
              backgroundColor: "#1A1A1A",
              color: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto"
          >
            <FiDownload size={18} /> SVG
          </button>
          <button
            onClick={() => download("png")}
            style={{
              backgroundColor: "#1A1A1A",
              color: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto"
          >
            <FiDownload size={18} /> PNG
          </button>
        </div>
      </div>


      <div className="mt-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter URL or text to encode"
          style={{
            borderRadius: "8px",
            backgroundColor: "#111111",
            color: "#FFFFFF",
            border: "1px solid #2A2A2A",
            outline: "none",
          }}
          className="w-full px-4 py-3 text-base sm:text-lg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={(e) => (e.target.style.border = "1px solid #FF6600")}
          onBlur={(e) => (e.target.style.border = "1px solid #2A2A2A")}
        />
        {!text && (
          <p
            style={{ color: "#FF4D4D" }}
            className="text-sm mt-2 sm:text-base"
          >
            Please enter content to generate QR code
          </p>
        )}
      </div>
    </div>
  );
}
