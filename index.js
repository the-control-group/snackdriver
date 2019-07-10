"use strict";

module.exports = async config => {
	let module = {};

	const lb = require("@google-cloud/logging-bunyan");
	const bunyanDebugStream = require("bunyan-debug-stream");
	const { LoggingBunyan } = lb;
	const bunyan = require("bunyan");
	const loggingBunyan = new LoggingBunyan({
		serviceContext: {
			service: config.logName,
			version: config.version
		},
		logName: config.logName
	});
	const logger = { name: config.logName };
	logger.streams = [];
	if (process.env.NODE_ENV === "production") {
		// log to Stackdriver Logging
		logger.streams.push(loggingBunyan.stream(config.level));
	} else {
		logger.streams.push({
			level: "info",
			type: "raw",
			// stream: process.stdout
			stream: bunyanDebugStream({
				basepath: __dirname, // this should be the root folder of your project.
				forceColor: true
			})
		});
	}

	const log = await bunyan.createLogger(logger);
	const { mw } = await lb.express.middleware({
		logName: config.logName
	});

	module.log = log;
	module.log_mw = mw;

	return module;
};
