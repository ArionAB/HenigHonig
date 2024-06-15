// Tabs.js
import React, { useState } from 'react';
import styles from "@/styles/tabs.module.scss"

const Tabs = ({ tabs, onTabChange }: any): any => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        onTabChange(index);
    };

    return (
        <div className={styles.tabs}>
            {tabs.map((tab: any, index: number) => (
                <div
                    key={index}
                    className={`${styles.tab} ${activeTab === index ? `${styles.active}` : ''}`}
                    onClick={() => handleTabClick(index)}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};

export default Tabs;
