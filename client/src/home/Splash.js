import React, { Component } from 'react';
import ValueCalcIndex from '../components/site/Values/ValueCalcIndex';
import TimeIndex from '../components/site/Time/TimeIndex';
import TasksIndex from '../components/site/Task/TasksIndex';
import Stopwatch from '../components/site/Stopwatch/Stopwatch';
import Homepage from '../components/site/Homepage/Homepage';
import { Container, Row, Col } from 'reactstrap';
import './splash.css';


const Splash = (props) => {
    return (
        <Container fluid>
            <Row id="span">
            <h1>Welcome to Your Time Value Calculator!</h1>
            </Row>
            <Row className="rows">
                <Col>
                <Homepage token={props.sessionToken} />
                </Col>
            </Row>
            <Row className="rows">
                <Col>
                <ValueCalcIndex token={props.sessionToken} tasks={props.tasks} time={props.time} />
                </Col>
            </Row>
            <Row className="rows">
                <Col>
                    <Stopwatch token={props.sessionToken} />
                </Col>
                <Col>
                    <TimeIndex token={props.sessionToken} time={props.time} />
                </Col>
            </Row>
            <Row className="rows">
                <TasksIndex token={props.sessionToken} tasks={props.tasks} />
            </Row>
        </Container>
    )
}

export default Splash;