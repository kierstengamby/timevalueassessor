import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class ValueCalcIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valueCalc:[]
        }
    }

    fetchValueCalc = () => {
        fetch("")
    }

    render() {
        return (
            <div>
                {/* Value Calculator Index */}
            </div>
        )
    }
}

export default ValueCalcIndex;