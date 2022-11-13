import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import styles from './Lap.module.css';
const Lap = (props) => {
    const {id, lapTime, totalTime} = props.lap;
    return (
        <li className={styles.lapLi}>
        Lap # {id} Lap time <Moment unix tz="Etc/Greenwich" format="HH : mm : ss">{lapTime/1000}
        </Moment> Local time <Moment unix format="YYYY/MM/DD HH : mm : ss">{totalTime/1000}</Moment>   
        </li>
    );
}

export default Lap;
