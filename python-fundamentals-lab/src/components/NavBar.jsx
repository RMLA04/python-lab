import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './NavBar.css';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/lessons', label: 'Learn' },
        { path: '/flashcards', label: 'Flashcards' },
        { path: '/quiz', label: 'Quiz' },
        { path: '/progress', label: 'Progress' }
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <span className="logo-text">Python Lab</span>
                </Link>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="nav-label">{link.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    <ThemeToggle />
                    <button
                        className="hamburger"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
