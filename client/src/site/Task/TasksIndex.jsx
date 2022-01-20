import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TasksCreate from './TasksCreate';
import TasksEdit from './TasksEdit';
import TasksTable from './TasksTable';

class TasksIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks:[],
            updatePressed: false,
            taskstoUpdate: {}
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

    componentDidMount() {
        this.fetchTasks()
    }

    tasksDelete = (event) => {
        fetch(`http://localhost:9000/tasks/${event.target.id}`, {
            method: 'DELETE',
            body: JSON.stringify({ task: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => this.fetchTasks())
    }

    tasksUpdate = (event, task) => {
        // const { id, cleaning, laundry, mealPrep, petCare, shopping, carCare, taxes } = tasksObj
        fetch(`http://localhost:9000/tasks/${task.id}`, {
            method: 'PUT',
            body: JSON.stringify({ task }),
                // tasks: { cleaning, laundry, mealPrep, petCare, shopping, carCare, taxes } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => {
            this.setState({ updatePressed: false })
            this.fetchTasks();
        })
    }

    setUpdatedTask = (event, task) => {
        this.setState({
            tasksToUpdate: task,
            updatePressed: true
        })
    }

    render() {
        const tasks = this.state.tasks.length >=1 ? <TasksTable tasks={this.state.tasks} delete={this.tasksDelete} update={this.setUpdatedTask} /> : <h2>Log your tasks to see table</h2>
        return (
            <Container>
                <Row>
                    <Col md="3">
                        <TasksCreate token={this.props.token} updateTasksArray={this.fetchTasks} />
                    </Col>
                    <Col md="9">
                        {tasks}
                    </Col>
                    <Col md="12">
                        { this.state.updatePressed ? <TasksEdit t={this.state.updatePressed} update={this.tasksUpdate} tasks={this.state.tasksToUpdate} /> : <div></div> }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TasksIndex;