import React, { useState } from 'react';
import './ButtonGroup.css';

const ButtonGroup = ({ setView }) => {
    const [activeButton, setActiveButton] = useState('chart');

    const handleClick = (view) => {
        setActiveButton(view);
        setView(view);
    };

    return (
        <div className="button-group">
            <button 
                className={activeButton === 'chart' ? 'active' : ''} 
                onClick={() => handleClick('chart')}
            >
                전체 위반
            </button>
            <button 
                className={activeButton === 'list' ? 'active' : ''} 
                onClick={() => handleClick('list')}
            >
                위반 항목
            </button>
            <button 
                className={activeButton === 'national' ? 'active' : ''} 
                onClick={() => handleClick('national')}
            >
                전국 현황
            </button>
        </div>
    );
};

export default ButtonGroup;