import React, { Component } from 'react';
import { Container, Row, Col, Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import ValuesCreate from './ValuesCreate';

class ValueCalcIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: this.props.tasks,
            totalCleaning: 0,
            totalLaundry: 0,
            totalMealPrep: 0,
            totalPetCare: 0,
            totalShopping: 0,
            totalCarCare: 0,
            totalTaxes: 0,
            cleaning: 0,
            laundry: 0,
            mealPrep: 0,
            petCare: 0,
            shopping: 0,
            carCare: 0,
            taxes: 0,
            time: this.props.time,
            hourlyWage: 0,
            neutralValue: 0,
            totalHourlyWage: 0,
            totalNeutralValue: 0,
            cleaningCalc: 0,
            laundryCalc: 0,
            mealPrepCalc: 0,
            petCareCalc: 0,
            shoppingCalc: 0,
            carCareCalc: 0,
            taxesCalc: 0
        }
    }

    // componentDidMount() {
    //     Promise.all([
    //         fetch('http://localhost:9000/tasks/').then
    //     ])
    // }

    async componentDidMount() {
        const response = await fetch('http://localhost:9000/tasks/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        });
        const json = await response.json();
        this.setState({ tasks: json })
        const array = json

        array.map((task, id) => {
            this.setState({ totalCleaning: this.state.totalCleaning += task.cleaning })
            this.state.totalLaundry += task.laundry
            this.state.totalMealPrep += task.mealPrep
            this.state.totalPetCare += task.petCare
            this.state.totalShopping += task.shopping
            this.state.totalCarCare += task.carCare
            this.state.totalTaxes += task.taxes
        })
    }

    async componentWillMount() {
        const response = await fetch('http://localhost:9000/timevalue/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            })
        });
        const jsonRes = await response.json();
        this.setState({ time: jsonRes })
        const arrayTime = jsonRes

        arrayTime.map((time, id) => {
            this.setState({ totalHourlyWage: this.state.totalHourlyWage += time.hourlyWage })
            this.state.totalNeutralValue += time.neutralValue
        })
    }

    valuesCalc = (event) => {
        event.preventDefault();
        this.setState({
            cleaningCalc: ((this.state.totalCleaning / 60) * (this.state.totalNeutralValue)),
            laundryCalc: ((this.state.totalLaundry / 60) * (this.state.totalNeutralValue)),
            mealPrepCalc: ((this.state.totalMealPrep / 60) * (this.state.totalNeutralValue)),
            petCareCalc: ((this.state.totalPetCare / 60) * (this.state.totalNeutralValue)),
            shoppingCalc: ((this.state.totalShopping / 60) * (this.state.totalNeutralValue)),
            carCareCalc: ((this.state.totalCarCare / 60) * (this.state.totalNeutralValue)),
            taxesCalc: ((this.state.totalTaxes / 60) * (this.state.totalNeutralValue))
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div>
                            <h3>Value Calculator</h3>
                        </div>
                    </Col>
                    <Col md="12">
                        <div>
                            <Form onSubmit={this.valuesCalc}>
                                <FormGroup>
                                    <Label for="cleaningCalc">Cleaning Calculation</Label>
                                    <Input id="cleaningCalc" type="text" name="cleaningCalc" value={this.state.cleaningCalc.toFixed(2)} onChange={this.handleChange}></Input>
                                    <Label for="laundryCalc">Laundry Calculation</Label>
                                    <Input id="laundryCalc" type="text" name="laundryCalc" value={this.state.laundryCalc.toFixed(2)} onChange={this.handleChange}></Input>
                                    <Label for="mealPrepCalc">Meal Prep Calculation</Label>
                                    <Input id="mealPrepCalc" type="text" name="mealPrepCalc" value={this.state.mealPrepCalc.toFixed(2)} onChange={this.handleChange}></Input>
                                    <Label for="petCareCalc">Pet Care Calculation</Label>
                                    <Input id="petCareCalc" type="text" name="petCareCalc" value={this.state.petCareCalc.toFixed(2)} onChange={this.handleChange}></Input>
                                    <Label for="shoppingCalc">Shopping Calculation</Label>
                                    <Input id="shoppingCalc" type="text" name="shoppingCalc" value={this.state.shoppingCalc.toFixed(2)} onChange={this.handleChange}></Input>
                                    <Label for="carCareCalc">Car Care Calculation</Label>
                                    <Input id="carCareCalc" type="text" name="carCareCalc" value={this.state.carCareCalc.toFixed(2)} onChange={this.handleChange}></Input>
                                    <Label for="taxesCalc">Taxes Calculation</Label>
                                    <Input id="taxesCalc" type="text" name="taxesCalc" value={this.state.taxesCalc.toFixed(2)} onChange={this.handleChange}></Input>
                                </FormGroup>
                                <Button type="submit" color="primary">Get Totals</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ValueCalcIndex;