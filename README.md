<div style="text-align:center;"><img style="width: 40%; margin: -100px 0 -50px 0;" src="SnackDriver.png" /></div>

# snackdriver

A bite-sized bunyan logger with color, express middleware and a built-in stackdriver stream.

### install:

`npm install --save the-control-group/snackdriver#v0.0.3`

### example:

```javascript
const Logger = require("./log")({
	logName: "log-name", // used
	version: "1.3.10",
	level: "info"
});

async () => {
	const { log, log_mw } = await Logger;
	app.use(log_mw);

	log.info("hello world");
	log.warn("oh no world");
	log.error("ruh roh world");

	// express middleware usage
	app.use((req, res, next) => {
		req.log.info("huzzah!");

		next();
	});
};
```

**console output:**  
![alt text](console.png "Pretty huh?")

And if your `NODE_ENV` is set to `production` it logs to stack driver.

**stackdriver output:**  
![alt text](stackdriver.png "noice!")
