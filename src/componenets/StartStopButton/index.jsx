import React from 'react';
import styles from './StartStopButton.module.css';

const StartStopButton = (props) => {
    const {btnName, onClick} = props;
    return (
        <button className={`${styles.btn} ${styles['btn'+btnName]}`} onClick={onClick}>{btnName}</button>
    );
}

export default StartStopButton;
