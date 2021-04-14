import React from 'react';

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleLogTime = this.handleLogTime.bind(this);
        this.state = {running: false, log: '(hit start)'};
    }

    createLogString(note) {
        return `${new Date().toISOString()} ${note}\n`;
    }

    handleStart(e) {
        console.log('start');
        this.clearLog();
        this.addLogEntry('start');
        this.setState({running: true});
    }

    handleStop(e) {
        console.log('stop');
        this.addLogEntry('stop');
        this.setState({running: false});
    }

    handleLogTime(e) {
        console.log('log');
        this.addLogEntry('log');
    }

    clearLog() {
        this.setState({log: ''});
    }

    addLogEntry(note) {
        let logString = this.createLogString(note);
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