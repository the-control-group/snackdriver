"use strict";

module.exports = async config => {
	let module = {};

	const lb = require("@google-cloud/logging-bunyan");
	const bunyanDebugStream = require("bunyan-debug-stream");
	const { LoggingBunyan } = lb;
	const bunyan = require("bunyan");
	const loggingBunyan = new LoggingBunyan({
		serviceContext: {
			service: config.containerName,
			version: config.version
		},
		logName: config.containerName
	});
	const logger = { name: config.containerName };
	logger.streams = [];
	if (process.env.NODE_ENV === "production") {
		// log to Stackdriver Logging
		logger.streams.push(loggingBunyan.stream("info"));
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
		logName: config.containerName
	});

	module.log = log;
	module.log_mw = mw;

	return module;
};
