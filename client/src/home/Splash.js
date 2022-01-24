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
            <Stopwatch token={props.sessionToken} />
            <ValueCalcIndex token={props.sessionToken} tasks={props.tasks} time={props.time} />
            <TimeIndex token={props.sessionToken} time={props.time} />
            <TasksIndex token={props.sessionToken} tasks={props.tasks} />
        </div>
    )
}

export default Splash;