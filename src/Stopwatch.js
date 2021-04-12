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
        console.log('log');
    }

    render() {
        let firstButton;
        if (!this.state.running) {
            firstButton = <button onClick={this.handleStart}>Start</button>;
        } else {
            firstButton = <button onClick={this.handleLogTime}>Log Time</button>
        }

        return (
            <div id="buttons">
                {firstButton}
                <button onClick={this.handleStop}>Stop</button>
            </div>
        );
    }
}

export default Stopwatch;