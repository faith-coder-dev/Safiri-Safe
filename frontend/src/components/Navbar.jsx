import React from 'react';

const Navbar = ({ toggleTheme, theme }) => {
    return (
        <nav className="flex items-center justify-between py-6 px-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="text-2xl font-bold">SafiriSafe</div>
            <div className="hidden md:flex space-x-8 font-medium">
                <a href="#home">HOME</a>
                <a href="#how">HOW IT WORKS</a>
                <a href="#pricing">PRICING</a>
                <a href="#business">BUSINESS</a>
                <a href="#support">SUPPORT</a>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={toggleTheme} className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</button>
                <button className="bg-orange-500 text-white px-5 py-2 rounded-lg font-bold">LOGIN / REGISTER</button>
            </div>
        </nav>
    );
};

export default Navbar;