import React from 'react';
import '../styles/Hero.css';
import phoneMockup from '../assets/safiri safe images/MockUPhone.jpg';
import map3D from '../assets/safiri safe images/3d-view-map.jpg';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">SECURE JOURNEYS. INSTANT MIRROR LINKS.</h1>
                <p className="hero-subtitle">
                    Safety for travelers. Peace of mind for loved ones. <b>No app required.</b>
                </p>
                <button className="hero-cta">GET STARTED FOR FREE</button>
            </div>

            <div className="phone-container">
                <img src={map3D} alt="Map" className="map-inside-phone" />
                <img src={phoneMockup} alt="Phone Frame" className="phone-frame" />
            </div>
        </section>
    );
};

export default Hero;