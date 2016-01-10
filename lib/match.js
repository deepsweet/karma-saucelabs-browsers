import { normalizeName, normalizeVersion } from './normalize';

const matchers = [
    // IE 10
    {
        regexp: /^(\w+)\s([\d\.]+)$/,
        get(browsers, matched) {
            const name = normalizeName(matched[1]);
            const matchedVersion = normalizeVersion(matched[2]);

            if (!(name in browsers)) {
                return [];
            }

            return browsers[name].stable
                .filter(version => {
                    return matchedVersion === version;
                })
                .map(version => {
                    return {
                        name,
                        version
                    };
                });
        }
    },
    // IE 9-10
    {
        regexp: /^(\w+)\s([\d\.]+)-([\d\.]+)$/,
        get(browsers, matched) {
            const name = normalizeName(matched[1]);
            const matchedMinVersion = normalizeVersion(matched[2]);
            const matchedMaxVersion = normalizeVersion(matched[3]);

            if (!(name in browsers)) {
                return [];
            }

            return browsers[name].stable
                .filter(version => {
                    return version >= matchedMinVersion &&
                           version <= matchedMaxVersion;
                })
                .map(version => {
                    return {
                        name,
                        version
                    };
                });
        }
    },
    // IE >= 9
    {
        regexp: /^(\w+)\s(>=?|<=?)\s?([\d\.]+)$/,
        get(browsers, matched) {
            const name = normalizeName(matched[1]);
            const matchedSign = matched[2];
            const matchedVersion = normalizeVersion(matched[3]);

            if (!(name in browsers)) {
                return [];
            }

            return browsers[name].stable
                .filter(version => {
                    if (matchedSign === '>') {
                        return version > matchedVersion;
                    }

                    if (matchedSign === '>=') {
                        return version >= matchedVersion;
                    }

                    if (matchedSign === '<') {
                        return version < matchedVersion;
                    }

                    if (matchedSign === '<=') {
                        return version <= matchedVersion;
                    }
                })
                .map(version => {
                    return {
                        name,
                        version
                    };
                });
        }
    },
    // last 2 Chrome versions
    {
        regexp: /^last\s(\d+)\s(\w+)\sversions?$/i,
        get(browsers, matched) {
            const matchedNum = parseInt(matched[1]);
            const name = normalizeName(matched[2]);

            if (!(name in browsers)) {
                return [];
            }

            return browsers[name].stable
                .slice(-matchedNum)
                .map(version => {
                    return {
                        name,
                        version
                    };
                });
        }
    },
    // last 2 versions
    {
        regexp: /^last\s(\d+)\sversions?$/i,
        get(browsers, matched) {
            const matchedNum = parseInt(matched[1]);

            return Object.keys(browsers)
                .filter(name => name !== 'ipad')
                .filter(name => name !== 'opera')
                .reduce((result, name) => {
                    return result.concat(
                        browsers[name].stable
                            .slice(-matchedNum)
                            .map(version => {
                                return {
                                    name,
                                    version
                                };
                            })
                    );
                }, []);
        }
    },
    // beta/dev
    {
        regexp: /^(\w+)\s(beta|dev)$/i,
        get(browsers, matched) {
            const name = normalizeName(matched[1]);
            const matchedVersion = matched[2].toLowerCase();

            if (!(name in browsers)) {
                return [];
            }

            return browsers[name].unstable
                .filter(version => {
                    return matchedVersion === version;
                })
                .map(version => {
                    return {
                        name,
                        version
                    };
                });
        }
    }
];

/*
    match browsers by query:
    "last 2 Firefox versions" ->
    [
        { name: "Firefox", version: 4 },
        { name: "Firefox", version: 5 }
    ]
*/
export default function(browsers, query) {
    return matchers.reduce((result, matcher) => {
        const matched = query.match(matcher.regexp);

        if (matched !== null) {
            return result.concat(
                matcher.get(browsers, matched)
            );
        }

        return result;
    }, []);
}
