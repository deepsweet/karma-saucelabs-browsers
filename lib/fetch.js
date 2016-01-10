import request from 'sync-request';

const APIEndpoint = 'https://saucelabs.com/rest/v1/info/browsers/webdriver';

// https://github.com/karma-runner/karma/issues/851 :(
export default function() {
    return JSON.parse(
        request('GET', APIEndpoint).getBody('utf8')
    );
}
