import React from 'react';

const Homepage = () => {

    return(

        <div className = 'main'>
            <div className = 'mainDiv'>
                <h1>Welcome to Your Value Time Calculator!</h1>
                <br/>
                <p>
                    To begin, please take the following quiz to determine the value of a neutral hour of your time: <a href="https://programs.clearerthinking.org/what_is_your_time_really_worth_to_you.html" target="_blank">Value of Free Time Calculator</a>. Please note: you do not need to enter your email address to view results. When you have found the value of one hour of your free time, enter it in the below form along with your hourly wage. You can revisit this at any time if you feel the value of your free time has changed and update the values.
                </p>
            </div>
        </div>
    );
};

export default Homepage;