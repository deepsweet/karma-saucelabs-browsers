import fetchData from './fetch';
import processData from './process';
import matchQuery from './match';
import { generateBrowsersList, generateCustomLaunchers } from './generate';

function factory(config) {
    const data = fetchData();
    const browsers = processData(data);

    config.browsers.forEach(query => {
        const matchedBrowsers = matchQuery(browsers, query);
        const browsersList = generateBrowsersList(matchedBrowsers);
        const customLaunchers = generateCustomLaunchers(matchedBrowsers);


        browsersList
            .filter(key => config.browsers.indexOf(key) === -1)
            .map(key => {
                config.set({
                    browsers: config.browsers
                                .concat(key)
                });
            });

        config.set({
            customLaunchers: {
                ...config.customLaunchers,
                ...customLaunchers
            }
        });
    });

    console.log(config);
}

factory.$inject = [ 'config' ];

export default {
    'framework:saucelabs-browsers': [ 'factory', factory ]
};
