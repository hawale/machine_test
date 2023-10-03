import React, { useState, useEffect } from "react";
import BannerBackground from "../Assets/home-banner-background.webp";
import Slider1 from "../Assets/slider1.avif";
import Slider2 from "../Assets/slider2.avif";
import Slider3 from "../Assets/slider3.avif";
import homeImg1 from "../Assets/home_img_1.avif";
import homeImg2 from "../Assets/home_img_2.avif";
import homeImg3 from "../Assets/home_img_3.avif";
import { useNavigate } from "react-router-dom";

const sliderImages = [Slider1, Slider2, Slider3];

const bannerStyle = {
    backgroundImage: `url(${BannerBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column", // Updated to column
    alignItems: "center",
    justifyContent: "flex-start", // Updated to flex-start
    color: "white",
    textAlign: "center",
  };
  

const sliderContainerStyle = {
  position: "relative",
  overflow: "hidden",
  height: "100vh",
};

const sliderImageStyle = {
  width: "100vw",
  height: "100vh",
  objectFit: "cover",
  objectPosition: "center",
  transition: "transform 0.5s ease",
  display: "block",
  position: "absolute", // Make images absolute within the container
};

const sliderNavStyle = {
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
};

const sliderNavItemStyle = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  margin: "0 6px",
  background: "rgba(255, 255, 255, 0.5)",
  cursor: "pointer",
};

const sliderNavItemActiveStyle = {
  background: "#fff",
};

const homeImagesContainerStyle = {
  width: "100vw",
  display: "flex",
  flexDirection: "column",
};

const homeImageStyle = {
  width: "100vw",
  height: "auto",
};

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/Product");
  }
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div style={bannerStyle}>
        <div className="home-text-section">
          <h1 className="primary-heading">Welcome to ZipKart</h1>
          {/* <p className="primary-text">
            Discover the latest trends in online shopping. Shop now for the best deals on a wide range of products.
          </p> */}
        </div>
      </div>
      <div style={sliderContainerStyle}>
        {sliderImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Slider"
            style={{
              ...sliderImageStyle,
              transform: `translateX(${(index - currentImageIndex) * 100}vw)`,
              zIndex: index === currentImageIndex ? 1 : 0,
            }}
          />
        ))}
        <div style={sliderNavStyle}>
          {sliderImages.map((_, index) => (
            <div
              key={index}
              style={{
                ...sliderNavItemStyle,
                ...(index === currentImageIndex
                  ? sliderNavItemActiveStyle
                  : null),
              }}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <div style={homeImagesContainerStyle}>
        <img src={homeImg1} alt="Home Image 1" style={homeImageStyle} />
        <img src={homeImg2} alt="Home Image 2" style={homeImageStyle} />
        <img src={homeImg3} alt="Home Image 3" style={homeImageStyle} />
      </div>
    </div>
  );
}

export default Home;
