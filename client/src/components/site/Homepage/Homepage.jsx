import React from 'react';
import './Homepage.css';
import { Container, Row, Col } from 'reactstrap';

const Homepage = () => {

    return (
        <Container className="mainDiv-container">
            <Col md="8.5">
            <div className='main'>
                <div className='mainDiv'>
                    <Row className="mainDiv-subtext">
                    <h3>Using the App</h3>
                    <h5>To begin, please take the following quiz to determine the value of a neutral hour of your time: <a href="https://programs.clearerthinking.org/what_is_your_time_really_worth_to_you.html" target="_blank">Value of Free Time Calculator</a>.</h5>
                    <h6>Please note: you do not need to enter your email address to view results.</h6>
                    <h5>When you have found the value of one hour of your free time, enter it in the Values Form along with your hourly wage. You can revisit this at any time if you feel the value of your free time has changed and update the values.</h5>
                    <h5>As you complete tasks throughout the span of a week, log the time in minutes using the Tasks Form. You can log multiple tasks at once, or do a separate log each time you complete a task.</h5>
                    <h5>A stopwatch is provided for your convenience as well.</h5> 
                    <h5>At the end of the week, select the Get Totals button under the Value Calculator to determine your average cost per hour for each task. Note: refresh the page prior to selecting the Get Totals button to ensure accurate calculations.</h5> 
                    <h5> Use this information to help you determine if, in relation to the value of a neutral hour of your time, it would be better to outsource a task or continue completing it yourself.</h5>
                    </Row>
                </div>
            </div>
            </Col>
        </Container>
    );
};

export default Homepage;