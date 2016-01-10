const aliases = {
    ff: 'firefox',
    ie: 'internet explorer',
    explorer: 'internet explorer',
    edge: 'microsoftedge',
    ios: 'iphone',
    ios_saf: 'iphone'
};

/*
    normalize browser name through aliases:
    "EDGE" -> "microsoftedge"
*/
export function normalizeName(name) {
    let result = name.toLowerCase();

    if (result in aliases) {
        result = aliases[result];
    }

    return result;
}

/*
    normalize browser version:
    "9.2" -> 9.2
    "DEV" -> "dev"
*/
export function normalizeVersion(version) {
    let result = parseFloat(version);

    if (isNaN(result)) {
        result = version.toLowerCase();
    }

    return result;
}
