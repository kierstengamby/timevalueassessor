import React, { Component } from 'react';
import ValueCalcIndex from '../site/Values/ValueCalcIndex';
import TimeIndex from '../site/Time/TimeIndex';
import TasksIndex from '../site/Task/TasksIndex'

const Splash = (props) => {
    return (
        <div>
            <ValueCalcIndex token={props.sessionToken} />
            <TimeIndex token={props.sessionToken} />
            <TasksIndex token={props.sessionToken} />
        </div>
    )
}

export default Splash;