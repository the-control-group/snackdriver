# snackdriver

A bite-sized bunyan logger with color and a built-in stackdriver stream.

### Example:

```javascript
const Logger = require("./log")({
	containerName: config.containerName,
	version: config.version,
	level: "info"
});

async () => {
	const { log, log_mw } = await Logger;
	app.use(log_mw);

	// info
	log.info("hello world");
	log.warn("oh no world");
	log.error("ruh roh world");

	// middleware usage
	app.use((req, res, next) => {
		req.log.info("huzzah!");

		next();
	});
};
```

**Console output:**  
![alt text](console.png "Pretty huh?")

And if your `NODE_ENV` is set to `production` it logs to stack driver.

**Stackdriver output:**  
![alt text](stackdriver.png "noice!")
