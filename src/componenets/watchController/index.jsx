import React, { Component } from 'react';
import TimeBoard from '../TimeBoard';
import StartStopButton from '../StartStopButton';
import styles from './WatchController.module.css';
import LapList from '../LapsList/LapList';

const timerMethodEnum = {
    setTimeout : 'setTimeout',
    setInterval : 'setInterval',
}
const TIMER_METHOD = timerMethodEnum.setTimeout; //setInterval

const TIME_TICK_INTERVAL = 1000;


const initialState = {
    startTimerTime: 0,
    workingTimerTime: 0,
    startLapTime: 0,
    currentTime : 0,
    isRunning : false,
    laps : [],
};

class WatchController extends Component {
    constructor() {
        super();
        this.state = initialState;
        this.timeInterval = null;
    }
    
    componentDidMount() {
        this.startStop();
        //better to remove strict mode
    }

    componentDidUpdate() {
        if (TIMER_METHOD === 'setTimeout') {
            this.timeInterval = this.state.isRunning 
                && setTimeout(this.tick, TIME_TICK_INTERVAL);
        }
    }
    
    componentWillUnmount() {
        clearInterval(this.timeInterval);
    }
    
    tick = () => {
        this.setState((state) => ({
             ...state,
             //time: state.time + 1,
             currentTime: Date.now(),
         }));
         //debugger;
    }
     
    startStop = () => { 
        if (this.state.isRunning) {
            clearInterval(this.timeInterval);    
        } else {
            this.timeInterval = TIMER_METHOD === 'setInterval' 
                && setInterval(this.tick, TIME_TICK_INTERVAL);
        };
        
        //debugger;
        this.setState((state) => {
            const now = Date.now();
            return {
                ...state,
                currentTime : state.isRunning ? state.currentTime : now ,
                startTimerTime : state.isRunning ? state.startTimerTime : now,
                workingTimerTime: !state.isRunning 
                     ? state.workingTimerTime + state.currentTime - state.startTimerTime 
                     : state.workingTimerTime,
                startLapTime : state.isRunning ? state.startLapTime : now,
                isRunning : !state.isRunning,
            }
        });    
    }

    reset = () => {
        clearInterval(this.timeInterval);
        this.setState(initialState);
    }

    addLap = () => {
        const now = Date.now();
        this.setState((state) => ({
            ...state,
            laps : [
                ...state.laps, 
                {
                    id : state.laps.length + 1,
                    lapTime: now - state.startLapTime,
                    totalTime: now,
                }
            ],
            startLapTime : now,
        }));    
    }

    render() {
        //debugger;
        const {currentTime, startTimerTime, workingTimerTime, isRunning, laps} = this.state;
        return (
            <div className={styles.container}>
                <TimeBoard time={currentTime - startTimerTime + workingTimerTime} />
                <div className={styles.btnContainer}>
                    <StartStopButton 
                        btnName={isRunning ? 'Stop' : 'Start'} 
                        onClick={this.startStop}
                    />
                    <StartStopButton 
                        btnName='Reset' 
                        onClick={this.reset}
                    />
                    <StartStopButton 
                        btnName='Lap' 
                        onClick={this.addLap}
                        disabled={!isRunning}
                    />      
                </div>
                <LapList laps={laps}/>   
            </div>
        );
    }
}

export default WatchController;