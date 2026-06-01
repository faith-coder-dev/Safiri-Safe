import React from 'react';
import '../styles/Navbar.css';

const Navbar = ({ toggleTheme, theme }) => {
    const isDark = theme === 'dark';

    return (
        <nav className="navbar-container dark:bg-gray-900 dark:border-gray-700">
            <a href="#home" className="navbar-brand dark:text-white">SafiriSafe</a>
            <div className="navbar-links dark:text-gray-300">
                <a href="#home" className="hover:text-orange-500 dark:hover:text-orange-400 transition">HOME</a>
                <a href="#how" className="hover:text-orange-500 dark:hover:text-orange-400 transition">HOW IT WORKS</a>
                <a href="#pricing" className="hover:text-orange-500 dark:hover:text-orange-400 transition">PRICING</a>
                <a href="#business" className="hover:text-orange-500 dark:hover:text-orange-400 transition">BUSINESS</a>
                <a href="#support" className="hover:text-orange-500 dark:hover:text-orange-400 transition">SUPPORT</a>
            </div>
            <div className="navbar-actions">
                <button
                    onClick={toggleTheme}
                    className="theme-toggle"
                    title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    type="button"
                >
                    {isDark ? (
                        <svg
                            className="theme-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2" />
                            <path d="M12 20v2" />
                            <path d="m4.93 4.93 1.41 1.41" />
                            <path d="m17.66 17.66 1.41 1.41" />
                            <path d="M2 12h2" />
                            <path d="M20 12h2" />
                            <path d="m6.34 17.66-1.41 1.41" />
                            <path d="m19.07 4.93-1.41 1.41" />
                        </svg>
                    ) : (
                        <svg
                            className="theme-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M20.99 12.82A8.5 8.5 0 1 1 11.18 3a6.5 6.5 0 0 0 9.81 9.82Z" />
                        </svg>
                    )}
                </button>
                <button className="navbar-button">LOGIN / REGISTER</button>
            </div>
        </nav>
    );
};

export default Navbar;
