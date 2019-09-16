const Logger = require("./index");
const log = new Logger({
	logName: "test",
	logStreams: [
		{ env: "development", stream: "bunyanDebugStream" },
		{ env: "production", stream: "stdout" },
		{ env: "production", stream: "stackdriver" }
	],
	logLevel: "info"
});

log.info("hello world");
log.warn("oh no world");
log.error("ruh roh world");
