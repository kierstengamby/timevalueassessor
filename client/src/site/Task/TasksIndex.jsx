import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class TasksIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks:[]
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
        .then((logData) => {
            return this.setState({ tasks: logData })
        })
    }

    componentDidMount() {
        this.fetchTasks()
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="3">
                        {/* create component */}
                    </Col>
                    <Col md="9">
                        <h2>Log your tasks to see table</h2>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TasksIndex;