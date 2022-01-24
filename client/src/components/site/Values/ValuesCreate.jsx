import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';


const ValuesCreate = (props) => {

    let cleaningCalc = ((this.props.totalCleaning / 60) * (this.props.totalNeutralValue));
    let laundryCalc = ((this.props.totalLaundry / 60) * (this.props.totalNeutralValue));
    let mealPrepCalc = ((this.props.totalMealPrep / 60) * (this.props.totalNeutralValue));
    let petCareCalc = ((this.props.totalPetCare / 60) * (this.props.totalNeutralValue));
    let shoppingCalc = ((this.props.totalShopping / 60) * (this.props.totalNeutralValue));
    let carCareCalc = ((this.props.totalCarCare / 60) * (this.props.totalNeutralValue));
    let taxesCalc = ((this.props.totalTaxes / 60) * (this.props.totalNeutralValue));

    console.log(this.props.totalCleaning);

return (
    <Table>
        <h3>Values Calculator</h3>
        <hr />
        <Table striped>
            <thead>
                <tr>
                    <th></th>
                    <th>Cleaning</th>
                    <th>Laundry</th>
                    <th>Meal Prep</th>
                    <th>Pet Care</th>
                    <th>Shopping</th>
                    <th>Car Care</th>
                    <th>Taxes</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Values</th>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                    <td>{ }</td>
                </tr>
            </tbody>
        </Table>
    </Table>
)
};

export default ValuesCreate