import React from 'react';
import './Stopwatch.css';
import CopyIcon from './Copy.png';

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleLogTime = this.handleLogTime.bind(this);
        this.handleCopy = this.handleCopy.bind(this);

        this.copyTextAreaRef = React.createRef();

        this.state = {running: false, log: '(hit start)', logEntries:[]};
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
        console.log('timestamp');
        this.addLogEntry('timestamp');
    }

    handleCopy(e) {
        this.setState((state, props) => ({
            log: state.logEntries.map(entry => `${entry.timestamp.toISOString()} ${entry.note}`).join('\n')
        }), () => {
            this.copyTextAreaRef.current.select();
            document.execCommand('copy');
            console.log(`Copied to clipboard:\n${this.state.log}`);
        });
    }

    clearLog() {
        this.setState({log: '', logEntries: []});
    }

    selectAllText(e) {
        e.target.select();
    }

    pad(number, size) {
        let s = String(number);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    }

    formatTimestamp(date) {
        return `${date.getHours()}:${this.pad(date.getMinutes())}:${this.pad(date.getSeconds())}.${this.pad(date.getMilliseconds(), 3)}`
    }

    addLogEntry(note) {
        this.setState((state, props) => ({
            logEntries: state.logEntries.concat([{timestamp: new Date(), note: note}])
        }));
    }

    render() {
        let firstButton;
        if (!this.state.running) {
            firstButton = <button onClick={this.handleStart}><span className="label">Start</span></button>;
        } else {
            firstButton = <button onClick={this.handleLogTime}><span className="label">Timestamp</span></button>
        }

        return (
            <div id="stopwatch">
                <div id="buttons">
                    {firstButton}
                    <button onClick={this.handleStop}><span className="label">Stop</span></button>
                    <button onClick={this.handleCopy}><img src={CopyIcon} alt=""/><span className="label">Copy Log</span></button>
                </div>
                <textarea rows="5" cols="30" value={this.state.log} ref={this.copyTextAreaRef} readOnly/>
                {this.state.logEntries.length > 0 &&
                    <div className="log">
                        <ul>
                            {this.state.logEntries.map((entry, index) => (
                                <li key={entry.timestamp.toISOString()} className="logentry">
                                    <span class="timestamp">{this.formatTimestamp(entry.timestamp)} </span>
                                    <input className="loginput" type="text" value={entry.note}
                                        onClick={this.selectAllText} onChange={ e => {
                                        let logEntries = this.state.logEntries;
                                        logEntries[index].note = e.target.value;
                                        this.setState({logEntries: logEntries});
                                    }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

export default Stopwatch;