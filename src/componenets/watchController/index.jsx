import React, { Component } from 'react';
import TimeBoard from '../TimeBoard';
import StartStopButton from '../StartStopButton';
import styles from './WatchController.module.css';
import LapList from '../LapsList/LapList';

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
    tick = () => {
       this.setState((state) => ({
            ...state,
            //time: state.time + 1,
            currentTime: Date.now(),
        }));
        //debugger;
    }
    componentDidMount() {
        this.startStop();
        //removed strict mode in App
    }
    componentDidUpdate(prevState, currentState) {
        //console.log('WatchController DidUpdate');
        //console.log(prevState);
        //debugger;    
    }
    componentWillUnmount() {
        clearInterval(this.timeInterval);
    }
    
    startStop = () => {
        
        if (this.state.isRunning) {
            clearInterval(this.timeInterval);    
        } 
        else {
            this.timeInterval = setInterval(this.tick, TIME_TICK_INTERVAL);
        };

        
        //debugger;
        this.setState((state) => {
            const now = Date.now();
            //if (!state.isRunning) {debugger}
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
        //Используем state из callback и получаем проблему, см ниже
        //const now = this.state.isRunning ? Date.now() : this.state.currentTime;
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
            
            //Проблема 1: Если использовать state из callback, при остановленом таймере,
            //приходится обновлять не измененный state -> лишний рендер ???
            //Решение ? disable на кнопку Lap на этапе рендеринга при остановке таймера

            //Проблема 2. Если перенести массив laps в состояние компонента LapList,
            // (чтоб не перерисовывать при нажатии на кнопку Lap весь компонент WatchController)
            // то как перерендерить LapList после обнуления Reset-ом
        }));    
    }

    render() {
        //const prevTotalTime = this.state.laps.length
        //? this.state.laps[this.state.laps.length - 1].totalTime
        //: 0;
        //debugger;
        return (
            <div className={styles.container}>
                <TimeBoard time={this.state.currentTime - this.state.startTimerTime + this.state.workingTimerTime} />
                <div className={styles.btnContainer}>
                    {/*<StartStopButton btnName='Start' onClick={this.start}/>*/}
                    {/*<StartStopButton btnName='Stop' onClick={this.stop}/>*/} 
                    <StartStopButton 
                        btnName={this.state.isRunning ? 'Stop' : 'Start'} 
                        onClick={this.startStop}
                    />
                    <StartStopButton 
                        btnName='Reset' 
                        onClick={this.reset}
                    />
                    <StartStopButton 
                        btnName='Lap' 
                        onClick={this.addLap}
                        disabled={!this.state.isRunning}
                    /> 
                    
                </div>
                <LapList laps={this.state.laps}/>   
            </div>
        );
    }
}

export default WatchController;