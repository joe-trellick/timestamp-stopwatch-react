import React from 'react';

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleLogTime = this.handleLogTime.bind(this);
        this.state = {running: false, log: 'brip'};
    }

    createLogString(note) {
        return `${new Date().toISOString()} ${note}\n`;
    }

    handleStart(e) {
        console.log('start');
        this.setState({running: true, log: this.createLogString('start')});
    }

    handleStop(e) {
        console.log('stop');
        this.setState({running: false});
    }

    handleLogTime(e) {
        console.log('log');
        let logString = this.createLogString('log');
        this.setState((state, props) => ({
            log: state.log += logString
        }));
    }

    render() {
        let firstButton;
        if (!this.state.running) {
            firstButton = <button onClick={this.handleStart}>Start</button>;
        } else {
            firstButton = <button onClick={this.handleLogTime}>Log Time</button>
        }

        return (
            <div id="stopwatch">
                <div id="buttons">
                    {firstButton}
                    <button onClick={this.handleStop}>Stop</button>
                </div>
                <textarea rows="5" cols="50" value={this.state.log} />
            </div>
        );
    }
}

export default Stopwatch;