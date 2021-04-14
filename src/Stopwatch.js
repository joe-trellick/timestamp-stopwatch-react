import React from 'react';
import './Stopwatch.css';

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleLogTime = this.handleLogTime.bind(this);
        this.state = {running: false, log: '(hit start)', logEntries:[]};
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
        this.setState({log: '', logEntries: []});
    }

    addLogEntry(note) {
        let logString = this.createLogString(note);
        this.setState((state, props) => ({
            log: state.log += logString,
            logEntries: state.logEntries.concat([{timestamp: new Date(), note: note}])
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
                {this.state.logEntries.length > 0 &&
                    <div className="log">
                        <ul>
                            {this.state.logEntries.map(entry => (
                                <li key={entry.timestamp.toISOString()}>{`${entry.timestamp.toISOString()} ${entry.note}`}</li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

export default Stopwatch;