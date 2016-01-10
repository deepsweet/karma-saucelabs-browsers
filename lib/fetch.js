import request from 'sync-request';

const APIEndpoint = 'https://saucelabs.com/rest/v1/info/browsers/webdriver';

export default function() {
    return JSON.parse(
        request('GET', APIEndpoint).getBody('utf8')
    );
}
