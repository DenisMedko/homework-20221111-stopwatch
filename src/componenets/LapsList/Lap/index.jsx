import React from 'react';
import styles from './Lap.module.css';
const Lap = (props) => {
    const {id, lapTime, totalTime} = props.lap;
    return (
        <li className={styles.lapLi}>
        Lap # {id} Lap time {lapTime} Total time {totalTime}   
        </li>
    );
}

export default Lap;
