import React, { Component } from 'react';
import { Container, Row, Col, Table, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
// import TasksIndex from '../Task/TasksIndex';
// import TimeCreate from './TimeCreate';
// import TimeEdit from './TimeEdit';
// import TimeTable from './TimeTable';

class TimeIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: this.props.time,
            updatePressed: false,
            timeToUpdate: this.props.time,
            hourlyWage: 0,
            neutralValue: 0,
            totalHourlyWage: 0,
            totalNeutralValue: 0,
            newNeutralValue: 0,
            newHourlyWage: 0,
            updateHourlyWage: 0,
            updateNeutralValue: 0
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async componentDidMount() {
        // this.fetchTime()
        const response = await fetch('http://localhost:9000/timevalue/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        });
        const json = await response.json();
        this.setState({ time: json })
        // const array = json
        // console.log('time component mounting');
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:9000/timevalue/time`, {
            method: 'POST',
            body: JSON.stringify({ time: { hourlyWage: this.state.newHourlyWage, neutralValue: this.state.newNeutralValue } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
            .then((timeData) => {
                let tempTime = this.state.time
                tempTime.push({ hourlyWage: this.state.newHourlyWage, neutralValue: this.state.newNeutralValue })
                this.setState({ time: tempTime })
                this.setState({ totalHourlyWage: this.state.totalHourlyWage + parseInt(this.state.newHourlyWage) })
                this.setState({ totalNeutralValue: this.state.totalNeutralValue + parseInt(this.state.newNeutralValue) })
                // this.props.updateTimeArray(); 
                this.setState({
                    // id: '',
                    hourlyWage: 0,
                    neutralValue: 0
                })
            });
    }

    timeDelete = (event) => {
        fetch(`http://localhost:9000/timevalue/${event.target.id}`, {
            method: 'DELETE',
            body: JSON.stringify({ timevalue: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => {
                let tempTime = this.state.time.filter(function (time) {
                    return time.id !== event.target.id
                })
                let timeToRemove = this.state.time.find(function (time) {
                    return time.id === event.target.id
                })
                this.setState({ time: tempTime })
                this.setState({ totalHourlyWage: this.state.totalHourlyWage - parseInt(timeToRemove.hourlyWage) })
                this.setState({ totalNeutralValue: this.state.totalNeutralValue - parseInt(timeToRemove.neutralValue) })
            })
    }


    timeUpdate = (event, timeId) => {
        // const { id, hourlyWage, neutralValue } = timeObj
        // console.log(id, hourlyWage, neutralValue, timeObj);
        fetch(`http://localhost:9000/timevalue/${timeId}`, {
            method: 'PUT',
            body: JSON.stringify({ time: { hourlyWage: parseInt(this.state.updateHourlyWage), neutralValue: this.state.updateNeutralValue } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => {
            const self = this
            self.setState({ updatePressed: false })
            let tempTime = this.state.time.filter(function (time) {
                return time.id !== self.state.timeToUpdate.id
            })
            tempTime.push({ hourlyWage: this.state.updateHourlyWage, neutralValue: this.state.updateNeutralValue })
            // this.fetchTime();
            this.setState({ time: tempTime })
            // this.setState({ totalHourlyWage: this.state.totalHourlyWage - parseInt(this.state.timeToUpdate.hourlyWage) + parseInt(this.state.updateHourlyWage) })
            // this.setState({ totalNeutralValue: this.state.totalNeutralValue - parseInt(this.state.timeToUpdate.neutralValue) + parseInt(this.state.updateNeutralValue) })
            // this.setState({
            //     hourlyWage: this.time
            // })
        }).catch((err) => console.log(`${err}`))
    }

    setUpdatedTime = (event, time) => {
        this.setState({
            timeToUpdate: time,
            updatePressed: true,
            updateHourlyWage: time.hourlyWage,
            updateNeutralValue: time.neutralValue
        })
    }

    handleUpdateChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleUpdateSubmit = (event) => {
        event.preventDefault();
        this.timeUpdate(event, this.state.timeToUpdate.id)
        console.log('submit pressed');
        console.log(this.state.timeToUpdate.id);
    }

    render() {
        // const timevalue = this.state.time.length >= 1 ? <TimeTable timevalue={this.state.time} delete={this.timeDelete} update={this.setUpdatedTime} /> : <h2>Log your time to see table</h2>
        return (
            <Container>
                <Row>
                    <Col md="3">
                        <div>
                            <h3>Log Time</h3>
                            <hr />
                            <Form onSubmit={this.handleSubmit} >
                                <FormGroup>
                                    <Label for="hourlyWage">Hourly Wage</Label>
                                    <Input id="hourlyWage" type="text" name="newHourlyWage" value={this.state.newHourlyWage} placeholder="Enter hourly wage" onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="neutralValue">Neutral Value</Label>
                                    <Input id="neutralValue" type="text" name="newNeutralValue" value={this.state.newNeutralValue} placeholder="Enter your neutral hourly value" onChange={this.handleChange} />
                                </FormGroup>
                                <Button type="submit" color="primary"> Submit </Button>
                            </Form>
                        </div>
                        {/* <TimeCreate token={this.props.token} updateTimeArray={this.fetchTime} /> */}
                    </Col>
                    <Col md="9">
                        {/* {timevalue} */}
                        <div>
                            <h3>Time History</h3>
                            <hr />
                            <Table striped>
                                <thead>
                                    <tr>
                                        {/* <th>#</th> */}
                                        <th>Hourly Wage</th>
                                        <th>Neutral Value</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.time.map((time, id) => {
                                            return (
                                                <tr key={id}>
                                                    {/* <th scope="row">{time.id}</th> */}
                                                    <td>{time.hourlyWage}</td>
                                                    <td>{time.neutralValue}</td>
                                                    <td>
                                                        <Button id={time.id} onClick={this.timeDelete} color="danger">Delete</Button>
                                                        <Button id={time.id} onClick={e => this.setUpdatedTime(e, time)} color="warning">Update</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col md="12">
                        {/* { this.state.updatePressed ? <TimeEdit t={this.state.updatePressed} update={this.timeUpdate} timevalue={this.state.timeToUpdate} /> : <div></div> } */}
                        <div>
                            <Modal isOpen={this.state.updatePressed} >
                                <ModalHeader >Log Time</ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={this.handleUpdateSubmit} >
                                        <FormGroup>
                                            <Label for="hourlyWage">Hourly Wage</Label>
                                            <Input id="hourlyWage" type="text" name="updateHourlyWage" value={this.state.updateHourlyWage} placeholder="Enter hourly wage" onChange={this.handleUpdateChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="neutralValue">Neutral Value</Label>
                                            <Input id="neutralValue" type="text" name="updateNeutralValue" value={this.state.updateNeutralValue} placeholder="Enter your neutral hourly value" onChange={this.handleUpdateChange} />
                                        </FormGroup>
                                        <Button type="submit" color="primary"> Submit </Button>
                                    </Form>
                                </ModalBody>
                            </Modal>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default TimeIndex;