import React from "react";
import sample1Gray from "../assets/samples/sample1_gray.jpg";
import sample1Color from "../assets/samples/sample1_color.jpg";
import sample2Gray from "../assets/samples/sample2_gray.png";
import sample2Color from "../assets/samples/sample2_color.jpg";
export default function Sample() {
  return (
    <div className="home-container">
<div className="sample-container ">
      <h1 className="sample-title">How to Use This Website</h1>

      <p className="sample-description">
        This AI-powered web application automatically colorizes grayscale
        (black-and-white) images using a deep learning model built on
        ResNet-18. Follow the steps below to get started:
      </p>

      <ol className="sample-steps">
        <li>Navigate to the <strong>Colorization</strong> page.</li>
        <li>Upload your grayscale image (JPG or PNG format).</li>
        <li>Click on the <strong>"Colorize"</strong> button.</li>
        <li>Wait a few seconds to see your vibrant colorized output!</li>
      </ol>

      <hr className="sample-divider" />

      <h2 className="sample-subtitle">Sample Works</h2>
      <p className="sample-description">
        Below are a few examples demonstrating how grayscale photos are
        beautifully transformed into colorful versions by our model.
      </p>

      <div className="sample-grid">
        <div className="sample-card">
          <h3>Sample 1</h3>
          <div className="sample-images">
            <div>
              <img src={sample1Gray} alt="Grayscale 1" />
              <p className="caption">Input (Grayscale)</p>
            </div>
            <div>
              <img src={sample1Color} alt="Colorized 1" />
              <p className="caption">Output (Colorized)</p>
            </div>
          </div>
        </div>

        <div className="sample-card">
          <h3>Sample 2</h3>
          <div className="sample-images">
            <div>
              <img src={sample2Gray} alt="Grayscale 2" />
              <p className="caption">Input (Grayscale)</p>
            </div>
            <div>
              <img src={sample2Color} alt="Colorized 2" />
              <p className="caption">Output (Colorized)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}
