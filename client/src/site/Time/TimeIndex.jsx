import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TimeCreate from './TimeCreate';

class TimeIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time:[]
        }
    }

    fetchTime = () => {
        fetch("http://localhost:9000/timevalue/", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
        .then((logData) => {
            return this.setState({ time: logData })
        })
    }

    componentDidMount() {
        this.fetchTime()
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="3">
                        <TimeCreate token={this.props.token} updateTimeArray={this.fetchTime} />
                    </Col>
                    <Col md="9">
                        <h2>Log your time to see table</h2>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TimeIndex;