import React, { useState } from 'react';
import { RadioGroup, RadioOption } from '../index.style.ts';
import styles from './Settings.module.css';

interface SettingsProps {
    themeMode: "system" | "light" | "dark";
    onThemeChange: (theme: "system" | "light" | "dark") => void;
}

const Settings: React.FC<SettingsProps> = ({ themeMode, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onThemeChange(e.target.value as "system" | "light" | "dark");
    };

    return (
        <div className={styles.settings}>
            <button 
                className={styles.settingsButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Settings"
            >
                <svg 
                    className={styles.gearIcon}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
            </button>
            {isOpen && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h3 className={styles.popupTitle}>Settings</h3>
                        <RadioGroup>
                            <RadioOption>
                                <input
                                    type="radio"
                                    id="system"
                                    name="theme"
                                    value="system"
                                    checked={themeMode === "system"}
                                    onChange={handleThemeChange}
                                />
                                <label htmlFor="system">System Mode</label>
                            </RadioOption>
                            <RadioOption>
                                <input
                                    type="radio"
                                    id="light"
                                    name="theme"
                                    value="light"
                                    checked={themeMode === "light"}
                                    onChange={handleThemeChange}
                                />
                                <label htmlFor="light">Light Mode</label>
                            </RadioOption>
                            <RadioOption>
                                <input
                                    type="radio"
                                    id="dark"
                                    name="theme"
                                    value="dark"
                                    checked={themeMode === "dark"}
                                    onChange={handleThemeChange}
                                />
                                <label htmlFor="dark">Dark Mode</label>
                            </RadioOption>
                        </RadioGroup>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings; 