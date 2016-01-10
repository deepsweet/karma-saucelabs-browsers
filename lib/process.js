import { normalizeVersion } from './normalize';

export default function(data) {
    const browsers = data.reduce((result, item) => {
        const name = item.api_name;
        const version = normalizeVersion(item.short_version);

        result[name] = result[name] || {
            stable: [],
            unstable: []
        };

        if (typeof version === 'number' && result[name].stable.indexOf(version) === -1) {
            result[name].stable.push(version);
        } else if (typeof version === 'string' && result[name].unstable.indexOf(version) === -1) {
            result[name].unstable.push(version);
        }

        return result;
    }, {});

    Object.keys(browsers).forEach(name => {
        browsers[name].stable = browsers[name].stable.sort((a, b) => a - b);
        browsers[name].unstable = browsers[name].unstable.sort();
    });

    return browsers;
}
