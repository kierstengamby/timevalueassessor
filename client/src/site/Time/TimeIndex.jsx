import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TimeCreate from './TimeCreate';
import TimeEdit from './TimeEdit';
import TimeTable from './TimeTable';

class TimeIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time:[],
            updatePressed: false,
            timeToUpdate: {}
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
        .then((timeData) => {
            return this.setState({ time: timeData })
        })
    }

    componentDidMount() {
        this.fetchTime()
    }

    timeDelete = (event) => {
        fetch(`http://localhost:9000/timevalue/${event.target.id}`, {
            method: 'DELETE',
            body: JSON.stringify({ timevalue: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => this.fetchTime())
    }

    timeUpdate = (event, time) => {
        fetch(`http://localhost:9000/timevalue/${event.target.id}`, {
            method: 'PUT',
            body: JSON.stringify({ timevalue: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => {
            this.setState({ updatePressed: false })
            this.fetchTime();
        })
    }

    setUpdatedTime = (event, time) => {
        this.setState({
            timeToUpdate: time,
            updatePressed: true
        })
    }

    render() {
        const timevalue = this.state.time.length >= 1 ? <TimeTable timevalue={this.state.time} delete={this.timeDelete} update={this.setUpdatedTime} /> : <h2>Log your time to see table</h2>
        return (
            <Container>
                <Row>
                    <Col md="3">
                        <TimeCreate token={this.props.token} updateTimeArray={this.fetchTime} />
                    </Col>
                    <Col md="9">
                        {timevalue}
                    </Col>
                    <Col md="12">
                        { this.state.updatePressed ? <TimeEdit t={this.state.updatePressed} update={this.timeUpdate} time={this.state.timeToUpdate} /> : <div></div> }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TimeIndex;