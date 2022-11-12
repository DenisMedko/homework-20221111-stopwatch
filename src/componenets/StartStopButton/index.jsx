import React from 'react';
import styles from './StartStopButton.module.css';

const StartStopButton = (props) => {
    const {btnName, onClick, disabled = false} = props;
    return (
        <button className={`${styles.btn} ${styles['btn'+btnName]}`} onClick={onClick} disabled={disabled}>{btnName}</button>
    );
}

export default StartStopButton;
