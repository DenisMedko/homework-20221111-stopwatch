import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import styles from './TimeBoard.module.css';

const TimeBoard = (props) => {
    const {time} = props;
    //const timeUTC = new Date(Date.UTC(time)); format="YYYY/MM/DD HH : mm : ss"   
    return (
        <div className={styles.board}>
            <Moment format="HH : mm : ss" unix tz="Etc/Greenwich" >{time/1000}</Moment>    
        </div>
    );
}

export default TimeBoard;
