import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';


const ValuesCreate = (props) => {

    var valueCleaning = props.totalCleaning
    // console.log(valueCleaning);

    return(
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
                        <td>{valueCleaning}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                    </tr>
                </tbody>
            </Table>
        </Table>
    )
};

export default ValuesCreate