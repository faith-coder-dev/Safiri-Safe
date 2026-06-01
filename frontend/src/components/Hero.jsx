import React from 'react';
import '../styles/Hero.css';
import phoneMockup from '../assets/safiri safe images/MockUPhone-transparent.png';
import map3D from '../assets/safiri safe images/3d-view-map.jpg';

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">SAFE JOURNEYS. LIVE TRACKING. PEACE OF MIND.</h1>
                <p className="hero-subtitle">
                    Share your journey in real time with the people who matter most. <b>No downloads. No complicated setup.</b>
                </p>
                <button className="hero-cta">GET STARTED FOR FREE</button>
            </div>

            <div className="phone-container">
                <div className="phone-screen">
                    <img src={map3D} alt="" className="map-screen-fill" />
                    <img src={map3D} alt="3D trip route map" className="map-inside-phone" />
                    <div className="map-notification map-notification-top">
                        <span className="notification-dot" />
                        Journey Shared
                    </div>
                    <div className="map-notification map-notification-bottom">
                        <span className="notification-dot" />
                        Live Tracking
                    </div>
                </div>
                <img src={phoneMockup} alt="Phone Frame" className="phone-frame" />
            </div>
        </section>
    );
};

export default Hero;
