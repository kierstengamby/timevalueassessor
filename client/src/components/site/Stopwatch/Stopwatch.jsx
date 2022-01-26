import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Stopwatch.css';

function Stopwatch() {

    const [time, setTime] = useState(0)
    const [start, setStart] = useState(false)

    useEffect(() => {
        let interval = null;

        if (start) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval)
    }, [start])

    return (
        <Container className="stopwatch-container">
            <Row className="stopwatch-row">
                <div className="Stopwatch">
                    <br />
                    <h1 className="Stopwatch">Stopwatch</h1>
                    <hr />
                    <h1 className="Stopwatch">
                        <span className="Stopwatch">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span className="Stopwatch">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                        <span className="Stopwatch">{("0" + (time / 10) % 1000).slice(-2)}</span>
                    </h1>
                    <div className="Stopwatch">
                        <button className="Stopwatch" onClick={() => setStart(true)}>Start</button>
                        <button className="Stopwatch" onClick={() => setStart(false)}>Stop</button>
                        <button className="Stopwatch" onClick={() => { setTime(0); setStart(false); }}>Reset</button>
                    </div>
                    <br />
                    <br />
                </div>
            </Row>
        </Container>
    );
}

export default Stopwatch;