const Bunyan = require("bunyan"),
    { v4: uuidV4 } = require("uuid"),
    { stdout, debugStream, stackdriver } = require("./streams"),
    responseTime = require('response-time');

class Logger extends Bunyan {
    /**
     * Creates a new Logger
     * @param {String} [logName='Pubrec Services API Logger'] name of the logger
     * @param {String} [logStreams=[{env: 'dev', stream: 'stdout'}]] array of stream config objects
     * @param {String} [logLevel='fatal,error,warn,info'] minimum level of logs to actually log
     * @param {String} [version='0.0.1'] used in stackdriver stream 
     */
    constructor({
        logName = "Log Name",
        logStreams = [{env: 'development', stream: 'stdout'}],
        logLevel = "info", 
        environment = process.env.NODE_ENV, // allow optional env overide
        version = "",
    } = {}) {

        logStreams = logStreams.filter(obj => {
            // filter out streams not for this environment
            return environment === obj.env;
        }).map(obj => {
            // map streams
            switch(obj.stream) {
                case 'stdout':
                    return stdout({ logLevel });
                    break;
                case 'bunyanDebugStream':
                    return debugStream({ logLevel });
                    break;
                case 'stackdriver':
                    return stackdriver({ logLevel, logName, version });
                    break;
              default:
                debugStream({ logLevel });
            }
        });

        super({
            name: logName,
            streams: logStreams,
        });
    }

    /**
     * Overwrite the child prototype
     */
    child(options = {}, simple) {
        return new Bunyan(this, options, simple);
    }

    /**
     * Returns Koa middleware pertaining to the logger
     */
    koaMiddleWare() {
        return async (ctx, next) => {
            ctx.log = this.child({ requestId: uuidV4() });

            // Hi-res time
            const start = process.hrtime();

            await next();

            const [seconds, nanoseconds] = process.hrtime(start),
                { request, response } = ctx,
                msg = `${request.method} ${request.originalUrl} ${
                    response.status
                }`;

            response.responseTime = seconds * 1e3 + nanoseconds * 1e-6;
            console.log(JSON.stringify(msg));
            ctx.log.info(JSON.stringify(msg));
        };
    }

    /**
     * Returns express middleware pertaining to the logger
     */
    expressMiddleware() {
        return [
            async (req, res, next) => {
                req.log = this.child({req_id: uuid.v4()});

                await next();
            },
            responseTime((req, res, time) => {
                res.responseTime = time;
            })
        ];
    }
}

module.exports = Logger;
