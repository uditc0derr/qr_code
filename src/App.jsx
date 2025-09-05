 import React, { useEffect, useRef, useState } from "react";
    // import { createRoot } from "react-dom/client";
    import QRCodeStyling from "qr-code-styling";
    import { FiDownload } from "react-icons/fi";

   export default  function App() {
      const [text, setText] = useState("");
      const qrRef = useRef(null);
      const qrCode = useRef(
        new QRCodeStyling({
          width: window.innerWidth < 640 ? 200 : 250,
          height: window.innerWidth < 640 ? 200 : 250,
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
      }, []);

      useEffect(() => {
        qrCode.update({ data: text || " " });
      }, [text]);

      const download = (ext) => {
        qrCode.download({ name: "qr-code", extension: ext });
      };

      return (
        <div className="min-h-screen bg-[#0C0C0C] flex flex-col items-center justify-center p-4 sm:p-6">
          <h1 className="text-white text-2xl sm:text-3xl font-semibold mb-6">
            Design QR Codes
          </h1>

          <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-md">
            <div
              ref={qrRef}
              className="bg-[#1A1A1A] p-6 sm:p-8 rounded-xl flex justify-center items-center"
            />

            <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center">
              <button
                onClick={() => download("svg")}
                className="bg-[#1A1A1A] text-white rounded-lg shadow-md py-2 px-4 flex items-center justify-center gap-2 hover:bg-[#2A2A2A] transition"
              >
                <FiDownload size={18} /> SVG
              </button>
              <button
                onClick={() => download("png")}
                className="bg-[#1A1A1A] text-white rounded-lg shadow-md py-2 px-4 flex items-center justify-center gap-2 hover:bg-[#2A2A2A] transition"
              >
                <FiDownload size={18} /> PNG
              </button>
            </div>
          </div>

          <div className="mt-6 w-full max-w-md">
            <input
              type="text"
              placeholder="Enter URL or text to encode"
              className="w-full p-3 rounded-lg bg-[#111111] text-white border border-[#2A2A2A] focus:border-[#FF6600] outline-none transition"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {!text && (
              <p className="text-[#FF4D4D] text-sm mt-2">
                Please enter content to generate QR code
              </p>
            )}
          </div>
        </div>
      )
          }
