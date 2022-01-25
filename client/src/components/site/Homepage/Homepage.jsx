import React from 'react';
import './Homepage.css';

const Homepage = () => {

    return (

        <div className='main'>
            <div className='mainDiv'>
                <h1>Welcome to Your Time Value Calculator!</h1>
                <br />
                <br />
                <h5>To begin, please take the following quiz to determine the value of a neutral hour of your time: <a href="https://programs.clearerthinking.org/what_is_your_time_really_worth_to_you.html" target="_blank">Value of Free Time Calculator</a>.</h5>
                <h6>Please note: you do not need to enter your email address to view results.</h6>
                <br />
                <h5>When you have found the value of one hour of your free time, enter it in the Values Form along with your hourly wage. <br /> You can revisit this at any time if you feel the value of your free time has changed and update the values. <br /> <br />As you complete tasks throughout the span of a week, log the time in minutes using the Tasks Form. <br /> You can log multiple tasks at once, or do a separate log each time you complete a task. <br /> A stopwatch is provided for your convenience as well.<br /> <br /> At the end of the week, select the Get Totals button under the Value Calculator to determine your average cost per hour for each task. <br /> Use this information to help you determine if, in relation to the value of a neutral hour of your time, <br /> it would be better to outsource a task or continue completing it yourself. <br /> <br /> </h5>
                <hr />
            </div>
        </div>
    );
};

export default Homepage;