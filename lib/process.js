import { normalizeVersion } from './normalize';

/*
    convert raw saucelabs data into structured object:
    {
        firefox: {
            stable: [ 4, 5, 6 ],
            unstable: [ 'beta', 'dev' ]
        },
        'internet explorer': {
            stable: [ 8, 9, 10 ],
            unstable: [ ]
        }
    }
*/
export default function(data) {
    const browsers = data.reduce((result, item) => {
        const name = item.api_name;
        const version = normalizeVersion(item.short_version);

        result[name] = result[name] || {
            stable: [],
            unstable: []
        };

        // filter for stable numeric version
        if (typeof version === 'number' && result[name].stable.indexOf(version) === -1) {
            result[name].stable.push(version);
        // filter for unstable string version
        } else if (typeof version === 'string' && result[name].unstable.indexOf(version) === -1) {
            result[name].unstable.push(version);
        }

        return result;
    }, {});

    Object.keys(browsers).forEach(name => {
        // sort stable versions ascending
        browsers[name].stable = browsers[name].stable.sort((a, b) => a - b);
        // sort unstable versions alphabetical
        browsers[name].unstable = browsers[name].unstable.sort();
    });

    return browsers;
}
