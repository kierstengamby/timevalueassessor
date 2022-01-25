import React, { Component } from 'react';
import ValueCalcIndex from '../components/site/Values/ValueCalcIndex';
import TimeIndex from '../components/site/Time/TimeIndex';
import TasksIndex from '../components/site/Task/TasksIndex';
import Stopwatch from '../components/site/Stopwatch/Stopwatch';
import Homepage from '../components/site/Homepage/Homepage';


const Splash = (props) => {
    return (
        <div>
            <Homepage token={props.sessionToken} />
            <br /><br />
            <ValueCalcIndex token={props.sessionToken} tasks={props.tasks} time={props.time} />
            <br /><br /><br />
            <TimeIndex token={props.sessionToken} time={props.time} />
            <br /><br />
            <TasksIndex token={props.sessionToken} tasks={props.tasks} />
            <br />
            <Stopwatch token={props.sessionToken} />
        </div>
    )
}

export default Splash;