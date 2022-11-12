import React from 'react';
import styles from './TimeBoard.module.css';

const TimeBoard = (props) => {
    const {time} = props;
        
    return (
        <div className={styles.board}>
           {time} 
        </div>
    );
}

export default TimeBoard;
