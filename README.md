<div style="text-align:center;"><img style="width: 40%; margin: -100px 0 -50px 0;" src="SnackDriver.png" /></div>

# snackdriver

A bite-sized bunyan logger with color, express middleware and a built-in stackdriver stream.

### install:

`npm install --save the-control-group/snackdriver#v1.0.0`

### example:

```javascript
const Logger = require("snackdriver");
const log = new Logger({
	logName: "test",
	logStreams: [
		{env: 'development', stream: 'bunyanDebugStream'},
		{env: 'development', stream: 'stdout'},
		{env: 'production', stream: 'stackdriver'},
	],
	logLevel: "info"
});

log.info("hello world");
log.warn("oh no world");
log.error("ruh roh world");
```

**console output:**  
![alt text](console.png "Pretty huh?")

And if your `NODE_ENV` is set to `production` it logs to stack driver.

**stackdriver output:**  
![alt text](stackdriver.png "noice!")
