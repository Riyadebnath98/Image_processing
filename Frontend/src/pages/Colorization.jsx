import { useEffect, useState } from "react";
import { colorize } from "../api";
import { useNavigate } from "react-router-dom";

export default function Colorization({ loggedIn }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      // If you prefer auto-redirect:
      // navigate("/login");
    }
  }, [loggedIn, navigate]);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    setResultUrl("");
    if (f) setPreview(URL.createObjectURL(f));
  };

  const run = async () => {
    if (!file) return;
    setLoading(true);
    setResultUrl("");
    try {
      const blob = await colorize(file);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (e) {
      alert("Colorization failed. Check backend URL & logs.");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = "colorized_image.png";
    link.click();
  };

  return (
    <div className="colorize-container page-bg">
      {!loggedIn && (
        <div className="colorize-warning">
          ⚠️ Please login first to explore this page.
        </div>
      )}

      <div className="colorize-card">
        <h1 className="colorize-title">🎨 Image Colorization</h1>
        <p className="colorize-subtitle">
          Upload your grayscale photo (JPG/PNG) and let AI bring it to life!
        </p>

        <div className="colorize-upload">
          <input
            type="file"
            accept="image/*"
            onChange={onFile}
            className="file-input"
          />
          <button
            className="btn colorize-btn"
            onClick={run}
            disabled={!file || loading}
          >
            {loading ? "Colorizing..." : "Colorize"}
          </button>
        </div>

        <div className="colorize-results">
          <div className="colorize-panel">
            <h3>Input</h3>
            {preview ? (
              <img
                src={preview}
                alt="input"
                className="colorize-img"
              />
            ) : (
              <div className="placeholder">No image selected</div>
            )}
          </div>

          <div className="colorize-panel">
            <h3>Output</h3>
            {resultUrl ? (
              <>
                <img
                  src={resultUrl}
                  alt="result"
                  className="colorize-img"
                />
                <button className="btn download-btn" onClick={downloadImage}>
                  ⬇️ Download
                </button>
              </>
            ) : (
              <div className="placeholder">No output yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
