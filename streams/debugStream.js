const bunyanDebugStream = require("bunyan-debug-stream");

const debugStream = ({ logLevel }) => {
    return {
        level: logLevel,
        type: "raw",
        stream: bunyanDebugStream({
            basepath: __dirname,
            forceColor: true,
            stringifiers: {
                request: ({ method, url, body }, { entry }) => {
                    const { response = {} } = entry;

                    if (response.status < 500) return null;

                    return {
                        value: `${method} ${url} ${response.status ||
                            ""} ${(body && JSON.stringify(body)) ||
                            ""}`,
                        consumed: ["request"],
                    };
                },
                response: ({ responseTime, length }) => ({
                    value: `${responseTime || 0} ms - ${length ||
                        0} bytes`,
                    consumed: ["response"],
                }),
            },
        }),
    }
};

module.exports = { debugStream }