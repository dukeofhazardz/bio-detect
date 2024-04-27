import React from 'react';
import Navbar from './Navbar';
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/deer.jpg";

const Home = () => {
  return (
    <div className='home-container'>
      <Navbar/>
      <div className='home-banner-container' id='home'>
        <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt="" />
        </div>
        <div className='home-text-section'>
          <h1 className='primary-heading'>
            Your Online Bio Detector . . .
          </h1>
          <p className='primary-text'>
            Leverage the power of AI to provide detailed descriptions of living organisms, including plants, animals, and insects.
          </p>
        </div>
        <div className='home-image-container'>
          <img src={BannerImage} alt="" style={{ maxHeight: "500px", borderRadius: "50%" }} />
        </div>
      </div>
    </div>
  )
}

export default Home
