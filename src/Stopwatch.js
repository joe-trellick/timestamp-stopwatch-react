import React from 'react';

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleLogTime = this.handleLogTime.bind(this);
        this.state = {running: false, log: ''};
    }

    handleStart(e) {
        console.log('start');
        this.setState({running: true});
    }

    handleStop(e) {
        console.log('stop');
        this.setState({running: false});
    }

    handleLogTime(e) {
        this.setState('log');
    }

    render() {
        return (
            <div id="buttons">
                <button onClick={this.handleStart}>Start</button>
                <button onClick={this.handleStop}>Stop</button>
            </div>
        );
    }
}

export default Stopwatch;