export function generateBrowserKey(browser) {
    return `saucelabs-${browser.name}-${browser.version}`;
}

export function generateBrowsersList(matchedBrowsers) {
    return matchedBrowsers.map(browser => generateBrowserKey(browser));
}

export function generateCustomLaunchers(matchedBrowsers) {
    return matchedBrowsers.reduce((result, browser) => {
        const browserKey = generateBrowserKey(browser);

        result[browserKey] = {
            browserName: browser.name,
            base: 'SauceLabs',
            version: String(browser.version)
        };

        return result;
    }, {});
}
