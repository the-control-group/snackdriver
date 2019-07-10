# snackdriver

A bite-sized bunyan logger with color and a built-in stackdriver stream.

# Usage

```(async() => {
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
})
```
