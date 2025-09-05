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

  // Attach QRCode once
  useEffect(() => {
    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  // Update QRCode data live
  useEffect(() => {
    qrCode.update({ data: text || " " });
  }, [text, qrCode]);

  const download = (ext) => {
    qrCode.download({ name: "qr-code", extension: ext });
  };

  return (
    <div
      style={{ backgroundColor: "#0C0C0C" }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      {/* Header */}
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "24px",
        }}
      >
        Design QR Codes
      </h1>

      {/* Card */}
      <div
        style={{
          backgroundColor: "#111111",
          border: "1px solid #2A2A2A",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.45)",
          padding: "60px",
        }}
      >
        {/* QR Preview */}
        <div
          ref={qrRef}
          style={{
            backgroundColor: "#1A1A1A",
            padding: "32px",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />

        {/* Buttons */}
        <div className="flex gap-3 mt-4 justify-center">
          <button
            onClick={() => download("svg")}
            style={{
              backgroundColor: "#1A1A1A",
              color: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
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
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FiDownload size={18} /> PNG
          </button>
        </div>
      </div>

      {/* Input */}
      <div style={{ marginTop: "24px", width: "100%", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Enter URL or text to encode"
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "#111111",
            color: "#FFFFFF",
            border: "1px solid #2A2A2A",
            outline: "none",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={(e) => (e.target.style.border = "1px solid #FF6600")}
          onBlur={(e) => (e.target.style.border = "1px solid #2A2A2A")}
        />
        {!text && (
          <p style={{ color: "#FF4D4D", fontSize: "14px", marginTop: "8px" }}>
            Please enter content to generate QR code
          </p>
        )}
      </div>
    </div>
  );
}
