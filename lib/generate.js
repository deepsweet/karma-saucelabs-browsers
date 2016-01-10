export function generateBrowserKey(browser) {
    return `saucelabs-${browser.name}-${browser.version}`;
}

/*
    generate browsers list for karma config:
    [ { name: "Firefox", version: 45 } ] -> [ "saucelabs-firefox-45" ]
*/
export function generateBrowsersList(matchedBrowsers) {
    return matchedBrowsers.map(browser => generateBrowserKey(browser));
}

/*
    generate custom launchers for karma config:
    [ { name: "Firefox", version: 45 } ] ->
    {
        "saucelabs-firefox-45": {
            browserName: "firefox",
            base: "SauceLabs",
            version: "45"
        }
    }
*/
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
