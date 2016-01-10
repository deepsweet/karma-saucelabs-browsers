import fetchData from './fetch';
import processData from './process';
import matchQuery from './match';
import { generateBrowsersList, generateCustomLaunchers } from './generate';

function factory(config) {
    const data = fetchData();
    const browsers = processData(data);

    config.set(
        config.browsers.reduce((result, query) => {
            const matchedBrowsers = matchQuery(browsers, query);

            if (matchedBrowsers.length > 0) {
                const browsersList = generateBrowsersList(matchedBrowsers);
                const customLaunchers = generateCustomLaunchers(matchedBrowsers);

                result.browsers.push(
                    ...browsersList.filter(browser => {
                        return result.browsers.indexOf(browser) === -1;
                    })
                );

                result.customLaunchers = {
                    ...result.customLaunchers,
                    ...customLaunchers
                };
            } else {
                result.browsers.push(query);
            }

            return result;
        }, {
            browsers: [],
            customLaunchers: config.customLaunchers
        })
    );
}

factory.$inject = [ 'config' ];

export default {
    'framework:saucelabs-browsers': [ 'factory', factory ]
};
