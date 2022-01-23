import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ValuesCreate from './ValuesCreate';
import TasksIndex from '../Task/TasksIndex';
import TimeIndex from '../Time/TimeIndex';

class ValueCalcIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            time: [],
            valueCalc:[]
        }
    }

    fetchTasks = () => {
        fetch("http://localhost:9000/tasks/", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
        .then((tasksData) => {
            return this.setState({ tasks: tasksData })
        })
    }

    fetchTime = () => {
        fetch("http://localhost:9000/timevalue/", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
        .then((timeData) => {
            return this.setState({ time: timeData })
        })
    }

    componentDidMount() {
        this.fetchTasks();
        this.fetchTime();
    }

    render() {
        return (
            <div>
                <ValuesCreate token={this.props.token} />
            </div>
        )
    }
}

export default ValueCalcIndex;