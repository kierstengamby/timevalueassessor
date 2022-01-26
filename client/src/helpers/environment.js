let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:9000';
        break;
    case 'time-value-assessor-client.herokuapp.com':
        APIURL = 'https://time-value-assessor.herokuapp.com';
        break;
}

export default APIURL;