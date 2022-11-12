import React, { Component } from 'react';
import TimeBoard from '../TimeBoard';
import StartStopButton from '../StartStopButton';
import styles from './WatchController.module.css';
import LapList from '../LapsList/LapList';

const TIME_INCREMENT = 1000;

class WatchController extends Component {
    constructor() {
        super();
        this.state = {
            time : 0,
            isRunning : false,
            laps : [],
        };
        this.timeInterval = null;
    }
    tick = () => {
       this.setState((state) => ({
            ...state,
            time: state.time + 1,
        }));
    }
    
    componentDidUpdate() {
        console.log('WatchController DidUpdate');    
    }
    componentWillUnmount() {
        clearInterval(this.timeInterval);
    }
    
    startStop = () => {
        this.setState((state) => ({
            ...state,
            isRunning: !state.isRunning,
        }));
        if (this.state.isRunning) {
            clearInterval(this.timeInterval);    
        } else {
            this.timeInterval = setInterval(this.tick, TIME_INCREMENT);
        }   
    }

    reset = () => {
        clearInterval(this.timeInterval);
        const newState = {
            time : 0,
            isRunning : false,
            laps : [],
        };
        this.setState(newState);

    }

    addLapWithState = (state) => {
        const prevTotalTime = state.laps.length 
            ? state.laps[state.laps.length - 1].totalTime
            : 0;
        //Проблема 1: Если использовать state из callback, при остановленом таймере,
        //приходится обновлять не измененный state -> лишний рендер ???
        //Решение ? disable на кнопку Lap на этапе рендеринга

        //Проблема 2. Если перенести массив laps в состояние компонента LapList,
        // (чтоб не перерисовывать при нажатии на кнопку Lap весь компонент WatchController)
        // то как перерендерить LapList после обнуления Reset-ом

        //if (prevTotalTime === state.time) return [...state.laps];
        return [
            ...state.laps, 
            {
                id : state.laps.length + 1,
                lapTime: state.time - prevTotalTime,
                totalTime: state.time,
            }
        ];
    }

    addLap = () => {
        // const prevTotalTime = this.state.laps.length ?
        // this.state.laps[this.state.laps.length - 1].totalTime
        // : 0;
        // if (prevTotalTime === this.state.time) return;
        // const newLaps = [
        //     ...this.state.laps, 
        //     {
        //         id : this.state.laps.length + 1,
        //         lapTime: this.state.time - prevTotalTime,
        //         totalTime: this.state.time,
        //     }
        // ];
        // const newState = {
        //     ...this.state, 
        //     laps : newLaps,
        // };
        // this.setState(newState);

        //Используем state из callback и получаем проблему, см выше
        this.setState((state) => ({
            ...state,
            laps : this.addLapWithState(state),
        }));    
    }

    render() {
        const prevTotalTime = this.state.laps.length
        ? this.state.laps[this.state.laps.length - 1].totalTime
        : 0;
        return (
            <div className={styles.container}>
                <TimeBoard time={this.state.time} />
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
                        disabled={prevTotalTime === this.state.time && !this.state.isRunning}
                    /> 
                    
                </div>
                <LapList laps={this.state.laps}/>   
            </div>
        );
    }
}

export default WatchController;

// start = () => {
    //     if (this.state.isRunning) {
    //         clearInterval(this.timeInterval);    
    //     }
    //     const newState = {
    //         ...this.state, 
    //         time : 0,
    //         isRunning : true,
    //     };
    //     this.setState(newState);
    //     this.timeInterval = setInterval(this.tick, TIME_INCREMENT);   
    // }

    // stop = () => {
    //     if (this.state.isRunning) {
    //         clearInterval(this.timeInterval);    
    //         const newState = {
    //             ...this.state, 
    //             isRunning : false,
    //         };
    //         this.setState(newState);
    //     }   
    // }
