import React from 'react';
import { Bell, Car, Clock3, Crown, IdCard, Map, MapPinned, Monitor, Radar, Share2, ShieldCheck, User, Users, ToggleRight } from 'lucide-react';
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

const benefits = [
    {
        title: 'Private Tracking Links',
        description: 'Only people you choose can view your live location. Your journey stays private and secure.',
        icon: ShieldCheck,
    },
    {
        title: 'No App Required',
        description: 'Trusted contacts can track your journey directly from their browser. No downloads or sign-ups needed.',
        icon: Monitor,
    },
    {
        title: 'Real-Time Updates',
        description: 'Live location updates help loved ones stay informed throughout your journey.',
        icon: Radar,
    },
    {
        title: 'End Tracking Anytime',
        description: 'You\'re always in control. Stop sharing your journey whenever you arrive safely.',
        icon: ToggleRight,
    },
];

const features = [
    {
        title: 'Live Journey Tracking',
        description: 'Real-time location updates throughout your journey. See every move on the map.',
        icon: Map,
    },
    {
        title: 'Trusted Contact Sharing',
        description: 'Share a secure tracking link with family and friends in one tap.',
        icon: Users,
    },
    {
        title: 'SOS Alerts',
        description: 'Send instant alerts in emergency situations. Help is just a tap away.',
        icon: Bell,
    },
    {
        title: 'Multiple Profiles',
        description: 'Create and manage multiple traveler profiles for you and your loved ones.',
        icon: User,
    },
    {
        title: 'Journey History',
        description: 'View and manage your past journeys and tracking records.',
        icon: Clock3,
    },
    {
        title: 'Premium Family Features',
        description: 'Advanced features for families who want complete peace of mind.',
        icon: Crown,
    },
];

const Features = () => {
    return (
        <>
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

            <section className="benefits-section" id="benefits">
                <div className="how-inner">
                    <div className="benefits-heading">
                        <h2>Why Travelers Trust SafiriSafe</h2>
                        <p>Built for Trust. Designed for Peace of Mind.</p>
                    </div>
                    <div className="benefit-cards">
                        {benefits.map((benefit) => {
                            const BenefitIcon = benefit.icon;

                            return (
                                <article className="benefit-card" key={benefit.title}>
                                    <div className="benefit-icon">
                                        <BenefitIcon aria-hidden="true" strokeWidth={2.25} />
                                    </div>
                                    <h4>{benefit.title}</h4>
                                    <p>{benefit.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="feature-section" id="features">
                <div className="how-inner">
                    <div className="feature-heading">
                        <h2>Features</h2>
                        <p>Smart tools designed to keep you and your loved ones connected every step of the way.</p>
                    </div>
                    <div className="feature-cards">
                        {features.map((feature) => {
                            const FeatureIcon = feature.icon;

                            return (
                                <article className="feature-card" key={feature.title}>
                                    <div className="feature-icon">
                                        <FeatureIcon aria-hidden="true" strokeWidth={2.25} />
                                    </div>
                                    <h4>{feature.title}</h4>
                                    <p>{feature.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;
