import React, { useState, useEffect } from 'react';
import styles from './Settings.module.css';

interface SettingsProps {
    onThemeChange: (theme: 'system' | 'light' | 'dark') => void;
    themeMode: 'system' | 'light' | 'dark';
}

const Settings: React.FC<SettingsProps> = ({ onThemeChange, themeMode }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(`.${styles.settings}`)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleThemeChange = (theme: 'system' | 'light' | 'dark') => {
        onThemeChange(theme);
        setIsOpen(false);
    };

    return (
        <div className={`${styles.settings} ${styles[`${themeMode}-theme`]}`}>
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
                <div className={styles.settingsPopup}>
                    <div className={styles.themeOptions}>
                        <div className={styles.themeOption}>
                            <input
                                type="radio"
                                id="system"
                                name="theme"
                                checked={themeMode === 'system'}
                                onChange={() => handleThemeChange('system')}
                            />
                            <label htmlFor="system">시스템 테마</label>
                        </div>
                        <div className={styles.themeOption}>
                            <input
                                type="radio"
                                id="light"
                                name="theme"
                                checked={themeMode === 'light'}
                                onChange={() => handleThemeChange('light')}
                            />
                            <label htmlFor="light">라이트 테마</label>
                        </div>
                        <div className={styles.themeOption}>
                            <input
                                type="radio"
                                id="dark"
                                name="theme"
                                checked={themeMode === 'dark'}
                                onChange={() => handleThemeChange('dark')}
                            />
                            <label htmlFor="dark">다크 테마</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings; 