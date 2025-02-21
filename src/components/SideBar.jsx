import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/img/icon.png'

export const Sidebar = ({ onSelect }) => {
    const handleItemClick = () => {
        if (onSelect) {
            onSelect();
        }
    }
    const links = [
        { path: "/", label: "Home", fontClass: "font-medium" },
        { path: "/temperature", label: "Temperature", fontClass: "font-light" },
        { path: "/co2", label: "CO2", fontClass: "font-light" },
        { path: "/methane", label: "Methane", fontClass: "font-light" },
        { path: "/no2", label: "NO2", fontClass: "font-light" },
        { path: "/ocean", label: "Ocean", fontClass: "font-light" },
        
    ];
    return (
        <div className="flex w-72 overflow-hidden">
            <div className="w-full h-auto bg-blue-900 m-2.5 dark:bg-[#22486d] p-6 rounded shadow-md shadow-blue-950 dark:shadow-slate-950">
                <div className='flex items-center mb-8' >
                <img src={logo} alt="logo" className='mr-2 w-12 h-12' />
                <h2 className="text-3xl font-bold  text-white">Eco Vision</h2>
                </div>
                <ul className="space-y-4">
                    {links.map(link => (
                        <li key={link.path}>
                            <Link
                                onClick={handleItemClick}
                                to={link.path}
                                className={`block text-white duration-300 hover:bg-sky-100 hover:text-blue-950 dark:hover:bg-[#5b7a92] dark:hover:text-white hover:shadow-lg p-2 rounded ${link.fontClass}`}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
Sidebar.propTypes = {
    onSelect: PropTypes.func
};