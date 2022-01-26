import React, { Component } from 'react';
import { Container, Row, Col, Table, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './time.css';
import APIURL from '../../../helpers/environment';

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
        const response = await fetch(`${APIURL}/timevalue/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        });
        const json = await response.json();
        this.setState({ time: json })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/timevalue/time`, {
            method: 'POST',
            body: JSON.stringify({ time: { hourlyWage: this.state.newHourlyWage, neutralValue: this.state.newNeutralValue } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        }).then((res) => res.json())
            .then((timeData) => {
                let tempTime = this.state.time
                tempTime.push({ id: timeData.time.id, hourlyWage: this.state.newHourlyWage, neutralValue: this.state.newNeutralValue })
                this.setState({ time: tempTime })
                this.setState({ totalHourlyWage: this.state.totalHourlyWage + parseInt(this.state.newHourlyWage) })
                this.setState({ totalNeutralValue: this.state.totalNeutralValue + parseInt(this.state.newNeutralValue) })
                this.setState({
                    hourlyWage: 0,
                    neutralValue: 0
                })
            });
    }

    timeDelete = (event) => {
        fetch(`${APIURL}/timevalue/${event.target.id}`, {
            method: 'DELETE',
            body: JSON.stringify({ timevalue: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
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
                this.setState({ 
                    newHourlyWage: 0, 
                    newNeutralValue: 0
                })
            })
    }


    timeUpdate = (event, timeId) => {
        fetch(`${APIURL}/timevalue/${timeId}`, {
            method: 'PUT',
            body: JSON.stringify({ time: { hourlyWage: parseInt(this.state.updateHourlyWage), neutralValue: this.state.updateNeutralValue } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        }).then((res) => {
            const self = this
            self.setState({ updatePressed: false })
            let tempTime = this.state.time.filter(function (time) {
                return time.id !== self.state.timeToUpdate.id
            })
            tempTime.push({ id: timeId, hourlyWage: this.state.updateHourlyWage, neutralValue: this.state.updateNeutralValue })
            this.setState({ time: tempTime })
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
        let valueLogged = this.state.time.length;
        console.log(valueLogged);

        const showLogger = () => {
            if (valueLogged !== 1) {
                return (
                    <Container fluid>
                        <Row className="time-row">
                            <Col>
                                <div className="time-row">
                                    <hr />
                                    <h3>Log Values</h3>
                                    <h6>Round each number to the nearest whole number</h6>
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
                                        <Button type="submit" color="secondary"> Submit </Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )
            } else if (valueLogged === 1) {
                return (
                    <Container fluid>
                        <Row className="time-row">
                            <Col>
                                <div className="time-row">
                                    <hr />
                                    <h3>Your Values</h3>
                                    <hr />
                                    <Table striped>
                                        <thead>
                                            <tr>
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
                                                            <td>{time.hourlyWage}</td>
                                                            <td>{time.neutralValue}</td>
                                                            <td>
                                                                <Button id={time.id} onClick={e => this.setUpdatedTime(e, time)} color="outline-light">Update</Button>
                                                                <Button id={time.id} onClick={this.timeDelete} color="outline-secondary">Delete</Button>
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
                                <div>
                                    <Modal isOpen={this.state.updatePressed} size="lg" centered>
                                        <ModalHeader >Log Values</ModalHeader>
                                        <ModalBody>
                                            <h6>Round each number to the nearest whole number</h6>
                                            <Form onSubmit={this.handleUpdateSubmit} >
                                                <FormGroup>
                                                    <Label for="hourlyWage">Hourly Wage</Label>
                                                    <Input id="hourlyWage" type="text" name="updateHourlyWage" value={this.state.updateHourlyWage} placeholder="Enter hourly wage" onChange={this.handleUpdateChange} />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="neutralValue">Neutral Value</Label>
                                                    <Input id="neutralValue" type="text" name="updateNeutralValue" value={this.state.updateNeutralValue} placeholder="Enter your neutral hourly value" onChange={this.handleUpdateChange} />
                                                </FormGroup>
                                                <Button type="submit" color="secondary"> Submit </Button>
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

        return (
            <div>
                {showLogger()}
            </div>
        )
    }
}

export default TimeIndex;