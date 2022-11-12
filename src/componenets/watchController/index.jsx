import React, { Component } from 'react';
import TimeBoard from '../TimeBoard';
import StartStopButton from '../StartStopButton';
import styles from './WatchController.module.css';

const TIME_INCREMENT = 1000;

class WatchController extends Component {
    constructor() {
        super();
        this.state = {
            time : 0,
            isRunning : false,
        };
        this.timeInterval = null;
    }
    tick = () => {
        const newState = {
            ...this.state, 
            time : this.state.time + 1,
        };
        this.setState(newState);
    }
    
    componentDidMount() {
        
    }
    componentWillUnmount() {
        clearInterval(this.timeInterval);
    }
    
    start = () => {
        if (this.state.isRunning) {
            clearInterval(this.timeInterval);    
        }
        const newState = {
            ...this.state, 
            time : 0,
            isRunning : true,
        };
        this.setState(newState);
        this.timeInterval = setInterval(this.tick, TIME_INCREMENT);   
    }

    stop = () => {
        if (this.state.isRunning) {
            clearInterval(this.timeInterval);    
            const newState = {
                ...this.state, 
                isRunning : false,
            };
            this.setState(newState);
        }   
    }

    render() {
        return (
            <div className={styles.container}>
                <TimeBoard time={this.state.time} />
                <div className={styles.btnContainer}>
                    <StartStopButton btnName='Start' onClick={this.start}/>
                    <StartStopButton btnName='Stop' onClick={this.stop}/>    
                </div>
                 
            </div>
        );
    }
}

export default WatchController;

// startStop = () => {
//        
//     const newState = {
//         ...this.state, 
//         isRunning : !this.state.isRunning,
//     };
//     this.setState(newState);
//     if (this.state.isRunning) {
//         clearInterval(this.timeInterval);    
//     } else {
//         this.timeInterval = setInterval(this.tick, TIME_INCREMENT);
//     }
    
// }