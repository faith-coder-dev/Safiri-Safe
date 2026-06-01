import React from 'react';
import { Car, IdCard, MapPinned, Share2, ShieldCheck, User } from 'lucide-react';
import '../styles/Features.css';

const steps = [
    {
        title: 'Create Your Account',
        description: 'Sign up and get started in less than a minute.',
        icon: User,
    },
    {
        title: 'Set Up Your Profile',
        description: 'Add your traveler profile and trusted contacts.',
        icon: IdCard,
    },
    {
        title: 'Choose Your Destination',
        description: 'Enter your destination and start planning your journey.',
        icon: MapPinned,
    },
    {
        title: 'Start Your Journey',
        description: 'Live tracking begins automatically.',
        icon: Car,
    },
    {
        title: 'Share Your Link',
        description: 'Send a secure tracking link to family and friends.',
        icon: Share2,
    },
    {
        title: 'Arrive Safely',
        description: 'End your journey when you reach your destination.',
        icon: ShieldCheck,
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
                    {steps.map((step, index) => {
                        const StepIcon = step.icon;

                        return (
                            <div className="step-item" key={step.title}>
                                <div className="step-icon-wrap">
                                    <div className="step-icon">
                                        <StepIcon aria-hidden="true" strokeWidth={2.25} />
                                    </div>
                                    <span className="step-number">{index + 1}</span>
                                    {index < steps.length - 1 && <span className="step-connector" />}
                                </div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
