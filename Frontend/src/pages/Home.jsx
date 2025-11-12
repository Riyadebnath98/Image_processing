import React from "react";
import logo from "../assets/logo.jpg";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-logo">
          <img src={logo} alt="App Logo" />
        </div>

        <h1 className="home-title">Bring Grayscale Photos to Life 🎨</h1>
        <p className="home-subtitle">
          Upload a black-and-white photo and let our deep learning model colorize it automatically.
        </p>

        <div className="home-description">
          Experience the magic of AI-powered colorization — our system uses a
          ResNet-18 deep learning model to add realistic, vibrant colors to your
          old grayscale images. Preserve memories and rediscover your favorite
          moments in color!
        </div>

        <div className="home-cta">
          <a href="/samples" className="home-btn secondary">View Samples</a>
        </div>
      </div>
    </div>
  );
}
