const { LoggingBunyan, LOGGING_TRACE_KEY } = require("@google-cloud/logging-bunyan");

const stackdriver = ({ logLevel, logName, version }) => {
    // console.log("LOGGING_TRACE_KEY", LOGGING_TRACE_KEY);
    return new LoggingBunyan({
        serviceContext: {
            service: logName,
            version: version
        },
        logName: logName,
        resource: logResource,
    }).stream(logLevel);
};

module.exports = { stackdriver };