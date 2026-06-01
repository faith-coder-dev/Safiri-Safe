import React from 'react';
import '../styles/Features.css';

const steps = [
    {
        title: 'Create Your Account',
        description: 'Sign up and get started in less than a minute.',
        icon: (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="22" r="12" />
                <path d="M12 56c2.2-12.8 11-20 20-20s17.8 7.2 20 20Z" />
            </svg>
        ),
    },
    {
        title: 'Set Up Your Profile',
        description: 'Add your traveler profile and trusted contacts.',
        icon: (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <rect x="10" y="16" width="44" height="34" rx="4" />
                <circle cx="26" cy="32" r="6" />
                <path d="M17 45c1.7-6 5.5-9 9-9s7.3 3 9 9" />
                <path d="M40 28h8" />
                <path d="M40 38h8" />
                <path d="M28 16v-6h8v6" />
            </svg>
        ),
    },
    {
        title: 'Choose Your Destination',
        description: 'Enter your destination and start planning your journey.',
        icon: (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M14 18v36l12-6 12 6 12-6V12l-12 6-12-6Z" />
                <path d="M26 12v36" />
                <path d="M38 18v36" />
                <path d="M46 8c-7 0-11 5-11 11 0 8 11 19 11 19s11-11 11-19c0-6-4-11-11-11Z" />
                <circle cx="46" cy="19" r="3" />
            </svg>
        ),
    },
    {
        title: 'Start Your Journey',
        description: 'Live tracking begins automatically.',
        icon: (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M12 40h6l6-12h18l6 12h4a6 6 0 0 1 0 12H12a6 6 0 0 1 0-12Z" />
                <circle cx="22" cy="52" r="5" />
                <circle cx="46" cy="52" r="5" />
                <path d="M43 10a13 13 0 0 1 0 26" />
                <path d="M43 18a5 5 0 0 1 0 10" />
            </svg>
        ),
    },
    {
        title: 'Share Your Link',
        description: 'Send a secure tracking link to family and friends.',
        icon: (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M18 36a10 10 0 1 1 0-20h8" />
                <path d="M38 16h8a10 10 0 1 1 0 20h-8" />
                <path d="M24 26h16" />
                <path d="M22 52h20" />
                <path d="M32 42v10" />
                <path d="m26 46 6-6 6 6" />
            </svg>
        ),
    },
    {
        title: 'Arrive Safely',
        description: 'End your journey when you reach your destination.',
        icon: (
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M32 8c-8 0-14 6-14 14 0 11 14 28 14 28s14-17 14-28c0-8-6-14-14-14Z" />
                <circle cx="32" cy="22" r="5" />
                <path d="m20 48 8 8 18-20" />
            </svg>
        ),
    },
];

const Features = () => {
    return (
        <section className="how-section" id="how">
            <div className="how-inner">
                <div className="how-heading">
                    <h2>How SafiriSafe Works</h2>
                    <p>Share your journey and let trusted contacts follow your progress in real time.</p>
                </div>

                <div className="steps-flow">
                    {steps.map((step, index) => (
                        <div className="step-item" key={step.title}>
                            <div className="step-icon-wrap">
                                <div className="step-icon">{step.icon}</div>
                                {index < steps.length - 1 && <span className="step-connector" />}
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
